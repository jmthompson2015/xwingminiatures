import BasicManeuver from "./BasicManeuver.js";
import Bearing from "./Bearing.js";
import Difficulty from "./Difficulty.js";
import Maneuver from "./Maneuver.js";

QUnit.module("Maneuver");

QUnit.test("Maneuver properties Straight1Standard", function(assert)
{
   const maneuver = Maneuver.STRAIGHT_1_STANDARD;
   const properties = Maneuver.properties[maneuver];
   assert.equal(properties.basicManeuverKey, BasicManeuver.STRAIGHT_1);
   assert.equal(properties.bearingKey, Bearing.STRAIGHT);
   assert.equal(properties.speed, 1);
   assert.equal(properties.energy, undefined);
   assert.equal(properties.difficultyKey, Difficulty.STANDARD);
   assert.equal(properties.key, maneuver);
});

QUnit.test("Maneuver properties Straight1_3", function(assert)
{
   const maneuver = Maneuver.STRAIGHT_1_3;
   const properties = Maneuver.properties[maneuver];
   assert.equal(properties.basicManeuverKey, BasicManeuver.STRAIGHT_1_3);
   assert.equal(properties.bearingKey, Bearing.STRAIGHT);
   assert.equal(properties.speed, 1);
   assert.equal(properties.energy, 3);
   assert.equal(properties.difficultyKey, Difficulty.STANDARD);
   assert.equal(properties.key, maneuver);
});

QUnit.test("Maneuver.find()", function(assert)
{
   assert.equal(Maneuver.find(Bearing.STRAIGHT, 0, Difficulty.HARD), Maneuver.STATIONARY_0_HARD);

   assert.equal(Maneuver.find(Bearing.TURN_LEFT, 1, Difficulty.HARD), Maneuver.TURN_LEFT_1_HARD);
   assert.equal(Maneuver.find(Bearing.BANK_LEFT, 1, Difficulty.STANDARD), Maneuver.BANK_LEFT_1_STANDARD);
   assert.equal(Maneuver.find(Bearing.STRAIGHT, 1, Difficulty.EASY), Maneuver.STRAIGHT_1_EASY);
   assert.equal(Maneuver.find(Bearing.BANK_RIGHT, 1, Difficulty.STANDARD), Maneuver.BANK_RIGHT_1_STANDARD);
   assert.equal(Maneuver.find(Bearing.TURN_RIGHT, 1, Difficulty.HARD), Maneuver.TURN_RIGHT_1_HARD);
   assert.equal(Maneuver.find(Bearing.BARREL_ROLL_LEFT, 1, Difficulty.STANDARD), Maneuver.BARREL_ROLL_LEFT_1_STANDARD);

   assert.equal(Maneuver.find(Bearing.TURN_LEFT, 2, Difficulty.HARD), Maneuver.TURN_LEFT_2_HARD);
   assert.equal(Maneuver.find(Bearing.BANK_LEFT, 2, Difficulty.STANDARD), Maneuver.BANK_LEFT_2_STANDARD);
   assert.equal(Maneuver.find(Bearing.STRAIGHT, 2, Difficulty.EASY), Maneuver.STRAIGHT_2_EASY);
   assert.equal(Maneuver.find(Bearing.BANK_RIGHT, 2, Difficulty.STANDARD), Maneuver.BANK_RIGHT_2_STANDARD);
   assert.equal(Maneuver.find(Bearing.TURN_RIGHT, 2, Difficulty.HARD), Maneuver.TURN_RIGHT_2_HARD);

   assert.equal(Maneuver.find(Bearing.TURN_LEFT, 3, Difficulty.HARD), Maneuver.TURN_LEFT_3_HARD);
});

QUnit.test("keys and values", function(assert)
{
   // Setup.

   // Run.
   const result = Maneuver.keys();
   const ownPropertyNames = Object.getOwnPropertyNames(Maneuver);

   // Verify.
   ownPropertyNames.forEach(function(key)
   {
      const key2 = Maneuver[key];

      if (key !== "properties" && typeof key2 === "string")
      {
         assert.ok(Maneuver.properties[key2], "Missing value for key = " + key);
      }
   });

   result.forEach(function(value)
   {
      const p = ownPropertyNames.filter(function(key)
      {
         return Maneuver[key] === value;
      });

      assert.equal(p.length, 1, "Missing key for value = " + value);
   });
});

QUnit.test("required properties", function(assert)
{
   Maneuver.values().forEach(function(maneuver)
   {
      assert.ok(maneuver.basicManeuverKey !== undefined, "Missing basicManeuverKey for " + maneuver.key);
      assert.ok(maneuver.basicManeuver !== undefined, "Missing basicManeuver for " + maneuver.key);
      assert.ok(maneuver.difficultyKey !== undefined, "Missing difficultyKey for " + maneuver.key);
      assert.ok(maneuver.difficulty !== undefined, "Missing difficulty for " + maneuver.key);
      assert.ok(maneuver.bearingKey !== undefined, "Missing bearingKey for " + maneuver.key);
      assert.ok(maneuver.speed !== undefined, "Missing speed for " + maneuver.key);
      assert.ok(maneuver.key !== undefined, "Missing key for " + maneuver.key);
   });
});

QUnit.test("Maneuver.toString()", function(assert)
{
   assert.equal(Maneuver.toString(Maneuver.TURN_LEFT_1_STANDARD), "Turn Left 1 Standard");
   assert.equal(Maneuver.toString(Maneuver.BANK_LEFT_1_EASY), "Bank Left 1 Easy");
   assert.equal(Maneuver.toString(Maneuver.STRAIGHT_1_EASY), "Straight 1 Easy");
   assert.equal(Maneuver.toString(Maneuver.BANK_RIGHT_1_EASY), "Bank Right 1 Easy");
   assert.equal(Maneuver.toString(Maneuver.TURN_RIGHT_1_STANDARD), "Turn Right 1 Standard");

   assert.equal(Maneuver.toString(Maneuver.TURN_LEFT_2_STANDARD), "Turn Left 2 Standard");
   assert.equal(Maneuver.toString(Maneuver.BANK_LEFT_2_STANDARD), "Bank Left 2 Standard");
   assert.equal(Maneuver.toString(Maneuver.STRAIGHT_2_STANDARD), "Straight 2 Standard");
   assert.equal(Maneuver.toString(Maneuver.BANK_RIGHT_2_STANDARD), "Bank Right 2 Standard");
   assert.equal(Maneuver.toString(Maneuver.TURN_RIGHT_2_STANDARD), "Turn Right 2 Standard");
});

QUnit.test("keys()", function(assert)
{
   // Run.
   const result = Maneuver.keys();

   // Verify.
   assert.ok(result);
   const length = 97;
   assert.equal(result.length, length);
   assert.equal(result[0], "bankLeft1Easy");
   assert.equal(result[length - 1], "straight4_2");

   const properties = Object.getOwnPropertyNames(Maneuver);
   const count = properties.length - 1 - // properties
      1 - // find
      1 - // keys
      1 - // toString
      1; // values
   assert.equal(result.length, count);
});

const ManeuverTest = {};
export default ManeuverTest;