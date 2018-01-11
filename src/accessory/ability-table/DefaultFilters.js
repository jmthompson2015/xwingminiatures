"use strict";

define(["model/js/EntityFilter", "model/js/RangeFilter", "accessory/ability-table/TableColumns"],
   function(EntityFilter, RangeFilter, TableColumns)
   {
      var DefaultFilters = {
         entityColumns: [],
         rangeColumns: [],

         create: function()
         {
            var filters = {};

            this.entityColumns.forEach(function(column)
            {
               var values = [];
               var filter = new EntityFilter(column.key, values);
               filters[column.key] = filter;
            });

            this.rangeColumns.forEach(function(column)
            {
               var isMinEnabled = false;
               var minValue = 1;
               var isMaxEnabled = false;
               var maxValue = 10;

               var filter = new RangeFilter(column.key, isMinEnabled, minValue, isMaxEnabled, maxValue);
               filters[column.key] = filter;
            });

            return filters;
         },

         initialize: function()
         {
            this.entityColumns.push(TableColumns[0]); // deck
            this.entityColumns.push(TableColumns[1]); // type
            this.entityColumns.push(TableColumns[6]); // isImplemented
            this.entityColumns.push(TableColumns[7]); // event

            this.rangeColumns.push(TableColumns[3]); // count
         },
      };

      DefaultFilters.initialize();

      return DefaultFilters;
   });
