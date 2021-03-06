import Logger from "../utility/Logger.js";

import Maneuver from "../artifact/Maneuver.js";
import PlayFormat from "../artifact/PlayFormat.js";

import EnvironmentFactory from "../model/EnvironmentFactory.js";
import ManeuverComputer from "../model/ManeuverComputer.js";
import Position from "../model/Position.js";

import PlayAreaUI from "./PlayAreaUI.js";

window.LOGGER = new Logger();
LOGGER.setTraceEnabled(false);
LOGGER.setDebugEnabled(false);

const resourceBase = "../resource/";
const environment = EnvironmentFactory.createCoreSetEnvironment();
const token1 = environment.pilotInstances()[0];
const token2 = environment.pilotInstances()[1];
const token3 = environment.pilotInstances()[2];
environment.moveToken(environment.getPositionFor(token1), new Position(305, 120, 45));

const tokenPositions = environment.createTokenPositions();
const explosionPosition = new Position(400, 400, 0);
const explosionShipBase = token1.card().shipFaction.ship.shipBase;
const laserFromPosition = environment.getPositionFor(token3);
const laserToPosition = environment.getPositionFor(token2);
const laserIsPrimary = true;
const laserFactionColor = token3.card().shipFaction.faction.color;
const maneuver = Maneuver.properties[Maneuver.TALLON_ROLL_LEFT_2_HARD];
const maneuverFromPosition = environment.getPositionFor(token1);
const maneuverShipBase = token1.card().shipFaction.ship.shipBase;
const scale = 0.75;

const element = React.createElement(PlayAreaUI,
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