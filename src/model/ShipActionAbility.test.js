import Maneuver from "../artifact/Maneuver.js";
import ShipAction from "../artifact/ShipAction.js";

import Action from "./Action.js";
import CardAction from "./CardAction.js";
import CombatAction from "./CombatAction.js";
import EnvironmentFactory from "./EnvironmentFactory.js";
import MockAttackDice from "./MockAttackDice.js";
import MockDefenseDice from "./MockDefenseDice.js";
import Position from "./Position.js";
import ShipActionAbility from "./ShipActionAbility.js";
import TargetLock from "./TargetLock.js";

QUnit.module("ShipActionAbility");

QUnit.test("condition()", function(assert)
{
   // Setup.
   var environment = createEnvironment();
   var store = environment.store();
   var token = environment.pilotInstances()[2]; // X-Wing.

   // Run / Verify.
   var abilities = ShipActionAbility;
   assert.ok(abilities);

   Object.keys(abilities).forEach(function(shipActionKey)
   {
      var ability = abilities[shipActionKey];

      if (ability.condition)
      {
         var result = ability.condition(store, token);
         assert.ok(result !== undefined, "shipActionKey = " + shipActionKey);
      }
   });
});

QUnit.test("consequent()", function(assert)
{
   // Setup.
   var environment = createEnvironment();
   var store = environment.store();
   var token = environment.pilotInstances()[2]; // X-Wing.
   var callback = function()
   {
      LOGGER.info("in callback()");
   };

   // Run / Verify.
   var abilities = ShipActionAbility;
   assert.ok(abilities);

   Object.keys(abilities).forEach(function(shipActionKey)
   {
      var ability = abilities[shipActionKey];

      if (ability.condition && ability.condition(store, token))
      {
         ability.consequent(store, token, callback);
         assert.ok(true, "shipActionKey = " + shipActionKey);
      }
   });
});

QUnit.test("barrel roll", function(assert)
{
   // Setup.
   var environment = EnvironmentFactory.createCoreSetEnvironment();
   var store = environment.store();
   var token = environment.pilotInstances()[2]; // X-Wing
   var tokenPosition = environment.getPositionFor(token);
   environment.moveToken(tokenPosition, new Position(458, 890, 270));
   var ability = ShipActionAbility[ShipActionAbility.ABILITY_KEY][ShipAction.BARREL_ROLL];
   var callback = function()
   {
      // Verify.
      assert.ok(true, "test resumed from async operation");
      position = environment.getPositionFor(token);
      assert.equal(position.x(), 458 - 80);
      assert.equal(position.y(), 890);
      assert.equal(position.heading(), 270);
      done();
   };
   var context = {
      maneuverKey: Maneuver.BARREL_ROLL_LEFT_1_STANDARD,
   };

   // Run.
   var position = environment.getPositionFor(token);
   assert.equal(position.x(), 458);
   assert.equal(position.y(), 890);
   assert.equal(position.heading(), 270);
   var done = assert.async();
   ability.consequent(store, token, callback, context);
});

QUnit.test("boost", function(assert)
{
   // Setup.
   var environment = EnvironmentFactory.createCoreSetEnvironment();
   var store = environment.store();
   var token = environment.pilotInstances()[2]; // X-Wing
   var tokenPosition = environment.getPositionFor(token);
   environment.moveToken(tokenPosition, new Position(458, 890, 270));
   var ability = ShipActionAbility[ShipActionAbility.ABILITY_KEY][ShipAction.BOOST];
   var callback = function()
   {
      // Verify.
      assert.ok(true, "test resumed from async operation");
      position = environment.getPositionFor(token);
      assert.equal(position.x(), 458 + 80);
      assert.equal(position.y(), 890);
      assert.equal(position.heading(), 270);
      done();
   };
   var context = {
      maneuverKey: Maneuver.BARREL_ROLL_RIGHT_1_STANDARD,
   };

   // Run.
   var position = environment.getPositionFor(token);
   assert.equal(position.x(), 458);
   assert.equal(position.y(), 890);
   assert.equal(position.heading(), 270);
   var done = assert.async();
   ability.consequent(store, token, callback, context);
});

QUnit.test("cloak", function(assert)
{
   // Setup.
   var environment = EnvironmentFactory.createCoreSetEnvironment();
   var store = environment.store();
   var token = environment.pilotInstances()[2]; // X-Wing
   var ability = ShipActionAbility[ShipActionAbility.ABILITY_KEY][ShipAction.CLOAK];
   var callback = function()
   {
      // Verify.
      assert.ok(true, "test resumed from async operation");
      assert.equal(token.cloakCount(), 1);
      done();
   };
   assert.equal(token.cloakCount(), 0);

   // Run.
   var done = assert.async();
   ability.consequent(store, token, callback);
});

QUnit.test("decloak left", function(assert)
{
   // Setup.
   var environment = EnvironmentFactory.createCoreSetEnvironment();
   var store = environment.store();
   var token = environment.pilotInstances()[2]; // X-Wing
   var tokenPosition = environment.getPositionFor(token);
   environment.moveToken(tokenPosition, new Position(458, 890, 270));
   store.dispatch(CardAction.addCloakCount(token));
   var ability = ShipActionAbility[ShipActionAbility.ABILITY_KEY][ShipAction.DECLOAK];
   var callback = function()
   {
      // Verify.
      assert.ok(true, "test resumed from async operation");
      assert.equal(token.cloakCount(), 0);
      position = environment.getPositionFor(token);
      assert.equal(position.x(), 458 - 120);
      assert.equal(position.y(), 890);
      assert.equal(position.heading(), 270);
      done();
   };
   var context = {
      maneuverKey: Maneuver.BARREL_ROLL_LEFT_2_STANDARD,
   };
   assert.equal(token.cloakCount(), 1);
   var position = environment.getPositionFor(token);
   assert.equal(position.x(), 458);
   assert.equal(position.y(), 890);
   assert.equal(position.heading(), 270);

   // Run.
   var done = assert.async();
   ability.consequent(store, token, callback, context);
});

QUnit.test("evade", function(assert)
{
   // Setup.
   var environment = EnvironmentFactory.createCoreSetEnvironment();
   var store = environment.store();
   var token = environment.pilotInstances()[2]; // X-Wing
   var ability = ShipActionAbility[ShipActionAbility.ABILITY_KEY][ShipAction.EVADE];
   var callback = function()
   {
      // Verify.
      assert.ok(true, "test resumed from async operation");
      assert.equal(token.evadeCount(), 1);
      done();
   };
   assert.equal(token.evadeCount(), 0);

   // Run.
   var done = assert.async();
   ability.consequent(store, token, callback);
});

QUnit.test("focus", function(assert)
{
   // Setup.
   var environment = EnvironmentFactory.createCoreSetEnvironment();
   var store = environment.store();
   var token = environment.pilotInstances()[2]; // X-Wing
   var ability = ShipActionAbility[ShipActionAbility.ABILITY_KEY][ShipAction.FOCUS];
   var callback = function()
   {
      // Verify.
      assert.ok(true, "test resumed from async operation");
      assert.equal(token.focusCount(), 1);
      done();
   };
   assert.equal(token.focusCount(), 0);

   // Run.
   var done = assert.async();
   ability.consequent(store, token, callback);
});

QUnit.test("jam", function(assert)
{
   // Setup.
   var environment = EnvironmentFactory.createCoreSetEnvironment();
   var store = environment.store();
   var attacker = environment.pilotInstances()[2]; // X-Wing
   var defender = environment.pilotInstances()[0]; // TIE Fighter
   var ability = ShipActionAbility[ShipActionAbility.ABILITY_KEY][ShipAction.JAM];
   var callback = function()
   {
      // Verify.
      assert.ok(true, "test resumed from async operation");
      assert.equal(defender.stressCount(), 2);
      done();
   };
   var context = {
      defender: defender,
   };
   assert.equal(defender.stressCount(), 0);

   // Run.
   var done = assert.async();
   ability.consequent(store, attacker, callback, context);
});

QUnit.test("reinforce", function(assert)
{
   // Setup.
   var environment = EnvironmentFactory.createCoreSetEnvironment();
   var store = environment.store();
   var token = environment.pilotInstances()[2]; // X-Wing
   var ability = ShipActionAbility[ShipActionAbility.ABILITY_KEY][ShipAction.REINFORCE];
   var callback = function()
   {
      // Verify.
      assert.ok(true, "test resumed from async operation");
      assert.equal(token.reinforceCount(), 1);
      done();
   };
   assert.equal(token.reinforceCount(), 0);

   // Run.
   var done = assert.async();
   ability.consequent(store, token, callback);
});

QUnit.test("slam", function(assert)
{
   // Setup.
   var environment = EnvironmentFactory.createCoreSetEnvironment();
   var store = environment.store();
   var token = environment.pilotInstances()[2]; // X-Wing
   var ability = ShipActionAbility[ShipActionAbility.ABILITY_KEY][ShipAction.SLAM];
   var callback = function()
   {
      // Verify.
      assert.ok(true, "test resumed from async operation");
      position = environment.getPositionFor(token);
      assert.equal(position.x(), 458);
      assert.equal(position.y(), 895 - 120);
      assert.equal(position.heading(), 270);
      done();
   };
   var context = {
      maneuverKey: Maneuver.STRAIGHT_2_STANDARD,
   };

   // Run.
   var position = environment.getPositionFor(token);
   assert.equal(position.x(), 458);
   assert.equal(position.y(), 895);
   assert.equal(position.heading(), 270);
   var done = assert.async();
   ability.consequent(store, token, callback, context);
});

QUnit.test("target lock", function(assert)
{
   // Setup.
   var environment = EnvironmentFactory.createCoreSetEnvironment();
   var store = environment.store();
   var defender = environment.pilotInstances()[0]; // TIE Fighter
   var attacker = environment.pilotInstances()[2]; // X-Wing
   var ability = ShipActionAbility[ShipActionAbility.ABILITY_KEY][ShipAction.TARGET_LOCK];
   assert.equal(store.getState().targetLocks.size, 0);
   assert.ok(TargetLock.getFirst(store, attacker, defender) === undefined);
   var callback = function()
   {
      // Verify.
      assert.ok(true, "test resumed from async operation");
      assert.equal(store.getState().targetLocks.size, 1);
      assert.ok(TargetLock.getFirst(store, attacker, defender) !== undefined);
      done();
   };
   var context = {
      defender: defender,
   };

   // Run.
   var done = assert.async();
   ability.consequent(store, attacker, callback, context);
});

function createEnvironment()
{
   var environment = EnvironmentFactory.createCoreSetEnvironment();
   var store = environment.store();
   var attacker = environment.pilotInstances()[2]; // X-Wing.
   var weapon = attacker.primaryWeapon();
   var defender = environment.pilotInstances()[0]; // TIE Fighter.
   var callback = function()
   {
      LOGGER.info("in callback()");
   };

   environment.setActiveToken(attacker);
   store.dispatch(CardAction.addFocusCount(attacker));
   store.dispatch(CardAction.addStressCount(attacker));

   store.dispatch(Action.setTokenAttackDice(attacker.id(), (new MockAttackDice(store, attacker.id())).values()));
   store.dispatch(Action.setTokenDefenseDice(attacker.id(), (new MockDefenseDice(store, attacker.id())).values()));
   store.dispatch(Action.setTokenInFiringArc(attacker, true));

   var combatAction = new CombatAction(store, attacker, weapon, defender, callback, MockAttackDice, MockDefenseDice);
   store.dispatch(Action.setTokenCombatAction(attacker, combatAction));

   return environment;
}

const ShipActionAbilityTest = {};
export default ShipActionAbilityTest;