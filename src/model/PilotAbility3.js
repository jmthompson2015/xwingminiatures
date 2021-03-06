/*
 * Provides pilot abilities for the Combat Phase.
 */
import InputValidator from "../utility/InputValidator.js";

import AttackDiceValue from "../artifact/AttackDiceValue.js";
import DefenseDiceValue from "../artifact/DefenseDiceValue.js";
import Phase from "../artifact/Phase.js";
import PilotCard from "../artifact/PilotCard.js";
import Range from "../artifact/Range.js";
import ShipAction from "../artifact/ShipAction.js";

import CardAction from "./CardAction.js";
import Selector from "./Selector.js";
import TargetLock from "./TargetLock.js";

const PilotAbility3 = {};

////////////////////////////////////////////////////////////////////////
PilotAbility3[Phase.COMBAT_START] = {};

PilotAbility3[Phase.COMBAT_START][PilotCard.COMMANDER_ALOZEN] = {
   // At the start of the Combat phase, you may acquire a target lock on an enemy ship at Range 1.
   condition: function(store, token)
   {
      const environment = store.getState().environment;
      const enemies = environment.getUnfriendlyTokensAtRange(token, Range.ONE);
      return enemies.length > 0;
   },
   consequent: function(store, token, callback)
   {
      const agent = token.agent();
      const shipActions0 = [ShipAction.TARGET_LOCK];
      const that = this;
      const finishCallback = function(shipActionAbility)
      {
         that.finishConsequent(store, token, shipActionAbility, callback);
      };
      agent.getShipAction(token, finishCallback, shipActions0);

      // Wait for agent to respond.
   },
   finishConsequent: function(store, token, shipActionAbility, callback)
   {
      if (shipActionAbility)
      {
         const consequent = shipActionAbility.consequent();
         consequent(store, token, callback, shipActionAbility.context());
      }
      else
      {
         callback();
      }
   },
};

PilotAbility3[Phase.COMBAT_START][PilotCard.EPSILON_LEADER] = {
   // At the start of the Combat phase, remove 1 stress token from each friendly ship at Range 1.
   condition: function()
   {
      return true;
   },
   consequent: function(store, token, callback)
   {
      const environment = getEnvironment(store);
      const friends = environment.getFriendlyTokensAtRange(token, Range.ONE);
      friends.forEach(function(friend)
      {
         friend.removeStress();
      });
      token.removeStress(callback);
   },
};

PilotAbility3[Phase.COMBAT_START][PilotCard.GURI] = {
   // At the start of the Combat phase, if you are at Range 1 of an enemy ship, you may assign 1 focus token to your ship.
   condition: function(store, token)
   {
      const environment = store.getState().environment;
      const enemies = environment.getUnfriendlyTokensAtRange(token, Range.ONE);
      return enemies.length > 0;
   },
   consequent: function(store, token, callback)
   {
      token.receiveFocus(1, callback);
   },
};

////////////////////////////////////////////////////////////////////////
PilotAbility3[Phase.COMBAT_DECLARE_TARGET] = {};

PilotAbility3[Phase.COMBAT_DECLARE_TARGET][PilotCard.TARN_MISON] = {
   // When an enemy ship declares you as the target of an attack, you may acquire a target lock on that ship.
   condition: function(store, token)
   {
      const attacker = getActiveCardInstance(store);
      const defender = getDefender(attacker);
      return token.equals(defender);
   },
   consequent: function(store, token, callback)
   {
      const attacker = getActiveCardInstance(store);
      TargetLock.newInstance(store, token, attacker, callback);
   },
};

////////////////////////////////////////////////////////////////////////
PilotAbility3[Phase.COMBAT_ROLL_ATTACK_DICE] = {};

PilotAbility3[Phase.COMBAT_ROLL_ATTACK_DICE][PilotCard.COLONEL_VESSERY] = {
   // When attacking, immediately after you roll attack dice, you may acquire a target lock on the defender if it already has a red target lock token.
   condition: function(store, token)
   {
      const defender = getDefender(token);
      const targetLocks = (defender !== undefined ? TargetLock.getByDefender(store, defender) : []);
      return isActiveCardInstance(store, token) && targetLocks.length > 0;
   },
   consequent: function(store, token, callback)
   {
      const defender = getDefender(token);
      TargetLock.newInstance(store, token, defender, callback);
   },
};

////////////////////////////////////////////////////////////////////////
PilotAbility3[Phase.COMBAT_MODIFY_ATTACK_DICE] = {};

PilotAbility3[Phase.COMBAT_MODIFY_ATTACK_DICE][PilotCard.BOBA_FETT_SCUM] = {
   // When attacking or defending, you may reroll 1 of your dice for each enemy ship at Range 1.
   condition: function(store, token)
   {
      const attackDice = getAttackDice(token);
      const environment = store.getState().environment;
      const shipCount = environment.getUnfriendlyTokensAtRange(token, Range.ONE).length;
      return isActiveCardInstance(store, token) && shipCount > 0 && (attackDice.blankCount() > 0 || attackDice.focusCount() > 0);
   },
   consequent: function(store, token, callback)
   {
      const attackDice = getAttackDice(token);
      const environment = getEnvironment(store);
      const shipCount = environment.getUnfriendlyTokensAtRange(token, Range.ONE).length;
      attackDice.rerollBlankAndFocus(shipCount);
      callback();
   },
};

PilotAbility3[Phase.COMBAT_MODIFY_ATTACK_DICE][PilotCard.HORTON_SALM] = {
   // When attacking at Range 2-3, you may reroll any of your blank results.
   condition: function(store, token)
   {
      const rangeKey = getRangeKey(token);
      const attackDice = getAttackDice(token);
      return isActiveCardInstance(store, token) && [Range.TWO, Range.THREE].includes(rangeKey) && attackDice.blankCount() > 0;
   },
   consequent: function(store, token, callback)
   {
      const attackDice = getAttackDice(token);
      attackDice.rerollAllBlank();
      callback();
   },
};

PilotAbility3[Phase.COMBAT_MODIFY_ATTACK_DICE][PilotCard.IBTISAM] = {
   // When attacking or defending, if you have at least 1 stress token, you may reroll 1 of your dice.
   condition: function(store, token)
   {
      const attackDice = getAttackDice(token);
      return isActiveCardInstance(store, token) && token.isStressed() && (attackDice.blankCount() > 0 || attackDice.focusCount() > 0);
   },
   consequent: function(store, token, callback)
   {
      const attackDice = getAttackDice(token);
      if (attackDice.blankCount() > 0)
      {
         attackDice.rerollBlank();
      }
      else if (attackDice.focusCount() > 0)
      {
         attackDice.rerollFocus();
      }
      callback();
   },
};

PilotAbility3[Phase.COMBAT_MODIFY_ATTACK_DICE][PilotCard.KEYAN_FARLANDER] = {
   // When attacking, you may remove 1 stress token to change all of your Focus results to Hit results.
   condition: function(store, token)
   {
      const attackDice = getAttackDice(token);
      return isActiveCardInstance(store, token) && token.isStressed() && attackDice.focusCount() > 0;
   },
   consequent: function(store, token, callback)
   {
      token.removeStress();
      const attackDice = getAttackDice(token);
      attackDice.changeAllToValue(AttackDiceValue.FOCUS, AttackDiceValue.HIT);
      callback();
   },
};

PilotAbility3[Phase.COMBAT_MODIFY_ATTACK_DICE][PilotCard.KIR_KANOS] = {
   // When attacking at Range 2-3, you may spend 1 evade token to add 1 Hit result to your roll.
   condition: function(store, token)
   {
      const rangeKey = getRangeKey(token);
      const attackDice = getAttackDice(token);
      return isActiveCardInstance(store, token) && [Range.TWO, Range.THREE].includes(rangeKey) && attackDice.evadeCount() > 0;
   },
   consequent: function(store, token, callback)
   {
      store.dispatch(CardAction.addEvadeCount(token, -1));
      const attackDice = getAttackDice(token);
      attackDice.addDie(AttackDiceValue.HIT);
      callback();
   },
};

PilotAbility3[Phase.COMBAT_MODIFY_ATTACK_DICE][PilotCard.KRASSIS_TRELIX] = {
   // When attacking with a secondary weapon, you may reroll 1 attack die.
   condition: function(store, token)
   {
      const weapon = getWeapon(token);
      const attackDice = getAttackDice(token);
      return isActiveCardInstance(store, token) && !weapon.isPrimary() && (attackDice.blankCount() > 0 || attackDice.focusCount() > 0);
   },
   consequent: function(store, token, callback)
   {
      const attackDice = getAttackDice(token);
      if (attackDice.blankCount() > 0)
      {
         attackDice.rerollBlank();
      }
      else if (attackDice.focusCount() > 0)
      {
         attackDice.rerollFocus();
      }
      callback();
   },
};

PilotAbility3[Phase.COMBAT_MODIFY_ATTACK_DICE][PilotCard.OMEGA_ACE] = {
   // When attacking, you may spend a focus token and a target lock you have on the defender to change all of your results to Critical Hit results.
   condition: function(store, token)
   {
      const defender = getDefender(token);
      const targetLocks = TargetLock.getByDefender(store, defender);
      const attackDice = getAttackDice(token);
      return isActiveCardInstance(store, token) && token.focusCount() > 0 && targetLocks.length > 0 && (attackDice.blankCount() > 0 || attackDice.focusCount() > 0 || attackDice.hitCount() > 0);
   },
   consequent: function(store, token, callback)
   {
      const defender = getDefender(token);
      spendFocusToken(store, token);
      spendTargetLock(store, token, defender);
      const attackDice = getAttackDice(token);
      attackDice.changeAllToValue(AttackDiceValue.BLANK, AttackDiceValue.CRITICAL_HIT);
      attackDice.changeAllToValue(AttackDiceValue.FOCUS, AttackDiceValue.CRITICAL_HIT);
      attackDice.changeAllToValue(AttackDiceValue.HIT, AttackDiceValue.CRITICAL_HIT);
      callback();
   },
};

PilotAbility3[Phase.COMBAT_MODIFY_ATTACK_DICE][PilotCard.POE_DAMERON] = {
   // While attacking or defending, if you have a Focus token, you may change 1 of your Focus results to a Hit or Evade result.
   condition: function(store, token)
   {
      const attackDice = getAttackDice(token);
      return isActiveCardInstance(store, token) && token.focusCount() > 0 && attackDice.focusCount() > 0;
   },
   consequent: function(store, token, callback)
   {
      const attackDice = getAttackDice(token);
      attackDice.changeOneToValue(AttackDiceValue.FOCUS, AttackDiceValue.HIT);
      callback();
   },
};

PilotAbility3[Phase.COMBAT_MODIFY_ATTACK_DICE][PilotCard.REAR_ADMIRAL_CHIRANEAU] = {
   // When attacking at Range 1-2, you may change 1 of your Focus results to a Critical Hit result.
   condition: function(store, token)
   {
      const rangeKey = getRangeKey(token);
      const attackDice = getAttackDice(token);
      return isActiveCardInstance(store, token) && [Range.ONE, Range.TWO].includes(rangeKey) && attackDice.focusCount() > 0;
   },
   consequent: function(store, token, callback)
   {
      const attackDice = getAttackDice(token);
      attackDice.changeOneToValue(AttackDiceValue.FOCUS, AttackDiceValue.CRITICAL_HIT);
      callback();
   },
};

PilotAbility3[Phase.COMBAT_MODIFY_ATTACK_DICE][PilotCard.WINGED_GUNDARK] = {
   // When attacking at Range 1, you may change 1 of your Hit results to a Critical Hit result.
   condition: function(store, token)
   {
      const rangeKey = getRangeKey(token);
      const attackDice = getAttackDice(token);
      return isActiveCardInstance(store, token) && rangeKey === Range.ONE && attackDice.hitCount() > 0;
   },
   consequent: function(store, token, callback)
   {
      const attackDice = getAttackDice(token);
      attackDice.changeOneToValue(AttackDiceValue.HIT, AttackDiceValue.CRITICAL_HIT);
      callback();
   },
};

////////////////////////////////////////////////////////////////////////
PilotAbility3[Phase.COMBAT_MODIFY_DEFENSE_DICE] = {};

PilotAbility3[Phase.COMBAT_MODIFY_DEFENSE_DICE][PilotCard.BOBA_FETT_SCUM] = {
   // When attacking or defending, you may reroll 1 of your dice for each enemy ship at Range 1.
   condition: function(store, token)
   {
      const attacker = getActiveCardInstance(store);
      const defender = getDefender(attacker);
      const defenseDice = getDefenseDice(attacker);
      const environment = store.getState().environment;
      const shipCount = environment.getUnfriendlyTokensAtRange(token, Range.ONE).length;
      return token.equals(defender) && shipCount > 0 && (defenseDice.blankCount() > 0 || defenseDice.focusCount() > 0);
   },
   consequent: function(store, token, callback)
   {
      const attacker = getActiveCardInstance(store);
      const defenseDice = getDefenseDice(attacker);
      const environment = store.getState().environment;
      const shipCount = environment.getUnfriendlyTokensAtRange(token, Range.ONE).length;
      defenseDice.rerollBlankAndFocus(shipCount);
      callback();
   },
};

PilotAbility3[Phase.COMBAT_MODIFY_DEFENSE_DICE][PilotCard.EZRA_BRIDGER] = {
   // When defending, if you are stressed, you may change up to 2 of your focus results to evade results.
   condition: function(store, token)
   {
      const attacker = getActiveCardInstance(store);
      const defender = getDefender(attacker);
      const defenseDice = getDefenseDice(attacker);
      return token.equals(defender) && token.isStressed() && defenseDice.focusCount() > 0;
   },
   consequent: function(store, token, callback)
   {
      const attacker = getActiveCardInstance(store);
      const defenseDice = getDefenseDice(attacker);
      defenseDice.changeOneToValue(DefenseDiceValue.FOCUS, DefenseDiceValue.EVADE);
      defenseDice.changeOneToValue(DefenseDiceValue.FOCUS, DefenseDiceValue.EVADE);
      callback();
   },
};

PilotAbility3[Phase.COMBAT_MODIFY_DEFENSE_DICE][PilotCard.IBTISAM] = {
   // When attacking or defending, if you have at least 1 stress token, you may reroll 1 of your dice.
   condition: function(store, token)
   {
      const attacker = getActiveCardInstance(store);
      const defender = getDefender(attacker);
      const defenseDice = getDefenseDice(attacker);
      return token.equals(defender) && token.isStressed() && (defenseDice.blankCount() > 0 || defenseDice.focusCount() > 0);
   },
   consequent: function(store, token, callback)
   {
      const attacker = getActiveCardInstance(store);
      const defenseDice = getDefenseDice(attacker);
      if (defenseDice.blankCount() > 0)
      {
         defenseDice.rerollBlank();
      }
      else if (defenseDice.focusCount() > 0)
      {
         defenseDice.rerollFocus();
      }
      callback();
   },
};

PilotAbility3[Phase.COMBAT_MODIFY_DEFENSE_DICE][PilotCard.LUKE_SKYWALKER] = {
   // When defending, you may change 1 of your Focus results to an Evade result.
   condition: function(store, token)
   {
      const attacker = getActiveCardInstance(store);
      const defender = getDefender(attacker);
      const defenseDice = getDefenseDice(attacker);
      return token.equals(defender) && defenseDice.focusCount() > 0;
   },
   consequent: function(store, token, callback)
   {
      const attacker = getActiveCardInstance(store);
      const defenseDice = getDefenseDice(attacker);
      defenseDice.changeOneToValue(DefenseDiceValue.FOCUS, DefenseDiceValue.EVADE);
      callback();
   },
};

PilotAbility3[Phase.COMBAT_MODIFY_DEFENSE_DICE][PilotCard.POE_DAMERON] = {
   // While attacking or defending, if you have a Focus token, you may change 1 of your Focus results to a Hit or Evade result.
   condition: function(store, token)
   {
      const attacker = getActiveCardInstance(store);
      const defender = getDefender(attacker);
      const defenseDice = getDefenseDice(attacker);
      return token.equals(defender) && token.focusCount() > 0 && defenseDice.focusCount() > 0;
   },
   consequent: function(store, token, callback)
   {
      const attacker = getActiveCardInstance(store);
      const defenseDice = getDefenseDice(attacker);
      defenseDice.changeOneToValue(DefenseDiceValue.FOCUS, DefenseDiceValue.EVADE);
      callback();
   },
};

////////////////////////////////////////////////////////////////////////
PilotAbility3[Phase.COMBAT_DEAL_DAMAGE] = {};

PilotAbility3[Phase.COMBAT_DEAL_DAMAGE][PilotCard.WHISPER] = {
   // After you perform an attack that hits, you may assign 1 focus token to your ship.
   condition: function(store, token)
   {
      const attacker = getActiveCardInstance(store);
      return isActiveCardInstance(store, token) && isDefenderHit(attacker);
   },
   consequent: function(store, token, callback)
   {
      token.receiveFocus(1, callback);
   },
};

////////////////////////////////////////////////////////////////////////
PilotAbility3[Phase.COMBAT_AFTER_DEAL_DAMAGE] = {};

PilotAbility3[Phase.COMBAT_AFTER_DEAL_DAMAGE][PilotCard.IG_88A] = {
   // After you perform an attack that destroys the defender, you may recover 1 shield.
   condition: function(store, token)
   {
      const defender = getDefender(token);
      return isActiveCardInstance(store, token) && defender.isDestroyed();
   },
   consequent: function(store, token, callback)
   {
      token.recoverShield();
      callback();
   },
};

PilotAbility3[Phase.COMBAT_AFTER_DEAL_DAMAGE][PilotCard.LAETIN_ASHERA] = {
   // After you defend against an attack, if the attack did not hit, you may assign 1 evade token to your ship.
   condition: function(store, token)
   {
      const attacker = getActiveCardInstance(store);
      const defender = getDefender(attacker);
      return token.equals(defender) && !isDefenderHit(attacker);
   },
   consequent: function(store, token, callback)
   {
      store.dispatch(CardAction.addEvadeCount(token));
      callback();
   },
};

PilotAbility3[Phase.COMBAT_AFTER_DEAL_DAMAGE][PilotCard.TURR_PHENNIR] = {
   // After you perform an attack, you may perform a free boost or barrel roll action.
   condition: function(store, token)
   {
      const combatAction = getCombatAction(token);
      return isActiveCardInstance(store, token) && combatAction !== undefined;
   },
   consequent: function(store, token, callback)
   {
      const agent = token.agent();
      const shipActions0 = [ShipAction.BARREL_ROLL, ShipAction.BOOST];
      const that = this;
      const finishCallback = function(shipActionAbility)
      {
         that.finishConsequent(store, token, shipActionAbility, callback);
      };
      agent.getShipAction(token, finishCallback, shipActions0);

      // Wait for agent to respond.
   },
   finishConsequent: function(store, token, shipActionAbility, callback)
   {
      if (shipActionAbility)
      {
         const consequent = shipActionAbility.consequent();
         consequent(store, token, callback, shipActionAbility.context());
      }
      else
      {
         callback();
      }
   },
};

PilotAbility3[Phase.COMBAT_AFTER_DEAL_DAMAGE][PilotCard.VALEN_RUDOR] = {
   // After defending, you may perform a free action.
   condition: function(store, token)
   {
      const defender = getDefender(token);
      return token.equals(defender);
   },
   consequent: function(store, token, callback)
   {
      const agent = token.agent();
      const that = this;
      const finishCallback = function(shipActionAbility)
      {
         that.finishConsequent(store, token, shipActionAbility, callback);
      };
      agent.getShipAction(token, finishCallback);

      // Wait for agent to respond.
   },
   finishConsequent: function(store, token, shipActionAbility, callback)
   {
      if (shipActionAbility)
      {
         const consequent = shipActionAbility.consequent();
         consequent(store, token, callback, shipActionAbility.context());
      }
      else
      {
         callback();
      }
   },
};

////////////////////////////////////////////////////////////////////////
function getActiveCardInstance(store)
{
   InputValidator.validateNotNull("store", store);

   const environment = store.getState().environment;

   return environment.activeCardInstance();
}

function getAttackDice(attacker)
{
   InputValidator.validateNotNull("attacker", attacker);

   const store = attacker.store();
   const combatAction = getCombatAction(attacker);
   const attackDiceClass = combatAction.attackDiceClass();

   return attackDiceClass.get(store, attacker.id());
}

function getCombatAction(attacker)
{
   InputValidator.validateNotNull("attacker", attacker);

   const store = attacker.store();

   return Selector.combatAction(store.getState(), attacker);
}

function getDefender(attacker)
{
   InputValidator.validateNotNull("attacker", attacker);

   const combatAction = getCombatAction(attacker);

   return (combatAction !== undefined ? combatAction.defender() : undefined);
}

function getDefenseDice(attacker)
{
   InputValidator.validateNotNull("attacker", attacker);

   const store = attacker.store();
   const combatAction = getCombatAction(attacker);
   const defenseDiceClass = combatAction.defenseDiceClass();

   return defenseDiceClass.get(store, attacker.id());
}

function getEnvironment(store)
{
   InputValidator.validateNotNull("store", store);

   return Selector.environment(store.getState());
}

function getRangeKey(attacker)
{
   InputValidator.validateNotNull("attacker", attacker);

   const store = attacker.store();

   return Selector.rangeKey(store.getState(), attacker);
}

function getWeapon(attacker)
{
   InputValidator.validateNotNull("attacker", attacker);

   return getCombatAction(attacker).weapon();
}

function isActiveCardInstance(store, token)
{
   const activeToken = getActiveCardInstance(store);

   return token.equals(activeToken);
}

function isDefenderHit(attacker)
{
   InputValidator.validateNotNull("attacker", attacker);

   const store = attacker.store();

   return Selector.isDefenderHit(store.getState(), attacker);
}

function spendFocusToken(store, attacker)
{
   InputValidator.validateNotNull("store", store);
   InputValidator.validateNotNull("attacker", attacker);

   attacker.removeFocus();
}

function spendTargetLock(store, attacker, defender)
{
   InputValidator.validateNotNull("store", store);
   InputValidator.validateNotNull("attacker", attacker);
   InputValidator.validateNotNull("defender", defender);

   const targetLock = TargetLock.getFirst(store, attacker, defender);
   targetLock.delete();
}

PilotAbility3.toString = function()
{
   return "model/PilotAbility3";
};

if (Object.freeze)
{
   Object.freeze(PilotAbility3);
}

export default PilotAbility3;