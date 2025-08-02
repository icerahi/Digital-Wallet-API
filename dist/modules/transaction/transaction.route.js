"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionsRoutes = void 0;
const express_1 = require("express");
const checkAuth_1 = require("../../middlewares/checkAuth");
const validateRequest_1 = require("../../middlewares/validateRequest");
const user_interface_1 = require("../user/user.interface");
const transaction_controller_1 = require("./transaction.controller");
const transaction_validation_1 = require("./transaction.validation");
const router = (0, express_1.Router)();
// User & Agent access
router.get("/me", (0, checkAuth_1.checkAuth)(user_interface_1.Role.USER, user_interface_1.Role.AGENT), transaction_controller_1.transactionControllers.myTransactions);
//only admin
router.get("/all", (0, checkAuth_1.checkAuth)(user_interface_1.Role.ADMIN), transaction_controller_1.transactionControllers.getAllTransactions);
router.get("/:id", (0, checkAuth_1.checkAuth)(user_interface_1.Role.ADMIN), transaction_controller_1.transactionControllers.getSingleTransaction);
router.patch("/:id", (0, checkAuth_1.checkAuth)(user_interface_1.Role.ADMIN), (0, validateRequest_1.validateRequest)(transaction_validation_1.UpdateTransactionStatusZodSchema), transaction_controller_1.transactionControllers.updateTransactionStatus);
exports.TransactionsRoutes = router;
