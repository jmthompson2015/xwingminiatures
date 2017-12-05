"use strict";

define(["create-react-class", "prop-types", "react", "react-dom-factories", "view/js/CardInstanceUI"],
   function(createReactClass, PropTypes, React, DOM, CardInstanceUI)
   {
      var PilotsUI = createReactClass(
      {
         propTypes:
         {
            tokens: PropTypes.array.isRequired,
            resourceBase: PropTypes.string.isRequired,
         },

         render: function()
         {
            var tokens = this.props.tokens;

            var tokenElements = tokens.map(function(token, i)
            {
               var element = React.createElement(CardInstanceUI,
               {
                  cardInstance: token,
               });
               return DOM.td(
               {
                  key: i,
                  className: "alignTop v-top",
               }, element);
            }, this);

            var row = DOM.tr(
            {}, tokenElements);

            var myTable = DOM.table(
            {
               className: "center"
            }, DOM.tbody(
            {}, row));

            return DOM.div(
            {}, myTable);
         },
      });

      return PilotsUI;
   });
