import Ship from "../artifact/Ship.js";
import ShipFaction from "../artifact/ShipFaction.js";

import Select from "./Select.js";
import ShipSilhouetteUI from "./ShipSilhouetteUI.js";

var ShipChooser = createReactClass(
{
   propTypes:
   {
      resourceBase: PropTypes.string.isRequired,
      onChange: PropTypes.func.isRequired,
      faction: PropTypes.object.isRequired,

      index: PropTypes.number,
      initialShip: PropTypes.object,
   },

   getInitialState: function()
   {
      var initialShip = this.props.initialShip;
      var shipKey = (initialShip !== undefined ? initialShip.key : undefined);

      return (
      {
         shipKey: shipKey,
      });
   },

   SHIP_PROMPT: "Select a ship",

   render: function()
   {
      var faction = this.props.faction;
      var values = ShipFaction.shipKeysByFaction(faction.key);
      values.unshift(this.SHIP_PROMPT);

      var labelFunction = function(value)
      {
         var ship = Ship.properties[value];
         return (ship ? ship.name : value);
      };

      var shipKey = this.state.shipKey;
      var select = React.createElement(Select,
      {
         values: values,
         labelFunction: labelFunction,
         initialSelectedValue: shipKey,
         onChange: this.shipChanged,
         clientProps:
         {
            "data-index": this.props.index,
         }
      });

      var ship = Ship.properties[shipKey];

      if (ship)
      {
         var image = React.createElement(ShipSilhouetteUI,
         {
            ship: ship,
            resourceBase: this.props.resourceBase,
         });

         return ReactDOMFactories.span(
         {}, image, " ", select);
      }
      else
      {
         return select;
      }
   },

   shipChanged: function(event)
   {
      var shipKey = event.currentTarget.value;
      var index = parseInt(event.currentTarget.dataset.index);

      this.setState(
      {
         shipKey: shipKey,
      });

      var ship = Ship.properties[shipKey];
      this.props.onChange(event, ship, index);
   },
});

export default ShipChooser;