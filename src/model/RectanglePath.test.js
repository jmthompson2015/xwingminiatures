import MathUtilities from "../utility/MathUtilities.js";

import RectanglePath from "./RectanglePath.js";

QUnit.module("RectanglePath");

QUnit.test("RectanglePath properties", function(assert)
{
   const result = new RectanglePath(40, 40);

   assert.ok(result);
   assert.equal(result.points().length, 10);

   let i = 0;
   const points = result.points();
   assert.equal(points[i++], 20);
   assert.equal(points[i++], -20);
   assert.equal(points[i++], 20);
   assert.equal(points[i++], 20);
   assert.equal(points[i++], -20);
   assert.equal(points[i++], 20);
   assert.equal(points[i++], -20);
   assert.equal(points[i++], -20);
   assert.equal(points[i++], 20);
   assert.equal(points[i++], -20);
});

QUnit.test("boundingBox()", function(assert)
{
   // Setup.
   const path = new RectanglePath(20, 40);

   // Run.
   const result = path.boundingBox();

   // Verify.
   assert.ok(result);
   assert.equal(result.minX, -10);
   assert.equal(result.minY, -20);
   assert.equal(result.maxX, 10);
   assert.equal(result.maxY, 20);
   assert.equal(result.area, 800);
});

QUnit.test("boundingBox() degenerate", function(assert)
{
   // Setup.
   const path = new RectanglePath(0, 0);

   // Run.
   const result = path.boundingBox();

   // Verify.
   assert.ok(result);
   assert.ok(!result.minX);
   assert.ok(!result.minY);
   assert.ok(!result.maxX);
   assert.ok(!result.maxY);
   assert.ok(!result.area);
});

QUnit.test("rotate()", function(assert)
{
   // Setup.
   const path = new RectanglePath(20, 40);

   // Run.
   path.rotate(30.0 * Math.PI / 180.0);

   // Verify.
   let i = 0;
   const points = path.points();
   assert.equal(MathUtilities.round(points[i++], 2), 18.66);
   assert.equal(MathUtilities.round(points[i++], 2), -12.32);
   assert.equal(MathUtilities.round(points[i++], 2), -1.34);
   assert.equal(MathUtilities.round(points[i++], 2), 22.32);
   assert.equal(MathUtilities.round(points[i++], 2), -18.66);
   assert.equal(MathUtilities.round(points[i++], 2), 12.32);
   assert.equal(MathUtilities.round(points[i++], 2), 1.34);
   assert.equal(MathUtilities.round(points[i++], 2), -22.32);
   assert.equal(MathUtilities.round(points[i++], 2), 18.66);
   assert.equal(MathUtilities.round(points[i++], 2), -12.32);
});

QUnit.test("toString()", function(assert)
{
   // Setup.
   const path = new RectanglePath(20, 40);

   // Run.
   const result = path.toString();

   // Verify.
   assert.equal(result, "0 (10, -20)\n2 (10, 20)\n4 (-10, 20)\n6 (-10, -20)\n8 (10, -20)\n");
});

QUnit.test("translate()", function(assert)
{
   // Setup.
   const path = new RectanglePath(20, 40);

   // Run.
   path.translate(5, 6);

   // Verify.
   let i = 0;
   const points = path.points();
   assert.equal(points[i++], 15);
   assert.equal(points[i++], -14);
   assert.equal(points[i++], 15);
   assert.equal(points[i++], 26);
   assert.equal(points[i++], -5);
   assert.equal(points[i++], 26);
   assert.equal(points[i++], -5);
   assert.equal(points[i++], -14);
   assert.equal(points[i++], 15);
   assert.equal(points[i++], -14);
});

QUnit.test("isLeft()", function(assert)
{
   // Run / Verify.
   assert.ok(RectanglePath.isLeft(10, 20, 30, 40, 10, 30) > 0);
   assert.ok(RectanglePath.isLeft(10, 20, 30, 40, 20, 30) === 0);
   assert.ok(RectanglePath.isLeft(10, 20, 30, 40, 40, 30) < 0);
});

QUnit.test("determineWindingNumber()", function(assert)
{
   // Setup.
   const polygon = new RectanglePath(20, 30);
   polygon.rotate(30.0 * Math.PI / 180.0);
   polygon.translate(10, 20);

   // Run / Verify.
   assert.equal(RectanglePath.determineWindingNumber(-10, 0, polygon), 0);
   assert.equal(RectanglePath.determineWindingNumber(-10, 10, polygon), 0);
   assert.equal(RectanglePath.determineWindingNumber(-10, 20, polygon), 0);
   assert.equal(RectanglePath.determineWindingNumber(-10, 30, polygon), 0);
   assert.equal(RectanglePath.determineWindingNumber(-10, 40, polygon), 0);

   assert.equal(RectanglePath.determineWindingNumber(0, 0, polygon), 0);
   assert.equal(RectanglePath.determineWindingNumber(0, 10, polygon), 0);
   assert.equal(RectanglePath.determineWindingNumber(0, 20, polygon), 1);
   assert.equal(RectanglePath.determineWindingNumber(0, 30, polygon), 1);
   assert.equal(RectanglePath.determineWindingNumber(0, 40, polygon), 0);

   assert.equal(RectanglePath.determineWindingNumber(10, 0, polygon), 0);
   assert.equal(RectanglePath.determineWindingNumber(10, 10, polygon), 1);
   assert.equal(RectanglePath.determineWindingNumber(10, 20, polygon), 1);
   assert.equal(RectanglePath.determineWindingNumber(10, 30, polygon), 1);
   assert.equal(RectanglePath.determineWindingNumber(10, 40, polygon), 0);

   assert.equal(RectanglePath.determineWindingNumber(20, 0, polygon), 0);
   assert.equal(RectanglePath.determineWindingNumber(20, 10, polygon), 1);
   assert.equal(RectanglePath.determineWindingNumber(20, 20, polygon), 1);
   assert.equal(RectanglePath.determineWindingNumber(20, 30, polygon), 0);
   assert.equal(RectanglePath.determineWindingNumber(20, 40, polygon), 0);

   assert.equal(RectanglePath.determineWindingNumber(30, 0, polygon), 0);
   assert.equal(RectanglePath.determineWindingNumber(30, 10, polygon), 0);
   assert.equal(RectanglePath.determineWindingNumber(30, 20, polygon), 0);
   assert.equal(RectanglePath.determineWindingNumber(30, 30, polygon), 0);
   assert.equal(RectanglePath.determineWindingNumber(30, 40, polygon), 0);
});

QUnit.test("isPointInPolygon()", function(assert)
{
   // Setup.
   const polygon = new RectanglePath(20, 30);
   polygon.rotate(30.0 * Math.PI / 180.0);
   polygon.translate(10, 20);

   // Run / Verify.
   assert.ok(!RectanglePath.isPointInPolygon(-10, 0, polygon));
   assert.ok(!RectanglePath.isPointInPolygon(-10, 10, polygon));
   assert.ok(!RectanglePath.isPointInPolygon(-10, 20, polygon));
   assert.ok(!RectanglePath.isPointInPolygon(-10, 30, polygon));
   assert.ok(!RectanglePath.isPointInPolygon(-10, 40, polygon));

   assert.ok(!RectanglePath.isPointInPolygon(0, 0, polygon));
   assert.ok(!RectanglePath.isPointInPolygon(0, 10, polygon));
   assert.ok(RectanglePath.isPointInPolygon(0, 20, polygon));
   assert.ok(RectanglePath.isPointInPolygon(0, 30, polygon));
   assert.ok(!RectanglePath.isPointInPolygon(0, 40, polygon));

   assert.ok(!RectanglePath.isPointInPolygon(10, 0, polygon));
   assert.ok(RectanglePath.isPointInPolygon(10, 10, polygon));
   assert.ok(RectanglePath.isPointInPolygon(10, 20, polygon));
   assert.ok(RectanglePath.isPointInPolygon(10, 30, polygon));
   assert.ok(!RectanglePath.isPointInPolygon(10, 40, polygon));

   assert.ok(!RectanglePath.isPointInPolygon(20, 0, polygon));
   assert.ok(RectanglePath.isPointInPolygon(20, 10, polygon));
   assert.ok(RectanglePath.isPointInPolygon(20, 20, polygon));
   assert.ok(!RectanglePath.isPointInPolygon(20, 30, polygon));
   assert.ok(!RectanglePath.isPointInPolygon(20, 40, polygon));

   assert.ok(!RectanglePath.isPointInPolygon(30, 0, polygon));
   assert.ok(!RectanglePath.isPointInPolygon(30, 10, polygon));
   assert.ok(!RectanglePath.isPointInPolygon(30, 20, polygon));
   assert.ok(!RectanglePath.isPointInPolygon(30, 30, polygon));
   assert.ok(!RectanglePath.isPointInPolygon(30, 40, polygon));
});

QUnit.test("doPolygonsCollide() yes 1", function(assert)
{
   // Setup.
   const polygon0 = new RectanglePath(10, 10);
   const polygon1 = new RectanglePath(10, 20);
   polygon1.translate(5, 0);

   // Run.
   const result = RectanglePath.doPolygonsCollide(polygon0, polygon1);

   // Verify.
   assert.ok(result);
});

QUnit.test("doPolygonsCollide() yes 2", function(assert)
{
   // Setup.
   const polygon0 = new RectanglePath(10, 20);
   const polygon1 = new RectanglePath(10, 10);
   polygon1.translate(5, 0);

   // Run.
   const result = RectanglePath.doPolygonsCollide(polygon0, polygon1);

   // Verify.
   assert.ok(result);
});

QUnit.test("doPolygonsCollide() yes 3", function(assert)
{
   // Setup.
   const polygon0 = new RectanglePath(40, 40);
   const polygon1 = new RectanglePath(40, 40);
   polygon1.rotate(45.0 * Math.PI / 180.0);

   // Run.
   const result = RectanglePath.doPolygonsCollide(polygon0, polygon1);

   // Verify.
   assert.ok(result);
});

QUnit.test("doPolygonsCollide() no right", function(assert)
{
   // Setup.
   const polygon0 = new RectanglePath(10, 10);
   const polygon1 = new RectanglePath(10, 20);
   polygon1.translate(15, 0);

   // Run.
   const result = RectanglePath.doPolygonsCollide(polygon0, polygon1);

   // Verify.
   assert.ok(!result);
});

QUnit.test("doPolygonsCollide() no above", function(assert)
{
   // Setup.
   const polygon0 = new RectanglePath(10, 10);
   const polygon1 = new RectanglePath(10, 20);
   polygon1.translate(0, 25);

   // Run.
   const result = RectanglePath.doPolygonsCollide(polygon0, polygon1);

   // Verify.
   assert.ok(!result);
});

const RectanglePathTest = {};
export default RectanglePathTest;