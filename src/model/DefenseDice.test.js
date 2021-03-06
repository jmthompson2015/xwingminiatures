import DefenseDiceValue from "../artifact/DefenseDiceValue.js";

import Action from "./Action.js";
import DefenseDice from "./DefenseDice.js";
import Reducer from "./Reducer.js";

QUnit.module("DefenseDice");

QUnit.test("DefenseDice() size", function(assert)
{
   // Setup.
   const store = Redux.createStore(Reducer.root);
   const attackerId = 1;
   const size = 3;

   // Run.
   const dice = new DefenseDice(store, attackerId, size);

   // Verify.
   for (let i = 0; i < size; i++)
   {
      assert.ok(dice.value(i));
   }
});

QUnit.test("DefenseDice() values", function(assert)
{
   // Setup.
   const store = Redux.createStore(Reducer.root);
   const attackerId = 1;
   const values = [DefenseDiceValue.BLANK, DefenseDiceValue.EVADE, DefenseDiceValue.FOCUS];

   // Run.
   const dice = new DefenseDice(store, attackerId, values);

   // Verify.
   for (let i = 0; i < values.length; i++)
   {
      assert.equal(dice.value(i), values[i]);
   }
});

QUnit.test("DefenseDice properties", function(assert)
{
   // Setup.
   const store = Redux.createStore(Reducer.root);
   const attackerId = 1;
   const dice = new DefenseDice(store, attackerId, 3);

   assert.ok(dice.value(0));
   assert.ok(dice.value(1));
   assert.ok(dice.value(2));
});

QUnit.test("addDie()", function(assert)
{
   // Setup.
   const store = Redux.createStore(Reducer.root);
   const attackerId = 1;
   const dice = new DefenseDice(store, attackerId, 1);
   assert.equal(dice.size(), 1);

   // Run.
   dice.addDie();

   // Verify.
   assert.equal(dice.size(), 2);
   assert.ok(DefenseDiceValue.keys().includes(dice.value(1)));
});

QUnit.test("blankCount()", function(assert)
{
   // Setup.
   const store = Redux.createStore(Reducer.root);
   const attackerId = 1;
   const dice = new DefenseDice(store, attackerId, 1);

   // Run / Verify.
   if (dice.value(0) == DefenseDiceValue.BLANK)
   {
      assert.equal(dice.blankCount(), 1);
   }
   else
   {
      assert.equal(dice.blankCount(), 0);
   }
});

QUnit.test("changeAllToValue()", function(assert)
{
   // Setup.
   const dice = createFocusDice(2);
   assert.equal(dice.evadeCount(), 0);
   assert.equal(dice.focusCount(), 2);

   // Run.
   dice.changeAllToValue(DefenseDiceValue.FOCUS, DefenseDiceValue.EVADE);

   // Verify.
   assert.equal(dice.evadeCount(), 2);
   assert.equal(dice.focusCount(), 0);
});

QUnit.test("changeOneToValue()", function(assert)
{
   // Setup.
   const dice = createFocusDice(2);
   assert.equal(dice.evadeCount(), 0);
   assert.equal(dice.focusCount(), 2);

   // Run.
   dice.changeOneToValue(DefenseDiceValue.FOCUS, DefenseDiceValue.EVADE);

   // Verify.
   assert.equal(dice.evadeCount(), 1);
   assert.equal(dice.focusCount(), 1);
});

QUnit.test("evadeCount()", function(assert)
{
   // Setup.
   const store = Redux.createStore(Reducer.root);
   const attackerId = 1;
   const dice = new DefenseDice(store, attackerId, 1);

   // Run / Verify.
   if (dice.value(0) == DefenseDiceValue.EVADE)
   {
      assert.equal(dice.evadeCount(), 1);
   }
   else
   {
      assert.equal(dice.evadeCount(), 0);
   }
});

QUnit.test("focusCount()", function(assert)
{
   // Setup.
   const store = Redux.createStore(Reducer.root);
   const attackerId = 1;
   const dice = new DefenseDice(store, attackerId, 1);

   // Run / Verify.
   if (dice.value(0) == DefenseDiceValue.FOCUS)
   {
      assert.equal(dice.focusCount(), 1);
   }
   else
   {
      assert.equal(dice.focusCount(), 0);
   }
});

QUnit.test("rerollAllFocus()", function(assert)
{
   // Setup.
   const dice = createFocusDice(1);

   // Run.
   dice.rerollAllFocus();

   // Verify.
   if (dice.value(0) === DefenseDiceValue.FOCUS)
   {
      assert.equal(dice.focusCount(), 1);
   }
   else
   {
      assert.equal(dice.focusCount(), 0);
   }
});

QUnit.test("rerollBlank()", function(assert)
{
   // Setup.
   const dice = createBlankDice(1);

   // Run.
   dice.rerollBlank();

   // Verify.
   if (dice.value(0) === DefenseDiceValue.BLANK)
   {
      assert.equal(dice.blankCount(), 1);
   }
   else
   {
      assert.equal(dice.blankCount(), 0);
   }
});

QUnit.test("rerollFocus()", function(assert)
{
   //  const dice;
   //  do {
   //     dice = new DefenseDice(1);
   //  }
   //  while (dice.focusCount() === 0);
   // Setup.
   const dice = createFocusDice(1);

   // Run.
   dice.rerollFocus();

   // Verify.
   if (dice.value(0) === DefenseDiceValue.FOCUS)
   {
      assert.equal(dice.focusCount(), 1);
   }
   else
   {
      assert.equal(dice.focusCount(), 0);
   }
});

QUnit.test("spendEvadeToken()", function(assert)
{
   // Setup.
   const dice = createFocusDice(2);
   assert.equal(dice.focusCount(), 2);

   // Run.
   dice.spendEvadeToken();

   // Verify.
   assert.equal(dice.evadeCount(), 1);
   assert.equal(dice.focusCount(), 2);
});

QUnit.test("spendFocusToken()", function(assert)
{
   // Setup.
   const dice = createFocusDice(2);
   assert.equal(dice.focusCount(), 2);

   // Run.
   dice.spendFocusToken();

   // Verify.
   assert.equal(dice.evadeCount(), 2);
   assert.equal(dice.focusCount(), 0);
});

QUnit.test("toString()", function(assert)
{
   // Setup.
   const dice = createFocusDice(2);
   assert.equal(dice.focusCount(), 2);

   // Run.
   const result = dice.toString();

   // Verify.
   assert.equal(result, "attackerId=1, size=2, values=focus,focus");
});

function createBlankDice(count)
{
   const store = Redux.createStore(Reducer.root);
   const attackerId = 1;
   let answer;

   do {
      store.dispatch(Action.setTokenDefenseDice(1));
      answer = new DefenseDice(store, attackerId, count);
   }
   while (answer.blankCount() < count);

   return answer;
}

function createFocusDice(count)
{
   const store = Redux.createStore(Reducer.root);
   const attackerId = 1;
   let answer;

   do {
      store.dispatch(Action.setTokenDefenseDice(1));
      answer = new DefenseDice(store, attackerId, count);
   }
   while (answer.focusCount() < count);

   return answer;
}

const DefenseDiceTest = {};
export default DefenseDiceTest;