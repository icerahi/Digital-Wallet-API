import { Router } from "express";
import { validateRequest } from "../../middlewares/validateRequest";
import { authController } from "./auth.controller";
import { credentialLoginZodSchema } from "./auth.validation";

const router = Router();

router.post(
  "/login",
  validateRequest(credentialLoginZodSchema),
  authController.credentialLogin
);

router.post("/logout", authController.logout);
router.post("/refresh-token", authController.getNewAccessToken);

export const AuthRoutes = router;
