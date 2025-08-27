/* eslint-disable @typescript-eslint/no-unused-vars */

import bcrypt from "bcryptjs";
import { StatusCodes } from "http-status-codes";
import { JwtPayload } from "jsonwebtoken";
import { envVars } from "../../config/env";
import AppError from "../../helpers/AppError";
import { createUserToken } from "../../utils/createUserToken";
import { generateToken, verifyToken } from "../../utils/jwt";
import { IUser } from "../user/user.interface";
import { User } from "../user/user.model";
import { Wallet } from "../wallet/wallet.model";
const credentialLogin = async (payload: Partial<IUser>) => {
  const { phone, password } = payload;

  const isUserExist = await User.findOne({ phone }).select("+password");

  if (!isUserExist) {
    throw new AppError(StatusCodes.NOT_FOUND, "User not found");
  }

  const isWalletExist = await Wallet.findOne({ owner: isUserExist._id });

  if (!isWalletExist) {
    throw new AppError(StatusCodes.NOT_FOUND, "You does not have any wallet!");
  }

  if (isWalletExist.isBlocked) {
    throw new AppError(StatusCodes.BAD_REQUEST, "Your Wallet is blocked");
  }

  const isPasswordMatched = await bcrypt.compare(
    password as string,
    isUserExist.password
  );

  if (!isPasswordMatched) {
    throw new AppError(StatusCodes.UNAUTHORIZED, "Password is incorrect");
  }

  const userTokens = createUserToken(isUserExist);
  const { password: pass, ...user } = isUserExist.toObject();

  return {
    ...userTokens,
    user,
  };
};

const getNewAccessToken = async (refreshToken: string) => {
  const verifiedRefreshToken = verifyToken(
    refreshToken,
    envVars.JWT_REFRESH_TOKEN_SECRET
  ) as JwtPayload;

  const isUserExist = await User.findOne({ _id: verifiedRefreshToken.userId });
  if (!isUserExist)
    throw new AppError(StatusCodes.BAD_REQUEST, "User does not exist");

  const JwtPayload = {
    userId: isUserExist._id,
    phone: isUserExist.phone,
    role: isUserExist.role,
  };
  const accessToken = generateToken(
    JwtPayload,
    envVars.JWT_ACCESS_TOKEN_SECRET,
    envVars.JWT_ACCESS_TOKEN_EXPIRES
  );
  return { accessToken };
};

export const authServices = {
  credentialLogin,
  getNewAccessToken,
};
