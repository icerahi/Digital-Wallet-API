import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { validateRequest } from "../../middlewares/validateRequest";
import { userControllers } from "./user.controller";
import { Role } from "./user.interface";
import {
  chanagePasswordZodSchema,
  createUserZodSchema,
  updateUserZodSchema,
} from "./user.validation";

const router = Router();

/**
 * @swagger
 * /api/v1/users/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     responses:
 *       201:
 *         description: User created
 */
router.post(
  "/register",
  validateRequest(createUserZodSchema),
  userControllers.register
);

/**
 * @swagger
 * /api/v1/users/me:
 *   get:
 *     summary: Get my user profile
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Profile retrieved
 */
router.get("/me", checkAuth(...Object.values(Role)), userControllers.getMe);

//possible to approved user as agent
/**
 * @swagger
 * /api/v1/users/approve-agent/{id}:
 *   patch:
 *     summary: Approve a user to become an agent
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Agent approved
 */
router.patch(
  "/approve-agent/:id",
  checkAuth(Role.SUPERADMIN,Role.ADMIN),
  userControllers.approveAgent
);

/**
 * @swagger
 * /api/v1/users/suspend-agent/{id}:
 *   patch:
 *     summary: Suspend an agent
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Agent suspended
 */
router.patch(
  "/suspend-agent/:id",
  checkAuth(Role.SUPERADMIN,Role.ADMIN),
  userControllers.suspendAgent
);

/**
 * @swagger
 * /api/v1/users/change-password:
 *   patch:
 *     summary: Change user password
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Password changed
 */
router.patch(
  "/change-password",
  checkAuth(...Object.values(Role)),
  validateRequest(chanagePasswordZodSchema),
  userControllers.changePassword
);

/**
 * @swagger
 * /api/v1/users/update:
 *   patch:
 *     summary: Update user profile
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Profile updated
 */
router.patch(
  "/update",
  checkAuth(...Object.values(Role)),
  validateRequest(updateUserZodSchema),
  userControllers.updateUser
);

//only admin access
/**
 * @swagger
 * /api/v1/users/all-users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of users
 */
router.get("/all-users", checkAuth(Role.SUPERADMIN, Role.ADMIN), userControllers.getAllUsers); //accept query=role and/or phone

/**
 * @swagger
 * /api/v1/users/{id}:
 *   get:
 *     summary: Get a single user by ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User retrieved
 */
router.get("/:id", checkAuth(Role.SUPERADMIN,Role.ADMIN), userControllers.getSingleUser);

export const UserRoutes = router;
