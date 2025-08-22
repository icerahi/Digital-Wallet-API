import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { JwtPayload } from "jsonwebtoken";
import { envVars } from "../config/env";
import AppError from "../helpers/AppError";
import { Role } from "../modules/user/user.interface";
import { Wallet } from "../modules/wallet/wallet.model";
import { verifyToken } from "../utils/jwt";

export const checkAuth =
  (...authRoles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const accessToken = req.headers.authorization || req.cookies.accessToken;

      if (!accessToken)
        throw new AppError(StatusCodes.FORBIDDEN, "No token recieved");

      const verifiedToken = verifyToken(
        accessToken,
        envVars.JWT_ACCESS_TOKEN_SECRET
      ) as JwtPayload;

      if (!authRoles.includes(verifiedToken.role)) {
        throw new AppError(403, "You are not authorize to access this route");
      }

      if (
        verifiedToken.role === Role.USER ||
        verifiedToken.role === Role.AGENT
      ) {
        const isWalletExist = await Wallet.findOne({
          owner: verifiedToken.userId,
        });

        if (!isWalletExist)
          throw new AppError(StatusCodes.NOT_FOUND, "Wallet doesn't exist");

        if (isWalletExist.isBlocked) {
          throw new AppError(StatusCodes.BAD_REQUEST, "User Wallet is Blocked");
        }
      }

      req.user = verifiedToken;
      next();
    } catch (error) {
      next(error);
    }
  };
