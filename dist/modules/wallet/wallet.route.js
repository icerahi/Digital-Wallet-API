"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletRoutes = void 0;
const express_1 = require("express");
const checkAuth_1 = require("../../middlewares/checkAuth");
const validateRequest_1 = require("../../middlewares/validateRequest");
const user_interface_1 = require("../user/user.interface");
const wallet_controller_1 = require("./wallet.controller");
const wallet_validation_1 = require("./wallet.validation");
const router = (0, express_1.Router)();
//Both User & Agent Access
router.get("/me", (0, checkAuth_1.checkAuth)(user_interface_1.Role.USER, user_interface_1.Role.AGENT), wallet_controller_1.walletControllers.myWallet);
//only User Access
router.post("/add-money", (0, checkAuth_1.checkAuth)(user_interface_1.Role.USER, user_interface_1.Role.AGENT), (0, validateRequest_1.validateRequest)(wallet_validation_1.addMoneyZodSchema), wallet_controller_1.walletControllers.addMoney);
router.post("/withdraw-money", (0, checkAuth_1.checkAuth)(user_interface_1.Role.USER), (0, validateRequest_1.validateRequest)(wallet_validation_1.addMoneyZodSchema), wallet_controller_1.walletControllers.withdrawMoney);
router.post("/send-money", (0, checkAuth_1.checkAuth)(user_interface_1.Role.USER), (0, validateRequest_1.validateRequest)(wallet_validation_1.sendMoneyAndCashInZodSchema), wallet_controller_1.walletControllers.sendMoney);
// Only Agent access
router.post("/cash-in", (0, checkAuth_1.checkAuth)(user_interface_1.Role.AGENT), (0, validateRequest_1.validateRequest)(wallet_validation_1.sendMoneyAndCashInZodSchema), wallet_controller_1.walletControllers.cashIn);
router.post("/cash-out", (0, checkAuth_1.checkAuth)(user_interface_1.Role.AGENT), (0, validateRequest_1.validateRequest)(wallet_validation_1.cashOutZodSchema), wallet_controller_1.walletControllers.cashOut);
//only Admin Access
router.get("/all", (0, checkAuth_1.checkAuth)(user_interface_1.Role.ADMIN), wallet_controller_1.walletControllers.getAllWallets);
router.patch("/block/:id", (0, checkAuth_1.checkAuth)(user_interface_1.Role.ADMIN), wallet_controller_1.walletControllers.blockWallet);
router.patch("/unblock/:id", (0, checkAuth_1.checkAuth)(user_interface_1.Role.ADMIN), wallet_controller_1.walletControllers.unblockWallet);
router.get("/:id", (0, checkAuth_1.checkAuth)(user_interface_1.Role.ADMIN), wallet_controller_1.walletControllers.getSingleWallet);
exports.WalletRoutes = router;
