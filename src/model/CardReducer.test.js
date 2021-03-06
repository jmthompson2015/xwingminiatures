import Count from "../artifact/Count.js";
import DamageCard from "../artifact/DamageCard.js";
import Phase from "../artifact/Phase.js";
import PilotCard from "../artifact/PilotCard.js";
import ShipAction from "../artifact/ShipAction.js";
import UpgradeCard from "../artifact/UpgradeCard.js";

import Ability from "./Ability.js";
import Agent from "./Agent.js";
import CardAction from "./CardAction.js";
import CardInstance from "./CardInstance.js";
import DamageAbility3 from "./DamageAbility3.js";
import EnvironmentAction from "./EnvironmentAction.js";
import PilotAbility3 from "./PilotAbility3.js";
import Position from "./Position.js";
import Reducer from "./Reducer.js";
import ShipActionAbility from "./ShipActionAbility.js";
import UpgradeAbility3 from "./UpgradeAbility3.js";

QUnit.module("CardReducer");

QUnit.test("addCloakCount()", function(assert)
{
   // Setup.
   const store = Redux.createStore(Reducer.root);
   const token = new CardInstance(store, PilotCard.ACADEMY_PILOT, new Agent(store, "Imperial"));
   store.dispatch(EnvironmentAction.placeToken(new Position(10, 20, 30), token));
   const property = Count.CLOAK;
   assert.ok(store.getState().cardCounts.get(token.id()));
   assert.equal(store.getState().cardCounts.get(token.id()).get(property), 0);

   // Run.
   store.dispatch(CardAction.addCloakCount(token));

   // Verify.
   assert.ok(store.getState().cardCounts.get(token.id()));
   assert.equal(store.getState().cardCounts.get(token.id()).get(property), 1);

   // Run.
   store.dispatch(CardAction.addCloakCount(token, 2));

   // Verify.
   assert.ok(store.getState().cardCounts.get(token.id()));
   assert.equal(store.getState().cardCounts.get(token.id()).get(property), 3);
});

QUnit.test("addCount()", function(assert)
{
   // Setup.
   const store = Redux.createStore(Reducer.root);
   const token = new CardInstance(store, PilotCard.ACADEMY_PILOT, new Agent(store, "Imperial"));
   store.dispatch(EnvironmentAction.placeToken(new Position(10, 20, 30), token));
   const property = "focus";
   assert.ok(store.getState().cardCounts.get(token.id()));
   assert.equal(store.getState().cardCounts.get(token.id()).get(property), 0);

   // Run.
   store.dispatch(CardAction.addCount(token, property));

   // Verify.
   assert.ok(store.getState().cardCounts.get(token.id()));
   assert.equal(store.getState().cardCounts.get(token.id()).get(property), 1);

   // Run.
   store.dispatch(CardAction.addCount(token, property, 2));

   // Verify.
   assert.ok(store.getState().cardCounts.get(token.id()));
   assert.equal(store.getState().cardCounts.get(token.id()).get(property), 3);

   // Run.
   store.dispatch(CardAction.addCount(token, property, -4));

   // Verify.
   assert.ok(store.getState().cardCounts.get(token.id()));
   assert.equal(store.getState().cardCounts.get(token.id()).get(property), 0);
});

QUnit.test("addEnergyCount()", function(assert)
{
   // Setup.
   const store = Redux.createStore(Reducer.root);
   const token = new CardInstance(store, PilotCard.ACADEMY_PILOT, new Agent(store, "Imperial"));
   store.dispatch(EnvironmentAction.placeToken(new Position(10, 20, 30), token));
   const property = Count.ENERGY;
   assert.ok(store.getState().cardCounts.get(token.id()));
   assert.equal(store.getState().cardCounts.get(token.id()).get(property), 0);

   // Run.
   store.dispatch(CardAction.addEnergyCount(token));

   // Verify.
   assert.ok(store.getState().cardCounts.get(token.id()));
   assert.equal(store.getState().cardCounts.get(token.id()).get(property), 1);

   // Run.
   store.dispatch(CardAction.addEnergyCount(token, 2));

   // Verify.
   assert.ok(store.getState().cardCounts.get(token.id()));
   assert.equal(store.getState().cardCounts.get(token.id()).get(property), 3);
});

QUnit.test("addEvadeCount()", function(assert)
{
   // Setup.
   const store = Redux.createStore(Reducer.root);
   const token = new CardInstance(store, PilotCard.ACADEMY_PILOT, new Agent(store, "Imperial"));
   store.dispatch(EnvironmentAction.placeToken(new Position(10, 20, 30), token));
   const property = Count.EVADE;
   assert.ok(store.getState().cardCounts.get(token.id()));
   assert.equal(store.getState().cardCounts.get(token.id()).get(property), 0);

   // Run.
   store.dispatch(CardAction.addEvadeCount(token));

   // Verify.
   assert.ok(store.getState().cardCounts.get(token.id()));
   assert.equal(store.getState().cardCounts.get(token.id()).get(property), 1);

   // Run.
   store.dispatch(CardAction.addEvadeCount(token, 2));

   // Verify.
   assert.ok(store.getState().cardCounts.get(token.id()));
   assert.equal(store.getState().cardCounts.get(token.id()).get(property), 3);
});

QUnit.test("addFocusCount()", function(assert)
{
   // Setup.
   const store = Redux.createStore(Reducer.root);
   const token = new CardInstance(store, PilotCard.ACADEMY_PILOT, new Agent(store, "Imperial"));
   store.dispatch(EnvironmentAction.placeToken(new Position(10, 20, 30), token));
   const property = Count.FOCUS;
   assert.ok(store.getState().cardCounts.get(token.id()));
   assert.equal(store.getState().cardCounts.get(token.id()).get(property), 0);

   // Run.
   store.dispatch(CardAction.addFocusCount(token));

   // Verify.
   assert.ok(store.getState().cardCounts.get(token.id()));
   assert.equal(store.getState().cardCounts.get(token.id()).get(property), 1);

   // Run.
   store.dispatch(CardAction.addFocusCount(token, 2));

   // Verify.
   assert.ok(store.getState().cardCounts.get(token.id()));
   assert.equal(store.getState().cardCounts.get(token.id()).get(property), 3);
});

QUnit.test("addIonCount()", function(assert)
{
   // Setup.
   const store = Redux.createStore(Reducer.root);
   const token = new CardInstance(store, PilotCard.ACADEMY_PILOT, new Agent(store, "Imperial"));
   store.dispatch(EnvironmentAction.placeToken(new Position(10, 20, 30), token));
   const property = Count.ION;
   assert.ok(store.getState().cardCounts.get(token.id()));
   assert.equal(store.getState().cardCounts.get(token.id()).get(property), 0);

   // Run.
   store.dispatch(CardAction.addIonCount(token));

   // Verify.
   assert.ok(store.getState().cardCounts.get(token.id()));
   assert.equal(store.getState().cardCounts.get(token.id()).get(property), 1);

   // Run.
   store.dispatch(CardAction.addIonCount(token, 2));

   // Verify.
   assert.ok(store.getState().cardCounts.get(token.id()));
   assert.equal(store.getState().cardCounts.get(token.id()).get(property), 3);
});

QUnit.test("addReinforceCount()", function(assert)
{
   // Setup.
   const store = Redux.createStore(Reducer.root);
   const token = new CardInstance(store, PilotCard.ACADEMY_PILOT, new Agent(store, "Imperial"));
   store.dispatch(EnvironmentAction.placeToken(new Position(10, 20, 30), token));
   const property = Count.REINFORCE;
   assert.ok(store.getState().cardCounts.get(token.id()));
   assert.equal(store.getState().cardCounts.get(token.id()).get(property), 0);

   // Run.
   store.dispatch(CardAction.addReinforceCount(token));

   // Verify.
   assert.ok(store.getState().cardCounts.get(token.id()));
   assert.equal(store.getState().cardCounts.get(token.id()).get(property), 1);

   // Run.
   store.dispatch(CardAction.addReinforceCount(token, 2));

   // Verify.
   assert.ok(store.getState().cardCounts.get(token.id()));
   assert.equal(store.getState().cardCounts.get(token.id()).get(property), 3);
});

QUnit.test("addShieldCount()", function(assert)
{
   // Setup.
   const store = Redux.createStore(Reducer.root);
   const token = new CardInstance(store, PilotCard.ACADEMY_PILOT, new Agent(store, "Imperial"));
   store.dispatch(EnvironmentAction.placeToken(new Position(10, 20, 30), token));
   const property = Count.SHIELD;
   assert.ok(store.getState().cardCounts.get(token.id()));
   assert.equal(store.getState().cardCounts.get(token.id()).get(property), 0);

   // Run.
   store.dispatch(CardAction.addShieldCount(token));

   // Verify.
   assert.ok(store.getState().cardCounts.get(token.id()));
   assert.equal(store.getState().cardCounts.get(token.id()).get(property), 1);

   // Run.
   store.dispatch(CardAction.addShieldCount(token, 2));

   // Verify.
   assert.ok(store.getState().cardCounts.get(token.id()));
   assert.equal(store.getState().cardCounts.get(token.id()).get(property), 3);
});

QUnit.test("addStressCount()", function(assert)
{
   // Setup.
   const store = Redux.createStore(Reducer.root);
   const token = new CardInstance(store, PilotCard.ACADEMY_PILOT, new Agent(store, "Imperial"));
   store.dispatch(EnvironmentAction.placeToken(new Position(10, 20, 30), token));
   const property = Count.STRESS;
   assert.ok(store.getState().cardCounts.get(token.id()));
   assert.equal(store.getState().cardCounts.get(token.id()).get(property), 0);

   // Run.
   store.dispatch(CardAction.addStressCount(token));

   // Verify.
   assert.ok(store.getState().cardCounts.get(token.id()));
   assert.equal(store.getState().cardCounts.get(token.id()).get(property), 1);

   // Run.
   store.dispatch(CardAction.addStressCount(token, 2));

   // Verify.
   assert.ok(store.getState().cardCounts.get(token.id()));
   assert.equal(store.getState().cardCounts.get(token.id()).get(property), 3);
});

QUnit.test("removeDamage()", function(assert)
{
   // Setup.
   const store = Redux.createStore(Reducer.root);
   const token = new CardInstance(store, PilotCard.ACADEMY_PILOT, new Agent(store, "Imperial"));
   const damageInstance0 = new CardInstance(store, DamageCard.BLINDED_PILOT);
   const damageInstance1 = new CardInstance(store, DamageCard.CONSOLE_FIRE);
   store.dispatch(CardAction.addDamage(token, damageInstance0));
   store.dispatch(CardAction.addDamage(token, damageInstance1));
   let damages = store.getState().cardDamages.get(token.id());
   assert.ok(damages);
   assert.equal(damages.size, 2);
   assert.equal(damages.get(0), damageInstance0.id());
   assert.equal(damages.get(1), damageInstance1.id());

   // Run.
   store.dispatch(CardAction.removeDamage(token, damageInstance1));

   // Verify.
   damages = store.getState().cardDamages.get(token.id());
   assert.ok(damages);
   assert.equal(damages.size, 1);
   assert.equal(damages.get(0), damageInstance0.id());

   // Run.
   store.dispatch(CardAction.removeDamage(token, damageInstance0));

   // Verify.
   damages = store.getState().cardDamages.get(token.id());
   assert.ok(damages);
   assert.equal(damages.size, 0);
});

QUnit.test("removeTokenUpgrade()", function(assert)
{
   // Setup.
   const store = Redux.createStore(Reducer.root);
   const token = new CardInstance(store, PilotCard.ACADEMY_PILOT, new Agent(store, "Imperial"));
   store.dispatch(EnvironmentAction.placeToken(new Position(10, 20, 30), token));
   const upgrade0 = new CardInstance(store, UpgradeCard.ADRENALINE_RUSH);
   const upgrade1 = new CardInstance(store, UpgradeCard.CALCULATION);
   store.dispatch(CardAction.addUpgrade(token, upgrade0));
   store.dispatch(CardAction.addUpgrade(token, upgrade1));
   assert.ok(store.getState().cardUpgrades.get(token.id()));
   assert.equal(store.getState().cardUpgrades.get(token.id()).size, 2);
   assert.equal(store.getState().cardUpgrades.get(token.id()).get(0).cardKey, upgrade0.cardKey);
   assert.equal(store.getState().cardUpgrades.get(token.id()).get(1).cardKey, upgrade1.cardKey);

   // Run.
   store.dispatch(CardAction.removeUpgrade(token, upgrade1));

   // Verify.
   assert.ok(store.getState().cardUpgrades.get(token.id()));
   assert.equal(store.getState().cardUpgrades.get(token.id()).size, 1);
   assert.equal(store.getState().cardUpgrades.get(token.id()).get(0).cardKey, upgrade0.cardKey);

   // Run.
   store.dispatch(CardAction.removeUpgrade(token, upgrade0));

   // Verify.
   assert.ok(store.getState().cardUpgrades.get(token.id()));
   assert.equal(store.getState().cardUpgrades.get(token.id()).size, 0);
});

QUnit.test("removeTokenUsedAbility()", function(assert)
{
   // Setup.
   const store = Redux.createStore(Reducer.root);
   const token = new CardInstance(store, PilotCard.ACADEMY_PILOT, new Agent(store, "Imperial"));
   const damage = new Ability(DamageCard, DamageCard.BLINDED_PILOT, DamageAbility3, Phase.COMBAT_DEAL_DAMAGE);
   const pilot = new Ability(PilotCard, PilotCard.ACADEMY_PILOT, PilotAbility3, Phase.COMBAT_MODIFY_ATTACK_DICE);
   const shipAction = new Ability(ShipAction, ShipAction.EVADE, ShipActionAbility, ShipActionAbility.ABILITY_KEY);
   const upgrade = new Ability(UpgradeCard, UpgradeCard.A_WING_TEST_PILOT, UpgradeAbility3, Phase.COMBAT_MODIFY_ATTACK_DICE);
   store.dispatch(CardAction.addUsedAbility(token, damage));
   store.dispatch(CardAction.addUsedAbility(token, pilot));
   store.dispatch(CardAction.addUsedAbility(token, shipAction));
   store.dispatch(CardAction.addUsedAbility(token, upgrade));
   let usedAbilities = token.usedAbilities();
   assert.equal(usedAbilities.size, 4);
   assert.equal(usedAbilities.get(0).source(), DamageCard);
   assert.equal(usedAbilities.get(1).source(), PilotCard);
   assert.equal(usedAbilities.get(2).source(), ShipAction);
   assert.equal(usedAbilities.get(3).source(), UpgradeCard);

   // Run.
   store.dispatch(CardAction.removeUsedAbility(token, shipAction));

   // Verify.
   usedAbilities = token.usedAbilities();
   assert.equal(usedAbilities.size, 3);
   assert.equal(usedAbilities.get(0).source(), DamageCard);
   assert.equal(usedAbilities.get(1).source(), PilotCard);
   assert.equal(usedAbilities.get(2).source(), UpgradeCard);

   // Run.
   store.dispatch(CardAction.removeUsedAbility(token, damage));

   // Verify.
   usedAbilities = token.usedAbilities();
   assert.equal(usedAbilities.size, 2);
   assert.equal(usedAbilities.get(0).source(), PilotCard);
   assert.equal(usedAbilities.get(1).source(), UpgradeCard);

   // Run.
   store.dispatch(CardAction.removeUsedAbility(token, upgrade));

   // Verify.
   usedAbilities = token.usedAbilities();
   assert.equal(usedAbilities.size, 1);
   assert.equal(usedAbilities.get(0).source(), PilotCard);
});

QUnit.test("removeTokenUsedPerRoundAbility()", function(assert)
{
   // Setup.
   const store = Redux.createStore(Reducer.root);
   const token = new CardInstance(store, PilotCard.ACADEMY_PILOT, new Agent(store, "Imperial"));
   const damage = new Ability(DamageCard, DamageCard.BLINDED_PILOT, DamageAbility3, Phase.COMBAT_DEAL_DAMAGE);
   const pilot = new Ability(PilotCard, PilotCard.ACADEMY_PILOT, PilotAbility3, Phase.COMBAT_MODIFY_ATTACK_DICE);
   const shipAction = new Ability(ShipAction, ShipAction.EVADE, ShipActionAbility, ShipActionAbility.ABILITY_KEY);
   const upgrade = new Ability(UpgradeCard, UpgradeCard.A_WING_TEST_PILOT, UpgradeAbility3, Phase.COMBAT_MODIFY_ATTACK_DICE);
   store.dispatch(CardAction.addUsedPerRoundAbility(token, damage));
   store.dispatch(CardAction.addUsedPerRoundAbility(token, pilot));
   store.dispatch(CardAction.addUsedPerRoundAbility(token, shipAction));
   store.dispatch(CardAction.addUsedPerRoundAbility(token, upgrade));
   let usedAbilities = token.usedPerRoundAbilities();
   assert.equal(usedAbilities.size, 4);
   assert.equal(usedAbilities.get(0).source(), DamageCard);
   assert.equal(usedAbilities.get(1).source(), PilotCard);
   assert.equal(usedAbilities.get(2).source(), ShipAction);
   assert.equal(usedAbilities.get(3).source(), UpgradeCard);

   // Run.
   store.dispatch(CardAction.removeUsedPerRoundAbility(token, shipAction));

   // Verify.
   usedAbilities = token.usedPerRoundAbilities();
   assert.equal(usedAbilities.size, 3);
   assert.equal(usedAbilities.get(0).source(), DamageCard);
   assert.equal(usedAbilities.get(1).source(), PilotCard);
   assert.equal(usedAbilities.get(2).source(), UpgradeCard);

   // Run.
   store.dispatch(CardAction.removeUsedPerRoundAbility(token, damage));

   // Verify.
   usedAbilities = token.usedPerRoundAbilities();
   assert.equal(usedAbilities.size, 2);
   assert.equal(usedAbilities.get(0).source(), PilotCard);
   assert.equal(usedAbilities.get(1).source(), UpgradeCard);

   // Run.
   store.dispatch(CardAction.removeUsedPerRoundAbility(token, upgrade));

   // Verify.
   usedAbilities = token.usedPerRoundAbilities();
   assert.equal(usedAbilities.size, 1);
   assert.equal(usedAbilities.get(0).source(), PilotCard);
});

QUnit.test("setCloakCount()", function(assert)
{
   // Setup.
   const store = Redux.createStore(Reducer.root);
   const token = new CardInstance(store, PilotCard.ACADEMY_PILOT, new Agent(store, "Imperial"));
   store.dispatch(EnvironmentAction.placeToken(new Position(10, 20, 30), token));
   const property = Count.CLOAK;
   store.dispatch(CardAction.addCloakCount(token));
   assert.ok(store.getState().cardCounts.get(token.id()));
   assert.equal(store.getState().cardCounts.get(token.id()).get(property), 1);

   // Run.
   store.dispatch(CardAction.setCloakCount(token, 12));

   // Verify.
   assert.ok(store.getState().cardCounts.get(token.id()));
   assert.equal(store.getState().cardCounts.get(token.id()).get(property), 12);
});

QUnit.test("setCount()", function(assert)
{
   // Setup.
   const store = Redux.createStore(Reducer.root);
   const token = new CardInstance(store, PilotCard.ACADEMY_PILOT, new Agent(store, "Imperial"));
   store.dispatch(EnvironmentAction.placeToken(new Position(10, 20, 30), token));
   const property = "focus";
   store.dispatch(CardAction.addCount(token, property));
   assert.ok(store.getState().cardCounts.get(token.id()));
   assert.equal(store.getState().cardCounts.get(token.id()).get(property), 1);

   // Run.
   store.dispatch(CardAction.setCount(token, property, 12));

   // Verify.
   assert.ok(store.getState().cardCounts.get(token.id()));
   assert.equal(store.getState().cardCounts.get(token.id()).get(property), 12);
});

QUnit.test("setEnergyCount()", function(assert)
{
   // Setup.
   const store = Redux.createStore(Reducer.root);
   const token = new CardInstance(store, PilotCard.ACADEMY_PILOT, new Agent(store, "Imperial"));
   store.dispatch(EnvironmentAction.placeToken(new Position(10, 20, 30), token));
   const property = Count.ENERGY;
   store.dispatch(CardAction.addEnergyCount(token));
   assert.ok(store.getState().cardCounts.get(token.id()));
   assert.equal(store.getState().cardCounts.get(token.id()).get(property), 1);

   // Run.
   store.dispatch(CardAction.setEnergyCount(token, 12));

   // Verify.
   assert.ok(store.getState().cardCounts.get(token.id()));
   assert.equal(store.getState().cardCounts.get(token.id()).get(property), 12);
});

QUnit.test("setEvadeCount()", function(assert)
{
   // Setup.
   const store = Redux.createStore(Reducer.root);
   const token = new CardInstance(store, PilotCard.ACADEMY_PILOT, new Agent(store, "Imperial"));
   store.dispatch(EnvironmentAction.placeToken(new Position(10, 20, 30), token));
   const property = Count.EVADE;
   store.dispatch(CardAction.addEvadeCount(token));
   assert.ok(store.getState().cardCounts.get(token.id()));
   assert.equal(store.getState().cardCounts.get(token.id()).get(property), 1);

   // Run.
   store.dispatch(CardAction.setEvadeCount(token, 12));

   // Verify.
   assert.ok(store.getState().cardCounts.get(token.id()));
   assert.equal(store.getState().cardCounts.get(token.id()).get(property), 12);
});

QUnit.test("setFaceUp()", function(assert)
{
   // Setup.
   const store = Redux.createStore(Reducer.root);
   const cardInstance = new CardInstance(store, DamageCard.BLINDED_PILOT);
   assert.equal(store.getState().cardIsFaceUp.get(cardInstance.id()), undefined);

   // Run.
   store.dispatch(CardAction.setFaceUp(cardInstance, true));

   // Verify.
   assert.equal(store.getState().cardIsFaceUp.get(cardInstance.id()), true);

   // Run.
   store.dispatch(CardAction.setFaceUp(cardInstance, false));

   // Verify.
   assert.equal(store.getState().cardIsFaceUp.get(cardInstance.id()), false);
});

QUnit.test("setFocusCount()", function(assert)
{
   // Setup.
   const store = Redux.createStore(Reducer.root);
   const token = new CardInstance(store, PilotCard.ACADEMY_PILOT, new Agent(store, "Imperial"));
   store.dispatch(EnvironmentAction.placeToken(new Position(10, 20, 30), token));
   const property = Count.FOCUS;
   store.dispatch(CardAction.addFocusCount(token));
   assert.ok(store.getState().cardCounts.get(token.id()));
   assert.equal(store.getState().cardCounts.get(token.id()).get(property), 1);

   // Run.
   store.dispatch(CardAction.setFocusCount(token, 12));

   // Verify.
   assert.ok(store.getState().cardCounts.get(token.id()));
   assert.equal(store.getState().cardCounts.get(token.id()).get(property), 12);
});

QUnit.test("setIonCount()", function(assert)
{
   // Setup.
   const store = Redux.createStore(Reducer.root);
   const token = new CardInstance(store, PilotCard.ACADEMY_PILOT, new Agent(store, "Imperial"));
   store.dispatch(EnvironmentAction.placeToken(new Position(10, 20, 30), token));
   const property = Count.ION;
   store.dispatch(CardAction.addIonCount(token));
   assert.ok(store.getState().cardCounts.get(token.id()));
   assert.equal(store.getState().cardCounts.get(token.id()).get(property), 1);

   // Run.
   store.dispatch(CardAction.setIonCount(token, 12));

   // Verify.
   assert.ok(store.getState().cardCounts.get(token.id()));
   assert.equal(store.getState().cardCounts.get(token.id()).get(property), 12);
});

QUnit.test("setReinforceCount()", function(assert)
{
   // Setup.
   const store = Redux.createStore(Reducer.root);
   const token = new CardInstance(store, PilotCard.ACADEMY_PILOT, new Agent(store, "Imperial"));
   store.dispatch(EnvironmentAction.placeToken(new Position(10, 20, 30), token));
   const property = Count.REINFORCE;
   store.dispatch(CardAction.addReinforceCount(token));
   assert.ok(store.getState().cardCounts.get(token.id()));
   assert.equal(store.getState().cardCounts.get(token.id()).get(property), 1);

   // Run.
   store.dispatch(CardAction.setReinforceCount(token, 12));

   // Verify.
   assert.ok(store.getState().cardCounts.get(token.id()));
   assert.equal(store.getState().cardCounts.get(token.id()).get(property), 12);
});

QUnit.test("setShieldCount()", function(assert)
{
   // Setup.
   const store = Redux.createStore(Reducer.root);
   const token = new CardInstance(store, PilotCard.ACADEMY_PILOT, new Agent(store, "Imperial"));
   store.dispatch(EnvironmentAction.placeToken(new Position(10, 20, 30), token));
   const property = Count.SHIELD;
   store.dispatch(CardAction.addShieldCount(token));
   assert.ok(store.getState().cardCounts.get(token.id()));
   assert.equal(store.getState().cardCounts.get(token.id()).get(property), 1);

   // Run.
   store.dispatch(CardAction.setShieldCount(token, 12));

   // Verify.
   assert.ok(store.getState().cardCounts.get(token.id()));
   assert.equal(store.getState().cardCounts.get(token.id()).get(property), 12);
});

QUnit.test("setStressCount()", function(assert)
{
   // Setup.
   const store = Redux.createStore(Reducer.root);
   const token = new CardInstance(store, PilotCard.ACADEMY_PILOT, new Agent(store, "Imperial"));
   store.dispatch(EnvironmentAction.placeToken(new Position(10, 20, 30), token));
   const property = Count.STRESS;
   store.dispatch(CardAction.addStressCount(token));
   assert.ok(store.getState().cardCounts.get(token.id()));
   assert.equal(store.getState().cardCounts.get(token.id()).get(property), 1);

   // Run.
   store.dispatch(CardAction.setStressCount(token, 12));

   // Verify.
   assert.ok(store.getState().cardCounts.get(token.id()));
   assert.equal(store.getState().cardCounts.get(token.id()).get(property), 12);
});

QUnit.test("setWeaponsDisabledCount()", function(assert)
{
   // Setup.
   const store = Redux.createStore(Reducer.root);
   const token = new CardInstance(store, PilotCard.ACADEMY_PILOT, new Agent(store, "Imperial"));
   store.dispatch(EnvironmentAction.placeToken(new Position(10, 20, 30), token));
   const property = Count.WEAPONS_DISABLED;
   store.dispatch(CardAction.addWeaponsDisabledCount(token));
   assert.ok(store.getState().cardCounts.get(token.id()));
   assert.equal(store.getState().cardCounts.get(token.id()).get(property), 1);

   // Run.
   store.dispatch(CardAction.setWeaponsDisabledCount(token, 12));

   // Verify.
   assert.ok(store.getState().cardCounts.get(token.id()));
   assert.equal(store.getState().cardCounts.get(token.id()).get(property), 12);
});

const CardReducerTest = {};
export default CardReducerTest;