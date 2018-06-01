import ReferenceCard from "../artifact/ReferenceCard.js";

import CardImage from "./CardImage.js";

var resourceBase = "../";
var referenceKeys = ReferenceCard.keys();

var rows = referenceKeys.map(function(referenceKey)
{
   return React.createElement(CardImage,
   {
      key: "referenceCard" + referenceKey,
      card: ReferenceCard.properties[referenceKey],
      resourceBase: resourceBase,
      width: 200,
   });
});

var mainPanel = ReactDOMFactories.div(
{}, rows);
ReactDOM.render(mainPanel, document.getElementById("mainPanel"));