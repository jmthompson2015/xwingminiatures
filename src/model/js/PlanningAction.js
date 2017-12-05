"use strict";

define(["common/js/InputValidator"], function(InputValidator)
{
   function PlanningAction(environment, adjudicator, agent, callback)
   {
      InputValidator.validateNotNull("environment", environment);
      InputValidator.validateNotNull("adjudicator", adjudicator);
      InputValidator.validateNotNull("agent", agent);
      InputValidator.validateNotNull("callback", callback);

      this.environment = function()
      {
         return environment;
      };

      this.adjudicator = function()
      {
         return adjudicator;
      };

      this.agent = function()
      {
         return agent;
      };

      this.callback = function()
      {
         return callback;
      };
   }

   PlanningAction.prototype.doIt = function()
   {
      var agent = this.agent();

      agent.getPlanningAction(this.setTokenToManeuver.bind(this));

      // Wait for agent to respond.
   };

   PlanningAction.prototype.setTokenToManeuver = function(tokenToManeuver)
   {
      var agent = this.agent();
      var callback = this.callback();

      callback(agent, tokenToManeuver);
   };

   return PlanningAction;
});
