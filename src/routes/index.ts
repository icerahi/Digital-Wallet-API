import { Router } from "express";
import { AuthRoutes } from "../modules/auth/auth.route";
import { TransactionsRoutes } from "../modules/transaction/transaction.route";
import { UserRoutes } from "../modules/user/user.route";
import { WalletRoutes } from "../modules/wallet/wallet.route";
import { externalRoutes } from "../modules/external/external.route";

export const router = Router();

const moduleRoutes = [
  { path: "/users", route: UserRoutes },
  { path: "/auth", route: AuthRoutes },
  { path: "/wallets", route: WalletRoutes },
  { path: "/transactions", route: TransactionsRoutes },
  { path: "/external", route: externalRoutes },
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});
