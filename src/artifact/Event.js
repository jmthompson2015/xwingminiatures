const Event = {
   AFTER_EXECUTE_MANEUVER: "afterExecuteManeuver",
   RECEIVE_CRITICAL_DAMAGE: "receiveCriticalDamage",
   RECEIVE_DAMAGE: "receiveDamage",
   RECEIVE_FOCUS: "receiveFocus",
   RECEIVE_STRESS: "receiveStress",
   RECOVER_SHIELD: "recoverShield",
   REMOVE_FOCUS: "removeFocus",
   REMOVE_SHIELD: "removeShield",
   REMOVE_STRESS: "removeStress",
   SHIP_ACTION_PERFORMED: "shipActionPerformed",
   TARGET_LOCK_ACQUIRED: "targetLockAcquired",

   properties:
   {
      "afterExecuteManeuver":
      {
         name: "After Execute Maneuver",
         key: "afterExecuteManeuver",
      },
      "receiveCriticalDamage":
      {
         name: "Receive Critical Damage",
         key: "receiveCriticalDamage",
      },
      "receiveDamage":
      {
         name: "Receive Damage",
         key: "receiveDamage",
      },
      "receiveFocus":
      {
         name: "Receive Focus",
         key: "receiveFocus",
      },
      "receiveStress":
      {
         name: "Receive Stress",
         key: "receiveStress",
      },
      "recoverShield":
      {
         name: "Recover Shield",
         key: "recoverShield",
      },
      "removeFocus":
      {
         name: "Remove Focus",
         key: "removeFocus",
      },
      "removeShield":
      {
         name: "Remove Shield",
         key: "removeShield",
      },
      "removeStress":
      {
         name: "Remove Stress",
         key: "removeStress",
      },
      "shipActionPerformed":
      {
         name: "Ship Action Performed",
         key: "shipActionPerformed",
      },
      "targetLockAcquired":
      {
         name: "Target Lock Acquired",
         key: "targetLockAcquired",
      },
   },
};

Event.keys = function()
{
   return Object.keys(Event.properties);
};

Event.toString = function()
{
   return "Event";
};

Event.values = function()
{
   return Object.values(Event.properties);
};

if (Object.freeze)
{
   Object.freeze(Event);
}

export default Event;