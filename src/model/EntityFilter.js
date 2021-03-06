import InputValidator from "../utility/InputValidator.js";

function EntityFilter(columnKey, values)
{
   InputValidator.validateNotNull("columnKey", columnKey);
   InputValidator.validateNotNull("values", values);

   this.columnKey = function()
   {
      return columnKey;
   };

   this.values = function()
   {
      return values;
   };

   this.passes = function(data)
   {
      InputValidator.validateNotNull("data", data);

      const value = data[columnKey];

      return values.length === 0 || values.includes(value);
   };

   this.toObject = function()
   {
      return (
      {
         type: "EntityFilter",
         columnKey: columnKey,
         values: values,
      });
   };

   this.toString = function()
   {
      return "EntityFilter (" + columnKey + " in [" + values + "])";
   };
}

EntityFilter.fromObject = function(object)
{
   InputValidator.validateNotNull("object", object);

   const columnKey = object.columnKey;
   const values = object.values;

   return new EntityFilter(columnKey, values);
};

export default EntityFilter;