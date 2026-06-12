import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { validateRequest } from "../../middlewares/validateRequest";
import { Role } from "../user/user.interface";
import { walletControllers } from "./wallet.controller";
import {
  addMoneyAndCashOutZodSchema,
  sendWithdrawAndCashInZodSchema,
} from "./wallet.validation";

const router = Router();

//Both User & Agent Access
/**
 * @swagger
 * /api/v1/wallets/me:
 *   get:
 *     summary: Get my wallet
 *     tags: [Wallets]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Wallet retrieved
 */
router.get("/me", checkAuth(Role.USER, Role.AGENT), walletControllers.myWallet);

//only User Access
/**
 * @swagger
 * /api/v1/wallets/add-money:
 *   post:
 *     summary: Add money to wallet
 *     tags: [Wallets]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Money added successfully
 */
router.post(
  "/add-money",
  checkAuth(Role.USER, Role.AGENT),
  validateRequest(addMoneyAndCashOutZodSchema),
  walletControllers.addMoney
);
/**
 * @swagger
 * /api/v1/wallets/withdraw-money:
 *   post:
 *     summary: Withdraw money from wallet
 *     tags: [Wallets]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Money withdrawn successfully
 */
router.post(
  "/withdraw-money",
  checkAuth(Role.USER),
  validateRequest(sendWithdrawAndCashInZodSchema),
  walletControllers.withdrawMoney
);
/**
 * @swagger
 * /api/v1/wallets/send-money:
 *   post:
 *     summary: Send money to another user (P2P)
 *     tags: [Wallets]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Money sent successfully
 */
router.post(
  "/send-money",
  checkAuth(Role.USER),
  validateRequest(sendWithdrawAndCashInZodSchema),
  walletControllers.sendMoney
);

// Only Agent access
/**
 * @swagger
 * /api/v1/wallets/cash-in:
 *   post:
 *     summary: Agent cash-in to user wallet
 *     tags: [Wallets]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Cash-in successful
 */
router.post(
  "/cash-in",
  checkAuth(Role.AGENT),
  validateRequest(sendWithdrawAndCashInZodSchema),
  walletControllers.cashIn
);
/**
 * @swagger
 * /api/v1/wallets/cash-out:
 *   post:
 *     summary: User cash-out from agent
 *     tags: [Wallets]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Cash-out successful
 */
router.post(
  "/cash-out",
  checkAuth(Role.AGENT),
  validateRequest(addMoneyAndCashOutZodSchema),
  walletControllers.cashOut
);

//only Admin Access
/**
 * @swagger
 * /api/v1/wallets/all:
 *   get:
 *     summary: Get all wallets
 *     tags: [Wallets]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of wallets
 */
router.get("/all", checkAuth(Role.ADMIN), walletControllers.getAllWallets);

/**
 * @swagger
 * /api/v1/wallets/block/{id}:
 *   patch:
 *     summary: Block a wallet
 *     tags: [Wallets]
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
 *         description: Wallet blocked
 */
router.patch(
  "/block/:id",
  checkAuth(Role.ADMIN),
  walletControllers.blockWallet
);

/**
 * @swagger
 * /api/v1/wallets/unblock/{id}:
 *   patch:
 *     summary: Unblock a wallet
 *     tags: [Wallets]
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
 *         description: Wallet unblocked
 */
router.patch(
  "/unblock/:id",
  checkAuth(Role.ADMIN),
  walletControllers.unblockWallet
);

/**
 * @swagger
 * /api/v1/wallets/{id}:
 *   get:
 *     summary: Get a specific wallet by ID
 *     tags: [Wallets]
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
 *         description: Wallet retrieved
 */
router.get("/:id", checkAuth(Role.ADMIN), walletControllers.getSingleWallet);

export const WalletRoutes = router;
