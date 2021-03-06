import InputValidator from "../utility/InputValidator.js";

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
   const tokens = this.tokens();

   const answer = tokens.reduce(function(accumulator, token)
   {
      let myAnswer = accumulator;

      if (token.isParent())
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
   const tokens = this.tokens();

   const answer = tokens.reduce(function(accumulator, token)
   {
      let primaryWeaponValue;

      if (token.isParent())
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
   const tokens = this.tokens();
   let value;

   const answer = tokens.reduce(function(accumulator, token)
   {
      let myAnswer = accumulator;

      if (token.isParent())
      {
         value = token.tokenFore().energyValue();
         myAnswer += (value !== undefined ? value : 0);
         value = token.tokenAft().energyValue();
         myAnswer += (value !== undefined ? value : 0);
      }
      else
      {
         value = token.energyValue();
         myAnswer += (value !== undefined ? value : 0);
      }

      return myAnswer;
   }, 0);

   return answer;
};

Squad.prototype.agilityValue = function()
{
   const tokens = this.tokens();
   let value;

   const answer = tokens.reduce(function(accumulator, token)
   {
      let myAnswer = accumulator;

      if (token.isParent())
      {
         value = token.tokenFore().agilityValue();
         myAnswer += (value !== undefined ? value : 0);
         value = token.tokenAft().agilityValue();
         myAnswer += (value !== undefined ? value : 0);
      }
      else
      {
         value = token.agilityValue();
         myAnswer += (value !== undefined ? value : 0);
      }

      return myAnswer;
   }, 0);

   return answer;
};

Squad.prototype.hullValue = function()
{
   const tokens = this.tokens();
   let value;

   const answer = tokens.reduce(function(accumulator, token)
   {
      let myAnswer = accumulator;

      if (token.isParent())
      {
         value = token.tokenFore().hullValue();
         myAnswer += (value !== undefined ? value : 0);
         value = token.tokenAft().hullValue();
         myAnswer += (value !== undefined ? value : 0);
      }
      else
      {
         value = token.hullValue();
         myAnswer += (value !== undefined ? value : 0);
      }

      return myAnswer;
   }, 0);

   return answer;
};

Squad.prototype.shieldValue = function()
{
   const tokens = this.tokens();
   let value;

   const answer = tokens.reduce(function(accumulator, token)
   {
      let myAnswer = accumulator;

      if (token.isParent())
      {
         value = token.tokenFore().shieldValue();
         myAnswer += (value !== undefined ? value : 0);
         value = token.tokenAft().shieldValue();
         myAnswer += (value !== undefined ? value : 0);
      }
      else
      {
         value = token.shieldValue();
         myAnswer += (value !== undefined ? value : 0);
      }

      return myAnswer;
   }, 0);

   return answer;
};

Squad.prototype.squadPointCost = function()
{
   const tokens = this.tokens();

   const answer = tokens.reduce(function(accumulator, token)
   {
      let myAnswer = accumulator;

      if (token.isParent())
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
   const title = this.factionKey() + " " + this.name() + " " + this.year() + " " + this.description();

   return this.tokens().reduce(function(accumulator, token, i)
   {
      return accumulator + "\n" + i + " " + token.toString() + " " + token.upgradeKeys();
   }, title);
};

Squad.prototype.upgradeCount = function()
{
   const tokens = this.tokens();

   const answer = tokens.reduce(function(accumulator, token)
   {
      let myAnswer = accumulator;

      if (token.isParent())
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

export default Squad;