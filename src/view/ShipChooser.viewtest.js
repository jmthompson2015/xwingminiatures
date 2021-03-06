import Logger from "../utility/Logger.js";

import Faction from "../artifact/Faction.js";
import Ship from "../artifact/Ship.js";

import ShipChooser from "./ShipChooser.js";

window.LOGGER = new Logger();
LOGGER.setTraceEnabled(false);
LOGGER.setDebugEnabled(false);

const resourceBase = "../resource/";

const element1 = React.createElement(ShipChooser,
{
   resourceBase: resourceBase,
   onChange: shipChanged,
   faction: Faction.properties[Faction.IMPERIAL],
});
ReactDOM.render(element1, document.getElementById("shipChooserPanel1"));

const element2 = React.createElement(ShipChooser,
{
   resourceBase: resourceBase,
   index: 2,
   initialShip: Ship.properties[Ship.TIE_FIGHTER],
   onChange: shipChanged,
   faction: Faction.properties[Faction.IMPERIAL],
});
ReactDOM.render(element2, document.getElementById("shipChooserPanel2"));

const element3 = React.createElement(ShipChooser,
{
   resourceBase: resourceBase,
   index: 3,
   onChange: shipChanged,
   faction: Faction.properties[Faction.REBEL],
});
ReactDOM.render(element3, document.getElementById("shipChooserPanel3"));

function shipChanged(event, ship, index)
{
   LOGGER.info("shipChanged() ship = " + (ship ? ship.key : ship) + " index = " + index);
}