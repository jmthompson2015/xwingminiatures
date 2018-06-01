import ShipAction from "../artifact/ShipAction.js";

var ShipActionUI = createReactClass(
{
   render: function()
   {
      var shipAction = this.props.shipAction;
      var myKey = (this.props.myKey !== undefined ? this.props.myKey : shipAction.key);
      var className = "center tc v-mid";
      var src = shipAction.key.toLowerCase();

      if (shipAction.key === ShipAction.DECLOAK)
      {
         src = "cloak";
         className += " silver";
      }

      var image = ReactDOMFactories.span(
      {
         key: myKey,
         className: className,
         title: shipAction.name,
      }, ReactDOMFactories.i(
      {
         className: "xwing-miniatures-font xwing-miniatures-font-" + src,
      }));

      var answer = image;
      var showName = this.props.showName;

      if (showName)
      {
         answer = ReactDOMFactories.span(
         {
            className: "v-mid",
         }, image, " ", shipAction.name);
      }

      return answer;
   },
});

ShipActionUI.propTypes = {
   shipAction: PropTypes.object.isRequired,

   // default: ship action value
   myKey: PropTypes.string,
   showName: PropTypes.bool,
};

ShipActionUI.defaultProps = {
   showName: false,
};

export default ShipActionUI;