"use strict";

define(["utility/InputValidator", "utility/MathUtilities"],
   function(InputValidator, MathUtilities)
   {
      var TableRow = {};

      TableRow.computeHullPlusShield = function(ship)
      {
         InputValidator.validateNotNull("ship", ship);

         var answer = (ship.hullValue !== undefined ? ship.hullValue : 0);
         answer += (ship.shieldValue !== undefined ? ship.shieldValue : 0);

         return answer;
      };

      TableRow.computeRatioPrimaryWeaponAgility = function(ship)
      {
         InputValidator.validateNotNull("ship", ship);

         var primaryWeapon = (ship.primaryWeaponValue !== undefined ? ship.primaryWeaponValue : 0);
         var agility = (ship.agilityValue !== undefined ? ship.agilityValue : 0);

         return (agility !== 0 ? MathUtilities.round(primaryWeapon / agility, 2) : "");
      };

      TableRow.computeRatioSumStatsSquadPointCost = function(pilot, ship)
      {
         InputValidator.validateNotNull("pilot", pilot);
         InputValidator.validateNotNull("ship", ship);

         var sumStats = TableRow.computeSumStats(pilot, ship);
         var squadPointCost = (pilot.squadPointCost !== undefined ? pilot.squadPointCost : 0);

         return (squadPointCost !== 0 ? MathUtilities.round(sumStats / squadPointCost, 4) : "");
      };

      TableRow.computeSumStats = function(pilot, ship)
      {
         InputValidator.validateNotNull("pilot", pilot);
         InputValidator.validateNotNull("ship", ship);

         var answer = (pilot.pilotSkillValue !== undefined ? pilot.pilotSkillValue : 0);
         answer += (ship.primaryWeaponValue !== undefined ? ship.primaryWeaponValue : 0);
         answer += (ship.energyValue !== undefined ? ship.energyValue : 0);
         answer += (ship.agilityValue !== undefined ? ship.agilityValue : 0);
         answer += (ship.hullValue !== undefined ? ship.hullValue : 0);
         answer += (ship.shieldValue !== undefined ? ship.shieldValue : 0);

         return answer;
      };

      TableRow.createTableRow = function(pilot)
      {
         InputValidator.validateNotNull("pilot", pilot);

         var ship = TableRow.determineShip(pilot);
         var isImplemented = (pilot.isImplemented !== undefined ? pilot.isImplemented : false);
         var sumStats = TableRow.computeSumStats(pilot, ship);
         var ratioPrimaryWeaponAgility = TableRow.computeRatioPrimaryWeaponAgility(ship);
         var hullPlusShield = TableRow.computeHullPlusShield(ship);
         var ratioSumStatsSquadPointCost = TableRow.computeRatioSumStatsSquadPointCost(pilot, ship);

         return (
         {
            faction: pilot.shipFaction.faction.name,
            factionKey: pilot.shipFaction.factionKey,
            pilotName: pilot.name,
            shipName: ship.name,
            shipKey: pilot.shipFaction.shipKey,
            shipWikiUrl: ship.wikiUrl,
            wave: pilot.shipFaction.wave,
            description: pilot.description,
            isFlavorText: pilot.isFlavorText,
            isImplemented: isImplemented,
            pilotSkill: pilot.pilotSkillValue,
            primaryWeapon: ship.primaryWeaponValue,
            energy: ship.energyValue,
            agility: ship.agilityValue,
            hull: ship.hullValue,
            shield: ship.shieldValue,
            squadPointCost: pilot.squadPointCost,
            sumStats: sumStats,
            ratioPrimaryWeaponAgility: ratioPrimaryWeaponAgility,
            hullPlusShield: hullPlusShield,
            ratioSumStatsSquadPointCost: ratioSumStatsSquadPointCost,
         });
      };

      TableRow.determineShip = function(pilot)
      {
         InputValidator.validateNotNull("pilot", pilot);

         var ship = pilot.shipFaction.ship;

         if (pilot.parent)
         {
            if (pilot.name.endsWith("(fore)"))
            {
               ship = ship.fore;
            }
            else if (pilot.name.endsWith("(aft)"))
            {
               ship = ship.aft;
            }
         }
         else if (ship.fore)
         {
            ship = ship.fore;
         }

         return ship;
      };

      return TableRow;
   });
