import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { validateRequest } from "../../middlewares/validateRequest";
import { Role } from "../user/user.interface";
import { walletControllers } from "./wallet.controller";
import { addMoneyZodSchema, sendMoneyZodSchema } from "./wallet.validation";

const router = Router();

router.get("/me", checkAuth(Role.USER, Role.AGENT), walletControllers.myWallet);
router.post(
  "/add-money",
  checkAuth(Role.USER, Role.AGENT),
  validateRequest(addMoneyZodSchema),
  walletControllers.addMoney
);
router.post(
  "/withdraw-money",
  checkAuth(Role.USER),
  validateRequest(addMoneyZodSchema),
  walletControllers.withdrawMoney
);

router.post(
  "/send-money",
  checkAuth(Role.USER),
  validateRequest(sendMoneyZodSchema),
  walletControllers.sendMoney
);

router.post(
  "/cash-in",
  checkAuth(Role.AGENT),
  validateRequest(sendMoneyZodSchema),
  walletControllers.cashIn
);

router.post;
export const WalletRoutes = router;
