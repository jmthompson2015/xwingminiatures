import FiringArc from "../artifact/FiringArc.js";
import ShipBase from "../artifact/ShipBase.js";

import EnvironmentFactory from "./EnvironmentFactory.js";
import FiringComputer from "./FiringComputer.js";
import Position from "./Position.js";

QUnit.module("FiringComputer");

QUnit.test("isInFiringArc() aft", function(assert)
{
   // Setup.
   const attackerPosition = new Position(500, 400, 0);
   const defenderPosition = new Position(400, 400, 180);
   const defenderShipBase = ShipBase.properties[ShipBase.SMALL];
   const offsetKeys = FiringArc.offsetKeys();

   // Run / Verify.
   const expecteds = [true, true, false, false, false, false, false, false, undefined, undefined, undefined, false];
   FiringArc.values().forEach(function(firingArc, i)
   {
      if (!offsetKeys.includes(firingArc.key))
      {
         assert.equal(FiringComputer.isInFiringArc(attackerPosition, firingArc, defenderPosition, defenderShipBase), expecteds[i], "firingArc = " + firingArc.key);
      }
   });
});

QUnit.test("isInFiringArc() CR90 aft", function(assert)
{
   // Setup.
   const attackerPosition = new Position(400, 400, 0);
   const defenderPosition = new Position(328, 300, 180);
   const defenderShipBase = ShipBase.properties[ShipBase.HUGE2];

   // Run / Verify.
   const firingArc = FiringArc.properties[FiringArc.PORT_AND_STARBOARD_AFT];
   assert.equal(FiringComputer.isInFiringArc(attackerPosition, firingArc, defenderPosition, defenderShipBase), true, "firingArc = " + firingArc.key);
});

QUnit.test("isInFiringArc() CR90 fore", function(assert)
{
   // Setup.
   const attackerPosition = new Position(400, 400, 0);
   const defenderPosition = new Position(472, 300, 180);
   const defenderShipBase = ShipBase.properties[ShipBase.HUGE2];

   // Run / Verify.
   const firingArc = FiringArc.properties[FiringArc.PORT_AND_STARBOARD_FORE];
   assert.equal(FiringComputer.isInFiringArc(attackerPosition, firingArc, defenderPosition, defenderShipBase), true, "firingArc = " + firingArc.key);
});

QUnit.test("isInFiringArc() forward", function(assert)
{
   // Setup.
   const attackerPosition = new Position(400, 400, 0);
   const defenderPosition = new Position(500, 400, 180);
   const defenderShipBase = ShipBase.properties[ShipBase.SMALL];
   const offsetKeys = FiringArc.offsetKeys();

   // Run / Verify.
   const expecteds = [false, false, true, true, true, true, true, false, undefined, undefined, undefined, false];

   FiringArc.values().forEach(function(firingArc, i)
   {
      if (!offsetKeys.includes(firingArc.key))
      {
         assert.equal(FiringComputer.isInFiringArc(attackerPosition, firingArc, defenderPosition, defenderShipBase), expecteds[i], "firingArc = " + firingArc.key);
      }
   });
});

QUnit.test("isInFiringArc() forward port", function(assert)
{
   // Setup.
   const attackerPosition = new Position(400, 400, 0);
   const defenderPosition = new Position(500, 300, 180);
   const defenderShipBase = ShipBase.properties[ShipBase.SMALL];

   // Run / Verify.
   const expecteds = [false, false, false, true, true, true, true, true, undefined, undefined, undefined, false];
   const offsetKeys = FiringArc.offsetKeys();

   FiringArc.values().forEach(function(firingArc, i)
   {
      if (!offsetKeys.includes(firingArc.key))
      {
         assert.equal(FiringComputer.isInFiringArc(attackerPosition, firingArc, defenderPosition, defenderShipBase), expecteds[i], "firingArc = " + firingArc.key);
      }
   });
});

QUnit.test("isInFiringArc() port", function(assert)
{
   // Setup.
   const attackerPosition = new Position(400, 500, 0);
   const defenderPosition = new Position(400, 400, 180);
   const defenderShipBase = ShipBase.properties[ShipBase.SMALL];
   const offsetKeys = FiringArc.offsetKeys();

   // Run / Verify.
   const expecteds = [false, true, false, false, false, false, true, true, undefined, undefined, undefined, false];

   FiringArc.values().forEach(function(firingArc, i)
   {
      if (!offsetKeys.includes(firingArc.key))
      {
         assert.equal(FiringComputer.isInFiringArc(attackerPosition, firingArc, defenderPosition, defenderShipBase), expecteds[i], "firingArc = " + firingArc.key);
      }
   });
});

QUnit.test("isInFiringArc() Raider-class aft", function(assert)
{
   // Setup.
   const attackerPosition = new Position(400, 400, 0);
   const defenderPosition = new Position(328, 300, 180);
   const defenderShipBase = ShipBase.properties[ShipBase.HUGE2];

   // Run / Verify.
   const firingArc = FiringArc.properties[FiringArc.PORT_AND_STARBOARD_AFT_SKEWED];
   assert.equal(FiringComputer.isInFiringArc(attackerPosition, firingArc, defenderPosition, defenderShipBase), true, "firingArc = " + firingArc.key);
});

QUnit.test("isInFiringArc() starboard", function(assert)
{
   // Setup.
   const attackerPosition = new Position(400, 400, 0);
   const defenderPosition = new Position(400, 500, 180);
   const defenderShipBase = ShipBase.properties[ShipBase.SMALL];
   const offsetKeys = FiringArc.offsetKeys();

   // Run / Verify.
   const expecteds = [false, true, false, false, false, false, true, false, undefined, undefined, undefined, true];

   FiringArc.values().forEach(function(firingArc, i)
   {
      if (!offsetKeys.includes(firingArc.key))
      {
         assert.equal(FiringComputer.isInFiringArc(attackerPosition, firingArc, defenderPosition, defenderShipBase), expecteds[i], "firingArc = " + firingArc.key);
      }
   });
});

QUnit.test("isInFiringArc() rotated", function(assert)
{
   // Setup.
   const environment = EnvironmentFactory.createCoreSetEnvironment();
   const attackerPosition0 = new Position(458, 895, -90);
   const attacker = environment.getTokenAt(attackerPosition0);
   assert.ok(attacker);
   const defenderPosition = new Position(305, 20, 90);
   const defender = environment.getTokenAt(defenderPosition);
   const attackerPosition = new Position(defenderPosition.x(), defenderPosition.y() + 50, 0);
   environment.moveToken(attackerPosition0, attackerPosition);
   const defenderShipBase = defender.card().shipFaction.ship.shipBase;

   // Run.
   const result = FiringComputer.isInFiringArc(attackerPosition, attacker.primaryWeapon().primaryFiringArc(), defenderPosition, defenderShipBase);

   // Verify.
   assert.ok(!result);
});

const FiringComputerTest = {};
export default FiringComputerTest;