import TargetLock from "../model/TargetLock.js";

import CardInstancesArea from "./CardInstancesArea.js";
import ReactUtilities from "./ReactUtilities.js";

import CardImageContainer from "../controller/CardImageContainer.js";
import TokenPanelContainer from "../controller/TokenPanelContainer.js";

var CardInstanceUI = createReactClass(
{
   getInitialState: function()
   {
      return (
      {
         isSmall: true,
      });
   },

   render: function()
   {
      var columns = [];
      var cardInstance = this.props.cardInstance;

      if (cardInstance)
      {
         var image = this.createCardImage(cardInstance);
         var tokenPanel = this.createTokenPanel(cardInstance);
         var cell = ReactDOMFactories.div(
         {
            key: "imagePanel" + columns.length,
            className: "v-mid",
            onClick: this.toggleSize,
         }, image);

         columns.push(cell);
         columns.push(tokenPanel);
         this.createAttachmentPanel(columns, cardInstance);
      }

      return ReactUtilities.createFlexboxWrap(columns, "cardInstanceUI", "bg-xw-medium items-center justify-center ma0 pa0");
   },

   toggleSize: function()
   {
      this.setState(
      {
         isSmall: !this.state.isSmall,
      });
   },
});

CardInstanceUI.prototype.createAttachmentPanel = function(columns, cardInstance)
{
   var upgrades = cardInstance.upgrades();
   var attachments = [];

   if (upgrades.size > 0)
   {
      for (var i = 0; i < upgrades.size; i++)
      {
         var upgradeInstance = upgrades.get(i);
         var upgradeUI = this.createAttachmentUI(upgradeInstance);
         attachments.push(upgradeUI);
      }
   }

   var damages = cardInstance.criticalDamages();

   if (damages.size > 0)
   {
      for (var j = 0; j < damages.size; j++)
      {
         var damageInstance = damages.get(j);
         var damageUI = this.createAttachmentUI(damageInstance);
         attachments.push(damageUI);
      }
   }

   columns.push(React.createElement(CardInstancesArea,
   {
      key: "attachmentPanel",
      cardInstanceUIs: attachments,
      isExpanded: false,
   }));
};

CardInstanceUI.prototype.createAttachmentUI = function(cardInstance)
{
   return React.createElement(CardInstanceUI,
   {
      key: "attachment" + cardInstance.id(),
      cardInstance: cardInstance,
      width: this.props.width / 1.4,
   });
};

CardInstanceUI.prototype.createCardImage = function(cardInstance)
{
   var width = this.props.width;

   if (this.state.isSmall)
   {
      width /= 2;
   }

   return React.createElement(CardImageContainer,
   {
      myKey: cardInstance.toString(),
      cardInstance: cardInstance,
      width: width,
   });
};

CardInstanceUI.prototype.createTokenPanel = function(cardInstance)
{
   var store = cardInstance.store();
   var attackerTargetLocks = TargetLock.getByAttacker(store, cardInstance);
   var defenderTargetLocks = TargetLock.getByDefender(store, cardInstance);

   return React.createElement(TokenPanelContainer,
   {
      key: "token" + cardInstance.id(),
      cardInstance: cardInstance,
      attackerTargetLocks: attackerTargetLocks,
      defenderTargetLocks: defenderTargetLocks,
   });
};

CardInstanceUI.propTypes = {
   cardInstance: PropTypes.object, // default: undefined
   width: PropTypes.number,
};

CardInstanceUI.defaultProps = {
   width: 250,
};

export default CardInstanceUI;