"use strict";

define(["common/js/InputValidator", "model/js/Action", "model/js/CombatAction", "model/js/QueueProcessor"],
   function(InputValidator, Action, CombatAction, QueueProcessor)
   {
      function CombatPhaseTask(store)
      {
         InputValidator.validateNotNull("store", store);

         this.store = function()
         {
            return store;
         };
      }

      CombatPhaseTask.prototype.delay = function()
      {
         return 10;
      };

      CombatPhaseTask.prototype.doIt = function(callback)
      {
         InputValidator.validateNotNull("callback", callback);

         LOGGER.trace("CombatPhaseTask.doIt() start");

         var store = this.store();
         var environment = store.getState().environment;

         var queue = environment.getTokensForCombat();
         var elementFunction = this.combatElementFunction.bind(this);
         var phaseCallback = this.finishCombatPhase.bind(this);
         var finishFunction = function(finishCallback)
         {
            phaseCallback(finishCallback);
         };
         var delay = this.delay();

         var queueProcessor = new QueueProcessor(queue, callback, elementFunction, finishFunction, delay);
         queueProcessor.processQueue();

         LOGGER.trace("CombatPhaseTask.doIt() end");
      };

      CombatPhaseTask.prototype.combatElementFunction = function(attacker, queueCallback)
      {
         InputValidator.validateNotNull("attacker", attacker);
         InputValidator.validateIsFunction("queueCallback", queueCallback);

         LOGGER.trace("CombatPhaseTask.combatElementFunction() start");
         var store = this.store();
         var environment = store.getState().environment;
         environment.setActiveToken(attacker);

         var agent = attacker.agent();
         var agentCallback = function(weapon, defender)
         {
            if (weapon && defender)
            {
               store.dispatch(Action.setUserMessage(attacker + " fires upon " + defender));
               var combatAction = new CombatAction(store, attacker, weapon, defender, queueCallback);
               combatAction.doIt();
            }
            else
            {
               queueCallback();
            }
         };
         agent.chooseWeaponAndDefender(attacker, agentCallback);

         LOGGER.trace("CombatPhaseTask.combatElementFunction() end");
      };

      CombatPhaseTask.prototype.finishCombatPhase = function(callback)
      {
         InputValidator.validateNotNull("callback", callback);

         LOGGER.trace("CombatPhaseTask.finishCombatPhase() start");

         callback();

         LOGGER.trace("CombatPhaseTask.finishCombatPhase() end");
      };

      return CombatPhaseTask;
   });