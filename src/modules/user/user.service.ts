/* eslint-disable @typescript-eslint/no-unused-vars */

import bcrypt from "bcryptjs";
import { StatusCodes } from "http-status-codes";
import { envVars } from "../../config/env";
import AppError from "../../helpers/AppError";
import { IUser, Role } from "./user.interface";
import { User } from "./user.model";

const register = async (payload: IUser) => {
  const { phone, password, ...rest } = payload;

  const isUserExist = await User.findOne({ phone });
  if (isUserExist)
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "User already exist with the Phone Number"
    );

  const hashedPassword = await bcrypt.hash(
    password,
    Number(envVars.BCRYPT_SALT_ROUND)
  );

  const user = await User.create({ phone, password: hashedPassword, ...rest });
  const { password: pass, ...userInfo } = user.toObject();
  return userInfo;
};

const getAllUsers = async (query: Record<string, string>) => {
  const filter = query;
  const sort = query.sort || "-createdAt";
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 10;
  const skip = (page - 1) * Number(limit);

  const users = await User.find(filter).sort(sort).skip(skip).limit(limit);

  const total = await User.countDocuments(filter);
  const totalPages = Math.ceil(total / limit);
  return { data: users, meta: { total, limit, page, totalPages } };
};

const getSingleUser = async (userId: string) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, "User not found");
  }

  return user;
};

const suspendAgent = async (userId: string) => {
  const user = await User.findById(userId);

  if (!user) throw new AppError(StatusCodes.NOT_FOUND, "User not found");

  if (user.role !== Role.AGENT)
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "User not registered as an Agent"
    );

  if (!user.agentApproval)
    throw new AppError(StatusCodes.BAD_REQUEST, "Agent is already suspended");

  user.agentApproval = false;

  await user.save();

  return user;
};

const approveAgent = async (userId: string) => {
  const user = await User.findById(userId);
  if (!user) throw new AppError(StatusCodes.NOT_FOUND, "User not found");

  if (user.role !== Role.AGENT)
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "User not registered as an Agent"
    );

  if (user.agentApproval)
    throw new AppError(StatusCodes.BAD_REQUEST, "Agent is already Approved");

  user.agentApproval = true;

  await user.save();

  return user;
};
export const userServices = {
  register,
  getAllUsers,
  getSingleUser,
  approveAgent,
  suspendAgent,
};
