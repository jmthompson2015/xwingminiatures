import DamageCard from "../artifact/DamageCard.js";
import PilotCard from "../artifact/PilotCard.js";
import UpgradeCard from "../artifact/UpgradeCard.js";

import Action from "./Action.js";
import Adjudicator from "./Adjudicator.js";
import Agent from "./Agent.js";
import CardAction from "./CardAction.js";
import CardInstance from "./CardInstance.js";
import Engine from "./Engine.js";
import Environment from "./Environment.js";
import EnvironmentFactory from "./EnvironmentFactory.js";
import EventObserver from "./EventObserver.js";
import PhaseObserver from "./PhaseObserver.js";
import Position from "./Position.js";
import Reducer from "./Reducer.js";
import SquadBuilder from "./SquadBuilder.js";

QUnit.module("Engine");

var delay = 10;

QUnit.test("performActivationPhase()", function(assert)
{
   // Setup.
   var engine = createEngine();
   engine.performCombatPhase = function()
   {
      LOGGER.info("performCombatPhase() dummy");
   };
   var callback = function()
   {
      // Verify.
      assert.ok(true, "test resumed from async operation");
      done();
   };

   // Run.
   var done = assert.async();
   engine.performPlanningPhase(callback);
});

QUnit.test("performActivationPhase() Huge", function(assert)
{
   // Setup.
   var engine = createEngine(true);
   engine.performCombatPhase = function()
   {
      LOGGER.info("performCombatPhase() dummy");
   };
   var callback = function()
   {
      // Verify.
      assert.ok(true, "test resumed from async operation");
      done();
   };

   // Run.
   var done = assert.async();
   engine.performPlanningPhase(callback);
});

QUnit.test("performActivationPhase() decloak", function(assert)
{
   // Setup.
   var squadBuilder1 = SquadBuilder.findByNameAndYear("Worlds #2", 2014);
   var squadBuilder2 = SquadBuilder.findByNameAndYear("Worlds #1", 2015);
   var store = Redux.createStore(Reducer.root);
   var agent1 = new Agent(store, "1");
   var agent2 = new Agent(store, "2");
   var squad1 = squadBuilder1.buildSquad(agent1);
   var squad2 = squadBuilder2.buildSquad(agent2);
   var environment = new Environment(store, agent1, squad1, agent2, squad2);
   Adjudicator.create(store);
   store.dispatch(Action.setDelay(delay));
   var engine = new Engine(store);
   var token0 = environment.pilotInstances()[0]; // TIE Phantom
   EventObserver.observeStore(store);
   PhaseObserver.observeStore(store);
   store.dispatch(CardAction.addCloakCount(token0));
   engine.performCombatPhase = function()
   {
      LOGGER.info("performCombatPhase() dummy");
   };
   var callback = function()
   {
      // Verify.
      assert.ok(true, "test resumed from async operation");

      var token = environment.pilotInstances()[0]; // TIE Phantom
      if (token.card().key === PilotCard.WHISPER)
      {
         if (token.isCloaked())
         {
            // Ship re-cloaked.
            console.log("ship re-cloaked");
            assert.equal(token.card().key, PilotCard.WHISPER);
            assert.equal(token.isCloaked(), true);
            assert.equal(token.cloakCount(), 1);
         }
         else
         {
            assert.equal(token.card().key, PilotCard.WHISPER);
            assert.equal(token.isCloaked(), false);
            assert.equal(token.cloakCount(), 0);
         }
      }
      else
      {
         // Ship fled the battlefield.
      }

      done();
   };
   assert.equal(token0.isCloaked(), true);
   assert.equal(token0.cloakCount(), 1);

   // Run.
   var done = assert.async();
   engine.performPlanningPhase(callback);
});

QUnit.test("performCombatPhase()", function(assert)
{
   // Setup.
   var engine = createEngine();
   var environment = engine.environment();
   var token0 = environment.pilotInstances()[0]; // TIE Fighter.
   var position0 = environment.getPositionFor(token0);
   var token2 = environment.pilotInstances()[2]; // X-Wing.
   var position2 = environment.getPositionFor(token2);
   var newPosition2 = new Position(position0.x(), position0.y() + 50, position2.heading());
   environment.moveToken(position2, newPosition2);
   engine.performEndPhase = function()
   {
      LOGGER.info("performEndPhase() dummy");
   };
   var callback = function()
   {
      // Verify.
      assert.ok(true, "test resumed from async operation");
      done();
   };

   // Run.
   var done = assert.async();
   engine.performCombatPhase(callback);
});

QUnit.test("performCombatPhase() Epsilon Leader", function(assert)
{
   // Setup.
   var engine = createEngineEpsilonLeader();
   var environment = engine.environment();
   var store = environment.store();
   var tokens = environment.pilotInstances();
   var token0 = tokens[0]; // TIE/fo Fighter.
   var position0 = environment.getPositionFor(token0);
   var token1 = tokens[1]; // TIE/fo Fighter.
   var position1 = environment.getPositionFor(token1);
   var newPosition1 = new Position(position0.x() + 50, position0.y(), position1.heading());
   environment.moveToken(position1, newPosition1);
   var token2 = tokens[2]; // T-70 X-Wing.
   var position2 = environment.getPositionFor(token2);
   var newPosition2 = new Position(position0.x(), position0.y() + 50, position2.heading());
   environment.moveToken(position2, newPosition2);
   engine.performEndPhase = function()
   {
      LOGGER.info("performEndPhase() dummy");
   };
   var callback = function()
   {
      // Verify.
      assert.ok(true, "test resumed from async operation");
      assert.ok([0, 1].includes(token0.stressCount()), "token0.stressCount() === 0 | 1 actual " + token0.stressCount());
      assert.equal(token1.stressCount(), 0, "token1.stressCount() === 0");
      assert.equal(token2.stressCount(), 1, "token2.stressCount() === 1");
      done();
   };
   store.dispatch(CardAction.addStressCount(token0));
   store.dispatch(CardAction.addStressCount(token1));
   store.dispatch(CardAction.addStressCount(token2));
   assert.equal(token0.stressCount(), 1, "token0.stressCount() === 1");
   assert.equal(token1.stressCount(), 1, "token1.stressCount() === 1");
   assert.equal(token2.stressCount(), 1, "token2.stressCount() === 1");

   // Run.
   var done = assert.async();
   engine.performCombatPhase(callback);
});

QUnit.test("performCombatPhase() Mara Jade", function(assert)
{
   // Setup.
   var engine = createEngine();
   var environment = engine.environment();
   var token0 = environment.pilotInstances()[0]; // TIE Fighter.
   var store = environment.store();
   var upgrade = new CardInstance(store, UpgradeCard.MARA_JADE);
   store.dispatch(CardAction.addUpgrade(token0, upgrade));
   var position0 = environment.getPositionFor(token0);
   var token1 = environment.pilotInstances()[1]; // TIE Fighter.
   var token2 = environment.pilotInstances()[2]; // X-Wing.
   var position2 = environment.getPositionFor(token2);
   var newPosition2 = new Position(position0.x(), position0.y() + 50, position2.heading());
   environment.moveToken(position2, newPosition2);
   engine.performEndPhase = function()
   {
      LOGGER.info("performEndPhase() dummy");
   };
   var callback = function()
   {
      // Verify.
      assert.ok(true, "test resumed from async operation");
      assert.equal(token0.stressCount(), 0, "token0.stressCount() === 0");
      assert.equal(token1.stressCount(), 0, "token1.stressCount() === 0");
      var stressCount = (token0.isDestroyed() ? 0 : 1);
      assert.equal(token2.stressCount(), stressCount, "token2.stressCount() === " + stressCount);
      done();
   };

   // Run.
   var done = assert.async();
   engine.performCombatPhase(callback);
});

QUnit.test("performCombatPhase() R5-P9", function(assert)
{
   // Setup.
   var engine = createEngine();
   var environment = engine.environment();
   var store = environment.store();
   var token2 = environment.pilotInstances()[2]; // X-Wing.
   var upgrade = new CardInstance(store, UpgradeCard.R5_P9);
   store.dispatch(CardAction.addUpgrade(token2, upgrade));
   engine.performEndPhase = function()
   {
      LOGGER.info("performEndPhase() dummy");
   };
   var callback = function()
   {
      // Verify.
      assert.ok(true, "test resumed from async operation");
      assert.equal(token2.focusCount(), 0, "token2.focusCount() === 0");
      assert.equal(token2.shieldCount(), 2, "token2.shieldCount() === 2");
      done();
   };
   store.dispatch(CardAction.addFocusCount(token2));
   store.dispatch(CardAction.addShieldCount(token2, -1));
   assert.equal(token2.focusCount(), 1, "token2.focusCount() === 1");
   assert.equal(token2.shieldCount(), 1, "token2.shieldCount() === 1");

   // Run.
   var done = assert.async();
   engine.performCombatPhase(callback);
});

QUnit.test("performCombatPhase() Ysanne Isard", function(assert)
{
   // Setup.
   var engine = createEngine();
   var environment = engine.environment();
   var token0 = environment.pilotInstances()[0]; // TIE Fighter.
   var store = environment.store();
   var upgrade = new CardInstance(store, UpgradeCard.YSANNE_ISARD);
   store.dispatch(CardAction.addUpgrade(token0, upgrade));
   store.dispatch(CardAction.setShieldCount(token0));
   var damage = new CardInstance(store, DamageCard.BLINDED_PILOT);
   token0.receiveDamage(damage);
   var position0 = environment.getPositionFor(token0);
   var token2 = environment.pilotInstances()[2]; // X-Wing.
   var position2 = environment.getPositionFor(token2);
   var newPosition2 = new Position(position0.x(), position0.y() + 50, position2.heading());
   environment.moveToken(position2, newPosition2);
   engine.performEndPhase = function()
   {
      LOGGER.info("performEndPhase() dummy");
   };
   var callback = function()
   {
      // Verify.
      assert.ok(true, "test resumed from async operation");
      assert.equal(token0.shieldCount(), 0, "token0.shieldCount() === 0");
      assert.ok([1, 2, 3, 4].includes(token0.damageCount()), "token0.damageCount() === 1 | 2 | 3 | 4 actual " + token0.damageCount());
      assert.equal(token0.evadeCount(), 0, "token0.evadeCount() === 0");
      done();
   };
   assert.equal(token0.shieldCount(), 0);
   assert.equal(token0.damageCount(), 1);
   assert.equal(token0.evadeCount(), 0, "token0.evadeCount() === 0");

   // Run.
   var done = assert.async();
   engine.performCombatPhase(callback);
});

QUnit.test("performEndPhase()", function(assert)
{
   // Setup.
   var engine = createEngine();
   var environment = engine.environment();
   var store = environment.store();
   var token0 = environment.pilotInstances()[0];
   store.dispatch(CardAction.addEvadeCount(token0));
   store.dispatch(CardAction.addFocusCount(token0));
   store.dispatch(CardAction.addWeaponsDisabledCount(token0));
   var token1 = environment.pilotInstances()[1];
   store.dispatch(CardAction.addEvadeCount(token1));
   store.dispatch(CardAction.addFocusCount(token1));
   store.dispatch(CardAction.addWeaponsDisabledCount(token1));
   var token2 = environment.pilotInstances()[2];
   store.dispatch(CardAction.addEvadeCount(token2));
   store.dispatch(CardAction.addFocusCount(token2));
   store.dispatch(CardAction.addWeaponsDisabledCount(token2));
   engine.performPlanningPhase = function()
   {
      LOGGER.info("performPlanningPhase() dummy");
   };
   var callback = function()
   {
      // Verify.
      assert.ok(true, "test resumed from async operation");
      assert.equal(token0.evadeCount(), 0, token0.name());
      assert.equal(token0.focusCount(), 0);
      assert.equal(token0.weaponsDisabledCount(), 0);
      assert.equal(token1.evadeCount(), 0, token1.name());
      assert.equal(token1.focusCount(), 0);
      assert.equal(token1.weaponsDisabledCount(), 0);
      assert.equal(token2.evadeCount(), 0, token2.name());
      assert.equal(token2.focusCount(), 0);
      assert.equal(token2.weaponsDisabledCount(), 0);
      done();
   };

   // Run.
   var done = assert.async();
   engine.performEndPhase(callback);
});

QUnit.test("performPlanningPhase()", function(assert)
{
   // Setup.
   var engine = createEngine();
   engine.performActivationPhase = function()
   {
      LOGGER.info("performActivationPhase() dummy");
   };
   var store = engine.store();
   var environment = store.getState().environment;
   var callback = function()
   {
      // Verify.
      assert.ok(true, "test resumed from async operation");
      var pilotInstances = environment.pilotInstances();
      var pilotToManeuver = store.getState().pilotToManeuver;
      assert.ok(pilotToManeuver);
      var keys = pilotToManeuver.keySeq().toArray();
      assert.ok(keys);
      assert.equal(keys.length, pilotInstances.length);
      keys.forEach(function(key)
      {
         assert.ok(pilotToManeuver.get(key));
      });

      done();
   };

   // Run.
   var done = assert.async();
   engine.performPlanningPhase(callback);
});

function createEngine(isHuge)
{
   var environment;

   if (isHuge)
   {
      environment = EnvironmentFactory.createHugeShipEnvironment();
   }
   else
   {
      environment = EnvironmentFactory.createCoreSetEnvironment();
   }

   var store = environment.store();
   var adjudicator = Adjudicator.create(store);
   store.dispatch(Action.setAdjudicator(adjudicator));
   store.dispatch(Action.setDelay(delay));

   return new Engine(store);
}

function createEngineEpsilonLeader()
{
   var environment = EnvironmentFactory.createTFACoreSetEnvironment();
   var store = environment.store();
   var adjudicator = Adjudicator.create(store);
   store.dispatch(Action.setAdjudicator(adjudicator));
   store.dispatch(Action.setDelay(delay));

   return new Engine(store);
}

const EngineTest = {};
export default EngineTest;