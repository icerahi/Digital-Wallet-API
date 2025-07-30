import { Router } from "express";
import { AuthRoutes } from "../modules/auth/auth.route";
import { UserRoutes } from "../modules/user/user.route";
import { WalletRoutes } from "../modules/wallet/wallet.route";
import { TransactionsRoutes } from "../modules/transaction/transaction.route";

export const router = Router();

const moduleRoutes = [
  { path: "/user", route: UserRoutes },
  { path: "/auth", route: AuthRoutes },
  { path: "/wallet", route: WalletRoutes },
  { path: "/transactions", route: TransactionsRoutes },
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});
