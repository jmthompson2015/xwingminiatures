/*
 * Provides an HTML select with options derived from values and the label function.
 * Optionally provide client properties which can be retrieved from the event in your onChange function.
 */
"use strict";

define(["create-react-class", "prop-types", "react-dom-factories", "common/js/InputValidator"],
   function(createClassReact, PropTypes, DOM, InputValidator)
   {
      var Select = createClassReact(
      {
         getInitialState: function()
         {
            return (
            {
               selectedValue: this.props.initialSelectedValue,
            });
         },

         handleChange: function(event)
         {
            this.setState(
            {
               selectedValue: event.target.value,
            });

            var onChange = this.props.onChange;

            if (onChange)
            {
               onChange(event);
            }
         },

         render: function()
         {
            var values = this.props.values;
            InputValidator.validateNotEmpty("values", values);

            var selectProps = {
               value: this.state.selectedValue,
               onChange: this.handleChange,
            };

            var clientProps = this.props.clientProps;

            if (clientProps)
            {
               Object.getOwnPropertyNames(clientProps).forEach(function(key)
               {
                  selectProps[key] = clientProps[key];
               });
            }

            var labelFunction = this.props.labelFunction;
            var options = [];

            for (var i = 0; i < values.length; i++)
            {
               var value = values[i];
               var label = (labelFunction ? labelFunction(value) : value);

               options.push(DOM.option(
               {
                  key: i,
                  value: value,
               }, label));
            }

            return DOM.select(selectProps, options);
         },
      });

      Select.propTypes = {
         // Option values. (required)
         values: PropTypes.array.isRequired,

         // Client properties. (optional)
         clientProps: PropTypes.object,
         // Initially selected value. (optional)
         initialSelectedValue: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
         // Function which returns the label for a value. Defaults to simply return the value. (optional)
         labelFunction: PropTypes.func,
         // Function called when the selection changes. (optional)
         onChange: PropTypes.func,
      };

      return Select;
   });
