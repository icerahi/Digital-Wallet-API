"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = require("express");
const checkAuth_1 = require("../../middlewares/checkAuth");
const validateRequest_1 = require("../../middlewares/validateRequest");
const user_controller_1 = require("./user.controller");
const user_interface_1 = require("./user.interface");
const user_validation_1 = require("./user.validation");
const router = (0, express_1.Router)();
router.post("/register", (0, validateRequest_1.validateRequest)(user_validation_1.createUserZodSchema), user_controller_1.userControllers.register);
//only admin access
router.get("/all-users", (0, checkAuth_1.checkAuth)(user_interface_1.Role.ADMIN), user_controller_1.userControllers.getAllUsers); //accept query=role and/or phone
router.get("/:id", (0, checkAuth_1.checkAuth)(user_interface_1.Role.ADMIN), user_controller_1.userControllers.getSingleUser);
//possible to approved user as agent
router.patch("/approve-agent/:id", (0, checkAuth_1.checkAuth)(user_interface_1.Role.ADMIN), user_controller_1.userControllers.approveAgent);
router.patch("/suspend-agent/:id", (0, checkAuth_1.checkAuth)(user_interface_1.Role.ADMIN), user_controller_1.userControllers.suspendAgent);
exports.UserRoutes = router;
