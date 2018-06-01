import Logger from "../utility/Logger.js";

import Maneuver from "../artifact/Maneuver.js";
import PlayFormat from "../artifact/PlayFormat.js";

import EnvironmentFactory from "../model/EnvironmentFactory.js";
import ManeuverComputer from "../model/ManeuverComputer.js";
import Position from "../model/Position.js";

import PlayAreaUI from "./PlayAreaUI.js";

// require(["react", "react-dom", "react-dom-factories", "utility/Logger",
// 		"artifact/Maneuver", "artifact/PlayFormat",
// 		"model/Action", "model/ManeuverComputer", "model/Position", "model/Selector", "model/EnvironmentFactory",
// 		"view/PlayAreaUI"
// 	],
// 	function(React, ReactDOM, ReactDOMFactories, Logger,
// 		Maneuver, PlayFormat,
// 		Action, ManeuverComputer, Position, Selector, EnvironmentFactory,
// 		PlayAreaUI)

window.LOGGER = new Logger();
LOGGER.setTraceEnabled(false);
LOGGER.setDebugEnabled(false);

var resourceBase = "../resource/";
var environment = EnvironmentFactory.createCoreSetEnvironment();
// var store = environment.store();
// var token1 = environment.getTokenById(1);
// var token2 = environment.getTokenById(2);
// var token3 = environment.getTokenById(3);
var token1 = environment.pilotInstances()[0];
var token2 = environment.pilotInstances()[1];
var token3 = environment.pilotInstances()[2];
// for (let i = 0; i < environment.tokens().length; i++)
// {
// 	console.log("token1 = " + token1);
// }
// console.log("token1 = " + token1);
// console.log("token2 = " + token2);
// console.log("token3 = " + token3);
// console.log("environment.getPositionFor(token1) = " + environment.getPositionFor(token1));
environment.moveToken(environment.getPositionFor(token1), new Position(305, 120, 45));

var tokenPositions = environment.createTokenPositions();
var explosionPosition = new Position(400, 400, 0);
var explosionShipBase = token1.card().shipFaction.ship.shipBase;
var laserFromPosition = environment.getPositionFor(token3);
var laserToPosition = environment.getPositionFor(token2);
var laserIsPrimary = true;
var laserFactionColor = token3.card().shipFaction.faction.color;
var maneuver = Maneuver.properties[Maneuver.TALLON_ROLL_LEFT_2_HARD];
// var maneuver = Maneuver.properties[Maneuver.TALLON_ROLL_RIGHT_2_HARD];
var maneuverFromPosition = environment.getPositionFor(token1);
var maneuverShipBase = token1.card().shipFaction.ship.shipBase;
var scale = 0.75;

var element = React.createElement(PlayAreaUI,
{
   resourceBase: resourceBase,
   scale: scale,
   width: scale * 915,
   height: scale * 915,
   image: "background/pia13845.jpg",
   tokenPositions: tokenPositions,
   explosion:
   {
      position: explosionPosition,
      shipBase: explosionShipBase,
      audioClip: document.getElementById("explosionAudio"),
   },
   laserBeam:
   {
      fromPosition: laserFromPosition,
      toPosition: laserToPosition,
      isPrimary: laserIsPrimary,
      factionColor: laserFactionColor,
      audioClip: document.getElementById("xWingLaserAudio"),
   },
   maneuver:
   {
      maneuver: maneuver,
      fromPolygon: ManeuverComputer.computeFromPolygon(maneuverFromPosition, maneuverShipBase),
      fromPosition: maneuverFromPosition,
      path: ManeuverComputer.computePath(maneuver, maneuverFromPosition, maneuverShipBase),
      toPolygon: ManeuverComputer.computeToPolygon(PlayFormat.STANDARD, maneuver, maneuverFromPosition, maneuverShipBase),
   },
});
ReactDOM.render(element, document.getElementById("panel"));