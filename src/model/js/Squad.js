"use strict";

define(["common/js/InputValidator"], function(InputValidator)
{
   function Squad(factionKey, name, year, description, tokens)
   {
      InputValidator.validateNotNull("factionKey", factionKey);
      InputValidator.validateNotNull("name", name);
      InputValidator.validateIsNumber("year", year);
      InputValidator.validateNotNull("description", description);
      InputValidator.validateIsArray("tokens", tokens);

      this.factionKey = function()
      {
         return factionKey;
      };

      this.name = function()
      {
         return name;
      };

      this.year = function()
      {
         return year;
      };

      this.description = function()
      {
         return description;
      };

      this.tokens = function()
      {
         return tokens;
      };
   }

   Squad.prototype.pilotSkillValue = function()
   {
      var tokens = this.tokens();

      var answer = tokens.reduce(function(accumulator, token)
      {
         var myAnswer = accumulator;

         if (token.tokenFore !== undefined && token.tokenAft !== undefined)
         {
            myAnswer += token.tokenFore().pilotSkillValue();
            myAnswer += token.tokenAft().pilotSkillValue();
         }
         else
         {
            myAnswer += token.pilotSkillValue();
         }

         return myAnswer;
      }, 0);

      return answer;
   };

   Squad.prototype.primaryWeaponValue = function()
   {
      var tokens = this.tokens();

      var answer = tokens.reduce(function(accumulator, token)
      {
         var primaryWeaponValue;

         if (token.tokenFore !== undefined && token.tokenAft !== undefined)
         {
            primaryWeaponValue = token.tokenFore().primaryWeaponValue();
            accumulator += (isNaN(primaryWeaponValue) ? 0 : primaryWeaponValue);
            primaryWeaponValue = token.tokenAft().primaryWeaponValue();
            accumulator += (isNaN(primaryWeaponValue) ? 0 : primaryWeaponValue);
         }
         else
         {
            primaryWeaponValue = token.primaryWeaponValue();
            accumulator += (isNaN(primaryWeaponValue) ? 0 : primaryWeaponValue);
         }

         return accumulator;
      }, 0);

      return answer;
   };

   Squad.prototype.energyValue = function()
   {
      var tokens = this.tokens();
      var value;

      var answer = tokens.reduce(function(accumulator, token)
      {
         var myAnswer = accumulator;

         value = token.energyValue();
         myAnswer += (value !== undefined ? value : 0);

         return myAnswer;
      }, 0);

      return answer;
   };

   Squad.prototype.agilityValue = function()
   {
      var tokens = this.tokens();

      var answer = tokens.reduce(function(accumulator, token)
      {
         var myAnswer = accumulator;

         if (token.tokenFore !== undefined && token.tokenAft !== undefined)
         {
            myAnswer += token.tokenFore().agilityValue();
            myAnswer += token.tokenAft().agilityValue();
         }
         else
         {
            myAnswer += token.agilityValue();
         }

         return myAnswer;
      }, 0);

      return answer;
   };

   Squad.prototype.hullValue = function()
   {
      var tokens = this.tokens();

      var answer = tokens.reduce(function(accumulator, token)
      {
         var myAnswer = accumulator;

         if (token.tokenFore !== undefined && token.tokenAft !== undefined)
         {
            myAnswer += token.tokenFore().hullValue();
            myAnswer += token.tokenAft().hullValue();
         }
         else
         {
            myAnswer += token.hullValue();
         }

         return myAnswer;
      }, 0);

      return answer;
   };

   Squad.prototype.shieldValue = function()
   {
      var tokens = this.tokens();

      var answer = tokens.reduce(function(accumulator, token)
      {
         var myAnswer = accumulator;

         if (token.tokenFore !== undefined && token.tokenAft !== undefined)
         {
            myAnswer += token.tokenFore().shieldValue();
            myAnswer += token.tokenAft().shieldValue();
         }
         else
         {
            myAnswer += token.shieldValue();
         }

         return myAnswer;
      }, 0);

      return answer;
   };

   Squad.prototype.squadPointCost = function()
   {
      var tokens = this.tokens();

      var answer = tokens.reduce(function(accumulator, token)
      {
         var myAnswer = accumulator;

         if (token.tokenFore !== undefined && token.tokenAft !== undefined)
         {
            myAnswer += token.tokenFore().squadPointCost();
            myAnswer += token.tokenAft().squadPointCost();
         }
         else
         {
            myAnswer += token.squadPointCost();
         }

         return myAnswer;
      }, 0);

      return answer;
   };

   Squad.prototype.toString = function()
   {
      var title = this.factionKey() + " " + this.name() + " " + this.year() + " " + this.description();

      return this.tokens().reduce(function(accumulator, token, i)
      {
         return accumulator + "\n" + i + " " + token.toString() + " " + token.upgradeKeys();
      }, title);
   };

   Squad.prototype.upgradeCount = function()
   {
      var tokens = this.tokens();

      var answer = tokens.reduce(function(accumulator, token)
      {
         var myAnswer = accumulator;

         if (token.tokenFore !== undefined && token.tokenAft !== undefined)
         {
            myAnswer += token.tokenFore().upgradeKeys().size;
            myAnswer += token.tokenAft().upgradeKeys().size;
         }
         else
         {
            myAnswer += token.upgradeKeys().size;
         }

         return myAnswer;
      }, 0);

      return answer;
   };

   return Squad;
});
