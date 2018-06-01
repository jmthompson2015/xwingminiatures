import ArrayUtilities from "../../utility/ArrayUtilities.js";

import Faction from "../../artifact/Faction.js";

import EntityFilter from "../../model/EntityFilter.js";
import RangeFilter from "../../model/RangeFilter.js";

import Button from "../../view/Button.js";
import InputPanel from "../../view/InputPanel.js";

import Action from "./Action.js";
import DefaultFilters from "./DefaultFilters.js";

var FilterUI = createReactClass(
{
   contextTypes:
   {
      store: PropTypes.object.isRequired,
   },

   propTypes:
   {
      filters: PropTypes.object.isRequired,
   },

   getInitialState: function()
   {
      return (
      {
         factionValues: (this.props.filters.factionKey ? this.props.filters.factionKey.values() : []),
      });
   },

   render: function()
   {
      var cells = [];
      cells.push(ReactDOMFactories.td(
      {
         key: cells.length,
         className: "filterTable",
      }, this.createRangeTable()));
      cells.push(ReactDOMFactories.td(
      {
         key: cells.length,
         className: "filtersUI f6 v-top",
      }, this.createEntityTable()));

      var rows = [];
      rows.push(ReactDOMFactories.tr(
      {
         key: rows.length,
      }, cells));

      rows.push(ReactDOMFactories.tr(
      {
         key: rows.length,
      }, ReactDOMFactories.td(
      {
         colSpan: 2,
      }, this.createButtonTable())));

      return ReactDOMFactories.table(
      {
         className: "filtersUI f6 v-top",
      }, ReactDOMFactories.tbody(
      {}, rows));
   },

   createButtonTable: function()
   {
      var restoreButton = React.createElement(Button,
      {
         name: "Restore Defaults",
         onClick: this.restoreActionPerformed,
      });
      var unfilterButton = React.createElement(Button,
      {
         name: "Remove Filter",
         onClick: this.unfilterActionPerformed,
      });
      var filterButton = React.createElement(Button,
      {
         name: "Apply Filter",
         onClick: this.filterActionPerformed,
      });

      var cells = [];
      cells.push(ReactDOMFactories.td(
      {
         key: cells.length,
      }, restoreButton));
      cells.push(ReactDOMFactories.td(
      {
         key: cells.length,
      }, unfilterButton));
      cells.push(ReactDOMFactories.td(
      {
         key: cells.length,
      }, filterButton));
      var row = ReactDOMFactories.tr(
      {}, cells);

      return ReactDOMFactories.table(
      {}, ReactDOMFactories.tbody(
      {}, row));
   },

   createEntityTable: function()
   {
      var cells = [];

      DefaultFilters.entityColumns.forEach(function(column)
      {
         var values;
         var labelFunction;
         var clientProps = {};

         switch (column.key)
         {
            case "factionKey":
               values = Faction.keys();
               labelFunction = function(value)
               {
                  return Faction.properties[value].name;
               };
               clientProps["data-entitytype"] = "factionKey";
               break;
            default:
               throw "Unknown entity column: " + column.key;
         }

         var oldFilter = this.context.store.getState().filters[column.key];
         var initialValues = [];

         if (oldFilter)
         {
            ArrayUtilities.addAll(initialValues, oldFilter.values());
         }

         var label = ReactDOMFactories.span(
         {
            className: "entityLabel b f6",
         }, column.label);
         var checkboxPanel = React.createElement(InputPanel,
         {
            type: InputPanel.Type.CHECKBOX,
            values: values,
            labelFunction: labelFunction,
            initialValues: initialValues,
            onChange: this.handleEntityChange,
            panelClass: "entitiesTable bg-white f7 tl",
            clientProps: clientProps,
         });

         cells.push(ReactDOMFactories.td(
         {
            key: cells.length,
            className: "entityFilterContainer pl1 v-top",
         }, label, ReactDOMFactories.div(
         {
            className: "entitiesContainer overflow-y-auto pl1",
         }, checkboxPanel)));
      }, this);

      var row = ReactDOMFactories.tr(
      {}, cells);

      return ReactDOMFactories.table(
      {
         className: "filtersUI f6 v-top",
      }, ReactDOMFactories.tbody(
      {}, row));
   },

   createRangeTable: function()
   {
      var rows = [];

      DefaultFilters.rangeColumns.forEach(function(column)
      {
         var filter = this.props.filters[column.key];
         var cells = [];
         cells.push(ReactDOMFactories.td(
         {
            key: cells.length,
         }, ReactDOMFactories.input(
         {
            id: column.key + "MinChecked",
            type: "checkbox",
            defaultChecked: (filter ? filter.isMinEnabled() : false),
            onChange: this.handleRangeChange,
         })));
         cells.push(ReactDOMFactories.td(
         {
            key: cells.length,
         }, ReactDOMFactories.input(
         {
            id: column.key + "Min",
            type: "number",
            className: "filterField",
            defaultValue: (filter ? filter.minValue() : 0),
            onChange: this.handleRangeChange,
         })));
         cells.push(ReactDOMFactories.td(
         {
            key: cells.length,
         }, "\u2264 " + column.label + " \u2264"));
         cells.push(ReactDOMFactories.td(
         {
            key: cells.length,
         }, ReactDOMFactories.input(
         {
            id: column.key + "MaxChecked",
            type: "checkbox",
            defaultChecked: (filter ? filter.isMaxEnabled() : false),
            onChange: this.handleRangeChange,
         })));
         cells.push(ReactDOMFactories.td(
         {
            key: cells.length,
         }, ReactDOMFactories.input(
         {
            id: column.key + "Max",
            type: "number",
            className: "filterField",
            defaultValue: (filter ? filter.maxValue() : 10),
            onChange: this.handleRangeChange,
         })));

         rows.push(ReactDOMFactories.tr(
         {
            key: rows.length,
            className: "striped--light-gray",
         }, cells));
      }, this);

      return ReactDOMFactories.table(
      {
         className: "filterTable bg-white",
      }, ReactDOMFactories.tbody(
      {}, rows));
   },

   filterActionPerformed: function()
   {
      LOGGER.trace("FilterUI.filterActionPerformed() start");

      var filters = {};

      DefaultFilters.entityColumns.forEach(function(column)
      {
         var values = [];

         switch (column.key)
         {
            case "factionKey":
               ArrayUtilities.addAll(values, this.state.factionValues);
               break;
            default:
               throw "Unknown entity column: " + column.key;
         }

         var filter = new EntityFilter(column.key, values);
         filters[column.key] = filter;
      }, this);

      DefaultFilters.rangeColumns.forEach(function(column)
      {
         var isMinEnabled = document.getElementById(column.key + "MinChecked").checked;
         var minValue = document.getElementById(column.key + "Min").value;
         var isMaxEnabled = document.getElementById(column.key + "MaxChecked").checked;
         var maxValue = document.getElementById(column.key + "Max").value;

         var filter = new RangeFilter(column.key, isMinEnabled, minValue, isMaxEnabled, maxValue);
         filters[column.key] = filter;
      });

      this.context.store.dispatch(Action.setFilters(filters));

      LOGGER.trace("FilterUI.filterActionPerformed() end");
   },

   handleEntityChange: function(event, selected)
   {
      LOGGER.trace("FilterUI.handleEntityChange() start");

      var entityType = event.target.dataset.entitytype;
      LOGGER.debug("entityType = " + entityType);
      var values = [];
      ArrayUtilities.addAll(values, selected);

      switch (entityType)
      {
         case "factionKey":
            this.setState(
            {
               factionValues: values,
            });
            break;
         default:
            throw "Unknown entityType: " + entityType;
      }

      LOGGER.trace("FilterUI.handleEntityChange() end");
   },

   restoreActionPerformed: function()
   {
      LOGGER.trace("FilterUI.restoreActionPerformed() start");
      this.context.store.dispatch(Action.setDefaultFilters());
      LOGGER.trace("FilterUI.restoreActionPerformed() end");
   },

   unfilterActionPerformed: function()
   {
      LOGGER.trace("FilterUI.unfilterActionPerformed() start");
      this.context.store.dispatch(Action.removeFilters());
      LOGGER.trace("FilterUI.unfilterActionPerformed() end");
   },
});

export default FilterUI;