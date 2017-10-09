"use strict";

define(["common/js/InputValidator"], function(InputValidator)
{
   var TableRow = {};

   TableRow.createTableRow = function(squadBuilder, winCountIn, loseCountIn, tieCountIn)
   {
      InputValidator.validateNotNull("squadBuilder", squadBuilder);
      // winCountIn optional.
      // loseCountIn optional.
      // tieCountIn optional.

      var winCount = (winCountIn !== undefined ? winCountIn : 0);
      var loseCount = (loseCountIn !== undefined ? loseCountIn : 0);
      var tieCount = (tieCountIn !== undefined ? tieCountIn : 0);

      return (
      {
         factionKey: squadBuilder.factionKey(),
         squadBuilder: squadBuilder,
         winCount: winCount,
         loseCount: loseCount,
         tieCount: tieCount,
      });
   };

   return TableRow;
});
