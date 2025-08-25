import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { validateRequest } from "../../middlewares/validateRequest";
import { userControllers } from "./user.controller";
import { Role } from "./user.interface";
import {
  chanagePasswordZodSchema,
  createUserZodSchema,
} from "./user.validation";

const router = Router();

router.post(
  "/register",
  validateRequest(createUserZodSchema),
  userControllers.register
);

//only admin access
router.get("/all-users", checkAuth(Role.ADMIN), userControllers.getAllUsers); //accept query=role and/or phone
router.get("/:id", checkAuth(Role.ADMIN), userControllers.getSingleUser);

//possible to approved user as agent
router.patch(
  "/approve-agent/:id",
  checkAuth(Role.ADMIN),
  userControllers.approveAgent
);
router.patch(
  "/suspend-agent/:id",
  checkAuth(Role.ADMIN),
  userControllers.suspendAgent
);

router.patch(
  "/change-password",
  checkAuth(...Object.values(Role)),
  validateRequest(chanagePasswordZodSchema),
  userControllers.changePassword
);
export const UserRoutes = router;
