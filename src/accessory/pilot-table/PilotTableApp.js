import Logger from "../../utility/Logger.js";

import AbilityCountContainer from "../../controller/AbilityCountContainer.js";

import PilotTableContainer from "./PilotTableContainer.js";
import Reducer from "./Reducer.js";

// require(["react", "react-dom", "react-redux", "redux", "utility/Logger", "utility/MathUtilities", "artifact/PilotCard",
//     "controller/AbilityCountContainer", "accessory/pilot-table/PilotTableContainer", "accessory/pilot-table/Reducer"
//   ],
//   function(React, ReactDOM, ReactRedux, Redux, Logger, MathUtilities, PilotCard, AbilityCountContainer, PilotTableContainer, Reducer)

window.LOGGER = new Logger();
LOGGER.setTraceEnabled(false);
LOGGER.setDebugEnabled(false);

var resourceBase = "../../../src/resource/";
var store = Redux.createStore(Reducer.root);

var element0 = React.createElement(ReactRedux.Provider,
{
   store: store,
}, React.createElement(AbilityCountContainer));

ReactDOM.render(element0, document.getElementById("implementedStatistics"));

var element1 = React.createElement(ReactRedux.Provider,
{
   store: store,
}, React.createElement(PilotTableContainer,
{
   resourceBase: resourceBase,
}));

ReactDOM.render(element1, document.getElementById("tableContainer"));