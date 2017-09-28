"use strict";

define(["qunit", "redux",
  "model/js/Action", "model/js/Adjudicator", "model/js/Reducer", "model/js/Selector", "../../../test/model/js/EnvironmentFactory"],
   function(QUnit, Redux,
      Action, Adjudicator, Reducer, Selector, EnvironmentFactory)
   {
      QUnit.module("Selector");

      QUnit.test("adjudicator()", function(assert)
      {
         // Setup.
         var store = Redux.createStore(Reducer.root);
         var adjudicator = Adjudicator.create(store);
         store.dispatch(Action.setAdjudicator(adjudicator));

         // Run.
         var result = Selector.adjudicator(store.getState());

         // Verify.
         assert.ok(result);
         assert.equal(result, adjudicator);
      });

      QUnit.test("environment()", function(assert)
      {
         // Setup.
         var environment = EnvironmentFactory.createCoreSetEnvironment();
         var store = environment.store();

         // Run.
         var result = Selector.environment(store.getState());

         // Verify.
         assert.ok(result);
         assert.equal(result, environment);
      });
   });
