import { Router } from "express";
import { validateRequest } from "../../middlewares/validateRequest";
import { authController } from "./auth.controller";
import { credentialLoginZodSchema } from "./auth.validation";

const router = Router();

/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     summary: Log in a user
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Login successful
 */
router.post(
  "/login",
  validateRequest(credentialLoginZodSchema),
  authController.credentialLogin
);

/**
 * @swagger
 * /api/v1/auth/logout:
 *   post:
 *     summary: Log out a user
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Logout successful
 */
router.post("/logout", authController.logout);

/**
 * @swagger
 * /api/v1/auth/refresh-token:
 *   post:
 *     summary: Get a new access token
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: New access token retrieved successfully
 */
router.post("/refresh-token", authController.getNewAccessToken);

export const AuthRoutes = router;
