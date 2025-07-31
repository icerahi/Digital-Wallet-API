import { StatusCodes } from "http-status-codes";
import mongoose from "mongoose";
import AppError from "../../helpers/AppError";
import { ITransaction } from "./transaction.interface";
import { Transaction } from "./transaction.model";

const myTransactions = async (
  userId: string,
  query: Record<string, string>
) => {
  const filter = query;
  const currentUserId = new mongoose.Types.ObjectId(userId);
  const transactions = await Transaction.find({
    $or: [{ sender: currentUserId }, { receiver: currentUserId }],
  });

  console.log(transactions);

  const total = transactions.length;

  return {
    data: transactions,
    meta: {
      total,
    },
  };
};

const getAllTransactions = async (query: Record<string, string>) => {
  const filter = query;

  const result = await Transaction.find(filter);
  const total = result.length;

  return {
    data: result,
    meta: { total },
  };
};

const getSingleTransaction = async (transactionId: string) => {
  const transaction = await Transaction.findById(transactionId);
  if (!transaction) {
    throw new AppError(StatusCodes.NOT_FOUND, "Transaction not found");
  }

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

  transaction.status = payload.status!;
  await transaction.save();

  return transaction;
};

export const transactionServices = {
  myTransactions,
  getAllTransactions,
  getSingleTransaction,
  updateTransactionStatus,
};
