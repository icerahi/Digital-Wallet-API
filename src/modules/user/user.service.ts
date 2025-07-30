import bcrypt from "bcryptjs";
import { StatusCodes } from "http-status-codes";
import { envVars } from "../../config/env";
import AppError from "../../helpers/AppError";
import { IUser } from "./user.interface";
import { User } from "./user.model";

const register = async (payload: IUser) => {
  const { phone, password, ...rest } = payload;

  const isUserExist = await User.findOne({ phone });
  if (isUserExist)
    throw new AppError(StatusCodes.BAD_REQUEST, "User already exist");

  const hashedPassword = await bcrypt.hash(
    password,
    Number(envVars.BCRYPT_SALT_ROUND)
  );

  const user = await User.create({ phone, password: hashedPassword, ...rest });

  const { password: pass, ...userInfo } = user;

  return userInfo;
};

export const userServices = { register };
