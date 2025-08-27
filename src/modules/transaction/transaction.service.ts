/* eslint-disable @typescript-eslint/no-explicit-any */

import { StatusCodes } from "http-status-codes";
import mongoose, { isValidObjectId } from "mongoose";
import AppError from "../../helpers/AppError";
import { User } from "../user/user.model";
import { ITransaction, TransactionStatus } from "./transaction.interface";
import { Transaction } from "./transaction.model";

const myTransactions = async (
  userId: string,
  query: Record<string, string>
) => {
  const currentUserId = new mongoose.Types.ObjectId(userId);

  const filter: any = {
    $or: [{ sender: currentUserId }, { receiver: currentUserId }],
  };
  if (query.type) filter.type = query.type;

  if (query.from && query.to) {
    let start = new Date(query.from);
    start.setHours(0, 0, 0, 0);

    let end = new Date(query.to);
    end.setHours(23, 59, 59, 999);
    filter.createdAt = { $gte: start, $lte: end };
  }

  const sort = query.sort || "-createdAt";
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 10;
  const skip = (page - 1) * Number(limit);

  const transactions = await Transaction.find(filter)
    .sort(sort)
    .skip(skip)
    .limit(limit);

  for (const tx of transactions) {
    if (isValidObjectId(tx.sender))
      await tx.populate("sender", "fullname phone role");
    if (isValidObjectId(tx.receiver))
      await tx.populate("receiver", "fullname phone role");
  }

  const total = await Transaction.countDocuments(filter);
  const totalPages = Math.ceil(total / limit);

  return {
    data: transactions,
    meta: {
      total,
      limit,
      page,
      totalPages,
    },
  };
};

const getAllTransactions = async (query: Record<string, string>) => {
  const filter: any = { $or: [] };

  if (query.type) filter.type = query.type;
  if (query.status) filter.status = query.status;

  if (query.from && query.to) {
    let start = new Date(query.from);
    start.setHours(0, 0, 0, 0);

    let end = new Date(query.to);
    end.setHours(23, 59, 59, 999);
    filter.createdAt = { $gte: start, $lte: end };
  }

  if (query.phone) {
    const user = await User.findOne({ phone: query.phone }, "_id");
    if (!user)
      throw new AppError(
        StatusCodes.NOT_FOUND,
        "Number doesn't associate with any user wallet"
      );

    filter.$or.push({ sender: user._id });
    filter.$or.push({ receiver: user._id });
  }

  const sort = query.sort || "-createdAt";
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 10;
  const skip = (page - 1) * Number(limit);

  const result = await Transaction.find(filter)
    .sort(sort)
    .skip(skip)
    .limit(limit);

  for (const tx of result) {
    if (isValidObjectId(tx.sender))
      await tx.populate("sender", "fullname phone role");
    if (isValidObjectId(tx.receiver))
      await tx.populate("receiver", "fullname phone role");
  }
  const total = await Transaction.countDocuments(filter);
  const totalPages = Math.ceil(total / limit);

  return {
    data: result,
    meta: { total, limit, page, totalPages },
  };
};

const getSingleTransaction = async (transactionId: string) => {
  const transaction = await Transaction.findById(transactionId);
  if (!transaction) {
    throw new AppError(StatusCodes.NOT_FOUND, "Transaction not found");
  }

  if (isValidObjectId(transaction.sender))
    await transaction.populate("sender", "fullname phone role");
  if (isValidObjectId(transaction.receiver))
    await transaction.populate("receiver", "fullname phone role");

  return transaction; //.populate("sender receiver", "fullname phone role");
};

const updateTransactionStatus = async (
  transactionId: string,
  payload: Partial<ITransaction>
) => {
  const transaction = await Transaction.findById(transactionId);
  if (!transaction) {
    throw new AppError(StatusCodes.NOT_FOUND, "Transaction does not exist");
  }

  transaction.status = payload.status as TransactionStatus;
  await transaction.save();

  return transaction;
};

export const transactionServices = {
  myTransactions,
  getAllTransactions,
  getSingleTransaction,
  updateTransactionStatus,
};
