"use strict";

define(["utility/InputValidator"], function(InputValidator)
{
   var TableRow = {};

   TableRow.createTableRow = function(damage, version)
   {
      InputValidator.validateNotNull("damage", damage);
      InputValidator.validateNotNull("version", version);

      var action = (damage.hasAction !== undefined && damage.hasAction ? damage.actionDescription : undefined);
      var isImplemented = (damage.isImplemented !== undefined ? damage.isImplemented : false);

      return (
      {
         version: version,
         trait: damage.trait,
         name: damage.name,
         action: action,
         description: damage.description,
         isImplemented: isImplemented,
      });
   };

   return TableRow;
});
