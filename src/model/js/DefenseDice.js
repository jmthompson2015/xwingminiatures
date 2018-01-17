"use strict";

define(["immutable", "common/js/InputValidator", "artifact/js/DefenseDiceValue", "model/js/Action"],
   function(Immutable, InputValidator, DefenseDiceValue, Action)
   {
      function DefenseDice(store, attackerId, sizeOrValues)
      {
         InputValidator.validateNotNull("store", store);
         InputValidator.validateIsNumber("attackerId", attackerId);

         this.store = function()
         {
            return store;
         };

         this.attackerId = function()
         {
            return attackerId;
         };

         if (typeof sizeOrValues === "number")
         {
            var size = sizeOrValues;
            var newValues = [];

            for (var i = 0; i < size; i++)
            {
               newValues.push(DefenseDice.rollRandomValue());
            }

            this.save(newValues);
         }
         else if (Array.isArray(sizeOrValues))
         {
            this.save(sizeOrValues);
         }
      }

      //////////////////////////////////////////////////////////////////////////
      // Accessor methods.

      DefenseDice.prototype.blankCount = function()
      {
         return this.valueCount(DefenseDiceValue.BLANK);
      };

      DefenseDice.prototype.evadeCount = function()
      {
         return this.valueCount(DefenseDiceValue.EVADE);
      };

      DefenseDice.prototype.focusCount = function()
      {
         return this.valueCount(DefenseDiceValue.FOCUS);
      };

      DefenseDice.prototype.size = function()
      {
         return this.values().size;
      };

      DefenseDice.prototype.sortedValues = function()
      {
         return this.values().sort(function(die0, die1)
         {
            var value0 = DefenseDiceValue.properties[die0].sortOrder;
            var value1 = DefenseDiceValue.properties[die1].sortOrder;

            return value0 - value1;
         });
      };

      DefenseDice.prototype.toString = function()
      {
         var values = this.values();

         return "attackerId=" + this.attackerId() + ", size=" + (values ? values.size : undefined) + ", values=" + values;
      };

      DefenseDice.prototype.value = function(index)
      {
         InputValidator.validateIsNumber("index", index);

         var values = this.values();

         return values.get(index);
      };

      DefenseDice.prototype.valueCount = function(target)
      {
         InputValidator.validateNotNull("target", target);

         return this.values().reduce(function(accumulator, currentValue)
         {
            return accumulator + (currentValue === target ? 1 : 0);
         }, 0);
      };

      DefenseDice.prototype.values = function()
      {
         var store = this.store();
         var attackerId = this.attackerId();

         var answer = store.getState().cardDefenseDice.get(attackerId);

         return (answer !== undefined ? answer : Immutable.List());
      };

      //////////////////////////////////////////////////////////////////////////
      // Mutator methods.

      DefenseDice.prototype.addDie = function(value)
      {
         // value optional.

         var myValue = (value !== undefined ? value : DefenseDice.rollRandomValue());
         var newValues = this.values().push(myValue);
         this.save(newValues);
      };

      DefenseDice.prototype.changeAllToValue = function(oldValue, newValue)
      {
         var oldValues = this.values();
         var newValues = oldValues;

         for (var i = 0; i < oldValues.size; i++)
         {
            if (oldValues.get(i) === oldValue)
            {
               newValues = newValues.set(i, newValue);
            }
         }

         this.save(newValues);
      };

      DefenseDice.prototype.changeOneToValue = function(oldValue, newValue)
      {
         var oldValues = this.values();
         var newValues = oldValues;

         for (var i = 0; i < oldValues.size; i++)
         {
            if (oldValues.get(i) === oldValue)
            {
               newValues = newValues.set(i, newValue);
               break;
            }
         }

         this.save(newValues);
      };

      DefenseDice.prototype.rerollAllFocus = function()
      {
         var oldValues = this.values();
         var newValues = [];

         // Reroll all focus values.
         for (var i = 0; i < oldValues.size; i++)
         {
            var oldValue = oldValues.get(i);

            if (oldValue === DefenseDiceValue.FOCUS)
            {
               newValues.push(DefenseDice.rollRandomValue());
            }
            else
            {
               newValues.push(oldValue);
            }
         }

         this.save(newValues);
      };

      DefenseDice.prototype.rerollBlank = function(count)
      {
         this.rerollType(DefenseDiceValue.BLANK, count);
      };

      DefenseDice.prototype.rerollBlankAndFocus = function(count)
      {
         // count optional; default: 1

         var blankCount = this.blankCount();

         if (blankCount >= count)
         {
            this.rerollBlank(count);
         }
         else
         {
            // 0 <= blankCount < count
            if (blankCount > 0)
            {
               this.rerollBlank(count);
            }

            var myCount = count - blankCount;

            if (myCount > 0)
            {
               this.rerollFocus(myCount);
            }
         }
      };

      DefenseDice.prototype.rerollFocus = function(count)
      {
         this.rerollType(DefenseDiceValue.FOCUS, count);
      };

      DefenseDice.prototype.rerollType = function(type, count)
      {
         InputValidator.validateNotNull("type", type);
         // count optional; default: 1

         // Reroll type values.
         var myCount = (count === undefined ? 1 : count);

         var oldValues = this.values();
         var newValues = oldValues;

         for (var i = 0; i < oldValues.size; i++)
         {
            var oldValue = oldValues.get(i);

            if (oldValue === type)
            {
               newValues[i] = DefenseDice.rollRandomValue();
               myCount--;

               if (myCount === 0)
               {
                  break;
               }
            }
         }

         this.save(newValues);
      };

      DefenseDice.prototype.save = function(newValues)
      {
         var store = this.store();
         var attackerId = this.attackerId();
         var values = (Array.isArray(newValues) ? Immutable.List(newValues) : newValues);
         store.dispatch(Action.setTokenDefenseDice(attackerId, values));
      };

      DefenseDice.prototype.spendEvadeToken = function()
      {
         var oldValues = this.values();
         var newValues = oldValues;

         // Add an evade result.
         newValues = newValues.push(DefenseDiceValue.EVADE);
         this.save(newValues);
      };

      DefenseDice.prototype.spendFocusToken = function()
      {
         // Change all focus results to evades.
         this.changeAllToValue(DefenseDiceValue.FOCUS, DefenseDiceValue.EVADE);
      };

      //////////////////////////////////////////////////////////////////////////
      // Utility methods.

      DefenseDice.get = function(store, attackerId)
      {
         InputValidator.validateNotNull("store", store);
         InputValidator.validateIsNumber("attackerId", attackerId);

         return new DefenseDice(store, attackerId);
      };

      DefenseDice.rollRandomValue = function()
      {
         var min = 1;
         var max = 8;
         var roll = Math.floor(Math.random() * (max - min + 1)) + min;
         var value;

         // There are 2 focus, 3 evade, and 3 blank.
         switch (roll)
         {
            case 1:
            case 4:
               value = DefenseDiceValue.FOCUS;
               break;
            case 2:
            case 5:
            case 7:
               value = DefenseDiceValue.EVADE;
               break;
            case 3:
            case 6:
            case 8:
               value = DefenseDiceValue.BLANK;
               break;
            default:
               throw "Unsupported roll: " + roll;
         }

         return value;
      };

      return DefenseDice;
   });
