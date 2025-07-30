import mongoose from "mongoose";
import { Transaction } from "./transaction.model";

const myTransactions = async (userId: string) => {
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

export const transactionServices = {
  myTransactions,
};
