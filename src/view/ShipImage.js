import InputValidator from "../utility/InputValidator.js";

import FiringArc from "../artifact/FiringArc.js";
import Ship from "../artifact/Ship.js";
import ShipBase from "../artifact/ShipBase.js";

const ShipImage = {};

const DEG_TO_RADIANS = Math.PI / 180.0;

ShipImage.draw = function(context, scale, id, image, position, shipFaction)
{
   InputValidator.validateNotNull("context", context);
   InputValidator.validateNotNull("scale", scale);
   // id optional.
   InputValidator.validateNotNull("image", image);
   InputValidator.validateNotNull("position", position);
   InputValidator.validateNotNull("shipFaction", shipFaction);

   // Setup.
   const primaryFiringArc = shipFaction.ship.primaryFiringArc;
   const auxiliaryFiringArc = shipFaction.ship.auxiliaryFiringArc;
   const factionColor = shipFaction.faction.color;
   const shipBase = shipFaction.ship.shipBase;
   const width = shipBase.width;
   const height = shipBase.height;
   const x = position.x();
   const y = position.y();
   const angle = position.heading() * DEG_TO_RADIANS;

   context.save();
   context.scale(scale, scale);
   context.translate(x, y);
   context.rotate(angle);

   // Draw background square.
   context.fillStyle = "rgba(255,255,255,0.4)";
   context.fillRect(-width / 2, -height / 2, width, height);
   context.fillStyle = "rgba(255,255,255,0.2)";
   context.strokeStyle = factionColor;

   // Draw the auxiliary firing arc.
   if (auxiliaryFiringArc)
   {
      context.setLineDash([5, 4]);
      ShipImage.drawFiringArc(context, auxiliaryFiringArc.key, width, height);
      context.setLineDash([]);
   }

   // Draw the primary firing arc.
   if ([Ship.CR90_CORVETTE, Ship.RAIDER_CLASS_CORVETTE].includes(shipFaction.ship.key))
   {
      ShipImage.drawFiringArc(context, shipFaction.ship.fore.primaryFiringArcKey, width, height);
      ShipImage.drawFiringArc(context, shipFaction.ship.aft.primaryFiringArcKey, width, height);
   }
   else if (primaryFiringArc)
   {
      ShipImage.drawFiringArc(context, primaryFiringArc.key, width, height);
   }

   // Draw ship image.
   let myWidth = width;
   let myHeight = height;

   if ([ShipBase.SMALL, ShipBase.LARGE].includes(shipBase.key))
   {
      if (image.width < image.height)
      {
         myWidth = width * image.width / image.height;
      }
      else if (image.width > image.height)
      {
         myHeight = height * image.height / image.width;
      }
   }

   context.drawImage(image, -myWidth / 2, -myHeight / 2, myWidth, myHeight);

   if (id !== undefined)
   {
      // Draw the token ID.
      context.rotate(90 * DEG_TO_RADIANS);
      context.fillStyle = factionColor;
      context.font = "14px sans-serif";
      context.fillText(id, -height / 2, width / 2);
      context.rotate(-90 * DEG_TO_RADIANS);
   }

   // Cleanup.
   context.restore();
};

ShipImage.drawFiringArc = function(context, firingArcKey, width, height)
{
   InputValidator.validateNotNull("context", context);
   InputValidator.validateIsString("firingArcKey", firingArcKey);
   InputValidator.validateIsNumber("width", width);
   InputValidator.validateIsNumber("height", height);

   // Draw the firing arc.
   switch (firingArcKey)
   {
      case FiringArc.AFT:
         context.beginPath();
         context.moveTo(-width / 2, -height / 2);
         context.lineTo(0, 0);
         context.lineTo(-width / 2, height / 2);
         context.fill();
         context.stroke();
         break;
      case FiringArc.AFT_180:
      case FiringArc.FORWARD_180:
         context.beginPath();
         context.moveTo(0, -height / 2);
         context.lineTo(0, 0);
         context.lineTo(0, height / 2);
         context.stroke();
         context.lineTo(width / 2, height / 2);
         context.lineTo(width / 2, -height / 2);
         context.fill();
         break;
      case FiringArc.BULLSEYE:
         context.beginPath();
         context.moveTo(8, -8);
         context.lineTo(width / 2, -8);
         context.moveTo(width / 2, 8);
         context.lineTo(8, 8);
         context.fill();
         context.stroke();
         break;
      case FiringArc.FORWARD:
         context.beginPath();
         context.moveTo(width / 2, -height / 2);
         context.lineTo(0, 0);
         context.lineTo(width / 2, height / 2);
         context.fill();
         context.stroke();
         break;
      case FiringArc.FORWARD_106:
         // +1 offset to avoid border lines
         context.beginPath();
         context.moveTo(height / 2 * Math.tan(37 * DEG_TO_RADIANS), -height / 2);
         context.lineTo(0, 0);
         context.lineTo(height / 2 * Math.tan(37 * DEG_TO_RADIANS), height / 2 + 1);
         context.stroke();
         context.lineTo(width / 2 + 1, height / 2 + 1);
         context.lineTo(width / 2 + 1, -height / 2);
         context.fill();
         break;
      case FiringArc.FORWARD_136:
         context.beginPath();
         context.moveTo(height / 2 * Math.tan(22 * DEG_TO_RADIANS), -height / 2);
         context.lineTo(0, 0);
         context.lineTo(height / 2 * Math.tan(22 * DEG_TO_RADIANS), height / 2);
         context.stroke();
         context.lineTo(width / 2, height / 2);
         context.lineTo(width / 2, -height / 2);
         context.fill();
         break;
      case FiringArc.PORT:
         context.beginPath();
         context.moveTo(-width / 2, height / 2);
         context.lineTo(0, 0);
         context.lineTo(width / 2, height / 2);
         context.fill();
         context.stroke();
         break;
      case FiringArc.PORT_AND_STARBOARD_AFT:
         context.beginPath();
         context.moveTo(-width / 2, height / 2);
         context.lineTo(-width / 2 + 40, 0);
         context.lineTo(-width / 2 + 80, height / 2);
         context.moveTo(-width / 2, -height / 2);
         context.lineTo(-width / 2 + 40, 0);
         context.lineTo(-width / 2 + 80, -height / 2);
         context.fill();
         context.stroke();
         break;
      case FiringArc.PORT_AND_STARBOARD_AFT_SKEWED:
         context.moveTo(-width / 2, height / 2);
         context.lineTo(-width / 2 + 40, 0);
         context.lineTo(0, height / 2);
         context.moveTo(-width / 2, -height / 2);
         context.lineTo(-width / 2 + 40, 0);
         context.lineTo(0, -height / 2);
         context.fill();
         context.stroke();
         break;
      case FiringArc.PORT_AND_STARBOARD_FORE:
         context.beginPath();
         context.moveTo(width / 2, height / 2);
         context.lineTo(width / 2 - 40, 0);
         context.lineTo(width / 2 - 80, height / 2);
         context.moveTo(width / 2, -height / 2);
         context.lineTo(width / 2 - 40, 0);
         context.lineTo(width / 2 - 80, -height / 2);
         context.fill();
         context.stroke();
         break;
      case FiringArc.STARBOARD:
         context.beginPath();
         context.moveTo(-width / 2, -height / 2);
         context.lineTo(0, 0);
         context.lineTo(width / 2, -height / 2);
         context.fill();
         context.stroke();
         break;
      default:
         throw "Unknown firingArc: " + firingArcKey;
   }
};

export default ShipImage;