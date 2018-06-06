import DamageCard from "../artifact/DamageCard.js";
import DiceModification from "../artifact/DiceModification.js";
import Maneuver from "../artifact/Maneuver.js";
import PilotCard from "../artifact/PilotCard.js";
import Ship from "../artifact/Ship.js";
import ShipAction from "../artifact/ShipAction.js";
import UpgradeCard from "../artifact/UpgradeCard.js";

import FactionUI from "./FactionUI.js";
import ImplementedImage from "./ImplementedImage.js";
import ShipActionUI from "./ShipActionUI.js";
import ShipSilhouetteUI from "./ShipSilhouetteUI.js";
import UpgradeTypeUI from "./UpgradeTypeUI.js";

class EntityUI extends React.Component
{
   render()
   {
      var showIcon = this.props.showIcon;
      var showLabel = this.props.showLabel;
      var showImplemented = this.props.showImplemented;
      var cells = [];

      if (showIcon)
      {
         var icon = this.createIcon();
         cells.push(ReactDOMFactories.div(
         {
            key: "iconPanel",
            className: "iconPanel dtc tl v-mid",
         }, icon));
      }

      if (showLabel)
      {
         var label = this.createLabel();
         cells.push(ReactDOMFactories.div(
         {
            key: "labelPanel",
            className: "labelPanel dtc pl1 tl v-mid",
         }, label));
      }

      if (showImplemented)
      {
         var implementedImage = this.createImplementedImage();
         cells.push(ReactDOMFactories.div(
         {
            key: "implementedPanel",
            className: "implementedPanel dtc pl1 tr v-mid",
         }, implementedImage));
      }

      return ReactDOMFactories.div(
      {
         className: this.props.panelClass,
      }, cells);
   }
}

EntityUI.prototype.createIcon = function()
{
   var entity = this.props.entity;
   var resourceBase = this.props.resourceBase;
   var type = entity.xwingType;
   var key = "iconCell";
   var answer;

   switch (type)
   {
      case DamageCard:
         var filename = resourceBase + "pilotCard/CriticalDamage24.jpg";
         answer = ReactDOMFactories.img(
         {
            key: key,
            src: filename,
            title: "Critical Damage",
         });
         break;
      case DiceModification:
         answer = React.createElement(ShipActionUI,
         {
            key: key,
            shipAction: entity.shipAction,
         });
         break;
      case PilotCard:
         answer = React.createElement(FactionUI,
         {
            key: key,
            faction: entity.shipFaction.faction,
            resourceBase: resourceBase,
            isSmall: true,
         });
         break;
      case Ship:
         answer = React.createElement(ShipSilhouetteUI,
         {
            key: key,
            resourceBase: resourceBase,
            ship: entity,
         });
         break;
      case ShipAction:
         answer = React.createElement(ShipActionUI,
         {
            key: key,
            shipAction: entity,
         });
         break;
      case UpgradeCard:
         answer = React.createElement(UpgradeTypeUI,
         {
            key: key,
            resourceBase: resourceBase,
            upgradeType: entity.type,
         });
         break;
      default:
         throw "EntityUI: Unknown entity type: " + type;
   }

   return answer;
};

EntityUI.prototype.createImplementedImage = function()
{
   var answer;
   var entity = this.props.entity;
   var type = entity.xwingType;

   switch (type)
   {
      case DamageCard:
      case DiceModification:
      case PilotCard:
      case ShipAction:
      case UpgradeCard:
         var isImplemented = (entity.isImplemented !== undefined ? entity.isImplemented : false);
         answer = React.createElement(ImplementedImage,
         {
            key: "implementedCell",
            resourceBase: this.props.resourceBase,
            isImplemented: isImplemented,
         });
         break;
      case Ship:
         break;
      default:
         throw "EntityUI: Unknown entity type: " + type;
   }

   return answer;
};

EntityUI.prototype.createLabel = function()
{
   var entity = this.props.entity;
   var type = entity.xwingType;
   var title = this.createTitle();
   var name;

   switch (type)
   {
      case DamageCard:
      case DiceModification:
      case Ship:
         name = entity.name;
         break;
      case ShipAction:
         var context = this.props.context;
         name = this.createShipActionLabel(entity, context);
         break;
      case PilotCard:
         name = (entity.parent ? entity.name : type.getName(entity.key));
         break;
      case UpgradeCard:
         name = type.getName(entity.key);
         break;
      default:
         throw "EntityUI: Unknown entity type: " + type;
   }

   return ReactDOMFactories.span(
   {
      key: "labelCell",
      title: title,
   }, name);
};

EntityUI.prototype.createShipActionLabel = function(shipAction, context)
{
   var answer;
   var maneuverKey = (context !== undefined ? context.maneuverKey : undefined);
   var maneuver = (maneuverKey !== undefined ? Maneuver.properties[maneuverKey] : undefined);
   var token = (context !== undefined ? context.token : undefined);
   var defender = (context !== undefined ? context.defender : undefined);

   switch (shipAction.key)
   {
      case ShipAction.BARREL_ROLL:
         answer = maneuver.bearing.name;
         break;
      case ShipAction.BOOST:
         var parts = maneuver.bearing.name.split(" ");
         answer = "Boost " + parts[parts.length - 1];
         break;
      case ShipAction.COORDINATE:
         answer = "Coordinate: " + token.name();
         break;
      case ShipAction.DECLOAK:
         answer = "Decloak: " + maneuver.bearing.name + " " + maneuver.speed;
         break;
      case ShipAction.JAM:
         answer = "Jam: " + defender.name();
         break;
      case ShipAction.RECOVER:
         answer = "Recover" + (token.parent !== undefined ? ": " + token.name() : "");
         break;
      case ShipAction.REINFORCE:
         answer = "Reinforce" + (token.parent !== undefined ? ": " + token.name() : "");
         break;
      case ShipAction.SLAM:
         answer = "SLAM: " + maneuver.bearing.name + " " + maneuver.speed;
         break;
      case ShipAction.TARGET_LOCK:
         answer = "Target Lock: " + defender.name();
         break;
      default:
         answer = shipAction.name;
   }

   return answer;
};

EntityUI.prototype.createTitle = function()
{
   var answer = "";
   var entity = this.props.entity;
   var type = entity.xwingType;

   switch (type)
   {
      case DamageCard:
         answer = entity.description;
         if (entity.hasAction)
         {
            answer += " Action: ";
            answer += entity.actionDescription;
         }
         break;
      case DiceModification:
      case PilotCard:
         answer = entity.description;
         break;
      case UpgradeCard:
         if (entity.header)
         {
            answer = entity.header.name + ": ";
         }
         answer += entity.description;
         break;
      case Ship:
      case ShipAction:
         break;
      default:
         throw "EntityUI: Unknown entity type: " + type;
   }

   return answer;
};

EntityUI.propTypes = {
   entity: PropTypes.object.isRequired,
   resourceBase: PropTypes.string.isRequired,

   context: PropTypes.object,
   panelClass: PropTypes.string,
   showIcon: PropTypes.bool,
   showLabel: PropTypes.bool,
   showImplemented: PropTypes.bool,
};

EntityUI.defaultProps = {
   panelClass: "entityUI",
   showIcon: true,
   showLabel: true,
   showImplemented: true,
};

export default EntityUI;