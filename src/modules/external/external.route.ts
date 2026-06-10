import express from "express";
import { externalControllers } from "./external.controller";
import { cacheControl } from "../../middlewares/cacheControl";

const router = express.Router();

/**
 * @swagger
 * /api/v1/external/currency-rates:
 *   get:
 *     summary: Get live currency exchange rates
 *     tags: [External]
 *     responses:
 *       200:
 *         description: Live exchange rates
 */
router.get(
  "/currency-rates",
  cacheControl(300), // Cache for 5 minutes
  externalControllers.getCurrencyRates
);

export const externalRoutes = router;
