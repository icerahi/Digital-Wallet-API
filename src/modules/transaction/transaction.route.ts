import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { validateRequest } from "../../middlewares/validateRequest";
import { Role } from "../user/user.interface";
import { transactionControllers } from "./transaction.controller";
import { UpdateTransactionStatusZodSchema } from "./transaction.validation";

const router = Router();

// User & Agent access
router.get(
  "/me",
  checkAuth(Role.USER, Role.AGENT),
  transactionControllers.myTransactions
);

//only admin
router.get(
  "/all",
  checkAuth(Role.ADMIN),
  transactionControllers.getAllTransactions
);

router.get(
  "/:id",
  checkAuth(Role.ADMIN),
  transactionControllers.getSingleTransaction
);

router.patch(
  "/:id",
  checkAuth(Role.ADMIN),
  validateRequest(UpdateTransactionStatusZodSchema),
  transactionControllers.updateTransactionStatus
);

export const TransactionsRoutes = router;
