import InputValidator from "../utility/InputValidator.js";

import Phase from "../artifact/Phase.js";
import ShipAction from "../artifact/ShipAction.js";

import Action from "./Action.js";
import CardAction from "./CardAction.js";
import DamageAbility1 from "./DamageAbility1.js";
import DamageAbility2 from "./DamageAbility2.js";
import DamageAbility3 from "./DamageAbility3.js";
import DamageAbility4 from "./DamageAbility4.js";
import Observer from "./Observer.js";
import PilotAbility1 from "./PilotAbility1.js";
import PilotAbility2 from "./PilotAbility2.js";
import PilotAbility3 from "./PilotAbility3.js";
import PilotAbility4 from "./PilotAbility4.js";
import QueueProcessor from "./QueueProcessor.js";
import UpgradeAbility1 from "./UpgradeAbility1.js";
import UpgradeAbility2 from "./UpgradeAbility2.js";
import UpgradeAbility3 from "./UpgradeAbility3.js";
import UpgradeAbility4 from "./UpgradeAbility4.js";

function PhaseObserver(store)
{
   InputValidator.validateNotNull("store", store);

   this.store = function()
   {
      return store;
   };
}

//////////////////////////////////////////////////////////////////////////
// Creation methods.

PhaseObserver.observeStore = function(store)
{
   var observer = new PhaseObserver(store);

   var select = function(state)
   {
      return state.phaseQueue;
   };

   Observer.observeStore(store, select, observer.onChange.bind(observer));

   return observer;
};

//////////////////////////////////////////////////////////////////////////
// Behavior methods.

PhaseObserver.prototype.onChange = function(phaseQueue)
{
   LOGGER.trace("PhaseObserver.onChange() start");

   if (phaseQueue.size > 0)
   {
      var store = this.store();
      store.dispatch(Action.dequeuePhase());
      var phaseData = store.getState().phaseData;

      LOGGER.debug("phaseData = " + JSON.stringify(phaseData));

      if (phaseData !== undefined)
      {
         var environment = store.getState().environment;
         var queue = environment.getTokensForActivation();
         var pilotInstanceCallback = this.finishOnChange.bind(this);
         var callback = function()
         {
            pilotInstanceCallback(phaseData);
         };
         var pilotInstanceFunction = this.chooseAbility.bind(this);
         var elementFunction = function(pilotInstance, queueCallback)
         {
            pilotInstanceFunction(phaseData, pilotInstance, queueCallback);
         };
         var delay = 10;
         var queueProcessor = new QueueProcessor(queue, callback, elementFunction, undefined, delay);
         queueProcessor.processQueue();
      }
   }

   LOGGER.trace("PhaseObserver.onChange() end");
};

PhaseObserver.prototype.chooseAbility = function(phaseData, pilotInstance, queueCallback)
{
   LOGGER.trace("PhaseObserver.chooseAbility() start");

   InputValidator.validateNotNull("phaseData", phaseData);
   InputValidator.validateNotNull("pilotInstance", pilotInstance);
   InputValidator.validateNotNull("queueCallback", queueCallback);

   var phaseKey = phaseData.get("phaseKey");
   var phaseContext = phaseData.get("phaseContext");

   var agent = pilotInstance.agent();
   var that = this;
   var agentCallback = function(ability, isAccepted)
   {
      that.finishChooseAbility(phaseData, pilotInstance, queueCallback, ability, isAccepted);
   };
   var defender;
   if (phaseContext)
   {
      defender = phaseContext.defender;
   }

   if (phaseKey === Phase.ACTIVATION_PERFORM_ACTION)
   {
      agent.getShipAction(pilotInstance, agentCallback);
   }
   else if (phaseKey === Phase.COMBAT_MODIFY_ATTACK_DICE)
   {
      agent.getModifyAttackDiceAction(pilotInstance, defender, agentCallback);
   }
   else if (phaseKey === Phase.COMBAT_MODIFY_DEFENSE_DICE)
   {
      var defenderAgent = defender.agent();
      defenderAgent.getModifyDefenseDiceAction(pilotInstance, defender, agentCallback);
   }
   else
   {
      var abilityTypes = PhaseObserver.abilityTypes(phaseKey);
      var damageAbilities = (pilotInstance.usableDamageAbilities !== undefined ? pilotInstance.usableDamageAbilities(abilityTypes[0], phaseKey) : []);
      var pilotAbilities = (pilotInstance.usablePilotAbilities !== undefined ? pilotInstance.usablePilotAbilities(abilityTypes[1], phaseKey) : []);
      var upgradeAbilities = (pilotInstance.usableUpgradeAbilities !== undefined ? pilotInstance.usableUpgradeAbilities(abilityTypes[2], phaseKey) : []);

      if (damageAbilities.length > 0 || pilotAbilities.length > 0 || upgradeAbilities.length > 0)
      {
         agent.chooseAbility(damageAbilities, pilotAbilities, upgradeAbilities, agentCallback);
      }
      else
      {
         queueCallback();
      }
   }

   LOGGER.trace("PhaseObserver.chooseAbility() end");
};

PhaseObserver.prototype.finishChooseAbility = function(phaseData, pilotInstance, queueCallback, ability, isAccepted)
{
   LOGGER.trace("PhaseObserver.finishChooseAbility() start");

   InputValidator.validateNotNull("phaseData", phaseData);
   InputValidator.validateNotNull("pilotInstance", pilotInstance);
   InputValidator.validateNotNull("queueCallback", queueCallback);
   // ability optional.
   // isAccepted optional.

   LOGGER.debug("PhaseObserver.finishChooseAbility() ability = " + ability + " isAccepted ? " + isAccepted);

   var that = this;
   var backFunction = function()
   {
      that.chooseAbility(phaseData, pilotInstance, queueCallback);
   };
   var forwardFunction = function()
   {
      queueCallback();
   };

   this.finish(phaseData, pilotInstance, backFunction, forwardFunction, ability, isAccepted);

   LOGGER.trace("PhaseObserver.finishChooseAbility() end");
};

PhaseObserver.prototype.finish = function(phaseData, pilotInstance, backFunction, forwardFunction, ability, isAccepted)
{
   LOGGER.trace("PhaseObserver.finish() start");

   InputValidator.validateNotNull("phaseData", phaseData);
   InputValidator.validateNotNull("pilotInstance", pilotInstance);
   InputValidator.validateNotNull("backFunction", backFunction);
   InputValidator.validateNotNull("forwardFunction", forwardFunction);
   // ability optional.
   // isAccepted optional.

   if (ability !== undefined && isAccepted === true)
   {
      var store = this.store();

      if (ability.sourceObject().oncePerRound)
      {
         store.dispatch(CardAction.addUsedPerRoundAbility(pilotInstance, ability));
      }
      else
      {
         store.dispatch(CardAction.addUsedAbility(pilotInstance, ability));
      }

      var message = ability.sourceObject().name + " ability used.";
      LOGGER.info(message);
      store.dispatch(Action.setUserMessage(message));

      var myCallback = (ability.source() === ShipAction ? forwardFunction : backFunction);
      var consequent = ability.consequent();
      consequent(store, pilotInstance, myCallback, ability.context());
   }
   else
   {
      forwardFunction();
   }

   LOGGER.trace("PhaseObserver.finish() end");
};

PhaseObserver.prototype.finishOnChange = function(phaseData)
{
   LOGGER.trace("PhaseObserver.finishOnChange() start");

   InputValidator.validateNotNull("phaseData", phaseData);

   var store = this.store();
   store.dispatch(Action.clearPhase());

   var callback = phaseData.get("phaseCallback");

   if (callback !== undefined)
   {
      callback();
   }

   LOGGER.trace("PhaseObserver.finishOnChange() end");
};

//////////////////////////////////////////////////////////////////////////
// Utility methods.

PhaseObserver.abilityTypes = function(phaseKey)
{
   InputValidator.validateNotNull("phaseKey", phaseKey);

   var answer;

   if (phaseKey.startsWith("planning"))
   {
      answer = [DamageAbility1, PilotAbility1, UpgradeAbility1];
   }
   else if (phaseKey.startsWith("activation"))
   {
      answer = [DamageAbility2, PilotAbility2, UpgradeAbility2];
   }
   else if (phaseKey.startsWith("combat"))
   {
      answer = [DamageAbility3, PilotAbility3, UpgradeAbility3];
   }
   else if (phaseKey.startsWith("end"))
   {
      answer = [DamageAbility4, PilotAbility4, UpgradeAbility4];
   }

   return answer;
};

if (Object.freeze)
{
   Object.freeze(PhaseObserver);
}

export default PhaseObserver;