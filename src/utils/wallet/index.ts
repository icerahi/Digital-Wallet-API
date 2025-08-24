import { StatusCodes } from "http-status-codes";
import { ObjectId } from "mongoose";
import AppError from "../../helpers/AppError";
import {
  TransactionStatus,
  TransactionType,
} from "../../modules/transaction/transaction.interface";
import { Transaction } from "../../modules/transaction/transaction.model";
import { Wallet } from "../../modules/wallet/wallet.model";

export const performCommonTransaction = async (
  transactionType: TransactionType,
  senderId: ObjectId,
  receiverId: ObjectId,
  amount: number
) => {
  const senderWallet = await Wallet.findOne({ owner: senderId });
  const receiverWallet = await Wallet.findOne({ owner: receiverId });

  if (!senderWallet)
    throw new AppError(StatusCodes.NOT_FOUND, "Sender Wallet does not exist");

  if (!receiverWallet)
    throw new AppError(StatusCodes.NOT_FOUND, "Receiver Wallet does not exist");

  if (receiverWallet.isBlocked)
    throw new AppError(StatusCodes.BAD_REQUEST, "Receiver Wallet is blocked");

  if (senderWallet.balance < amount) {
    throw new AppError(StatusCodes.FORBIDDEN, "Insufficient balance!");
  }
  senderWallet.balance -= amount;
  receiverWallet.balance += amount;

  await senderWallet.save();
  await receiverWallet.save();

  //add transaction record
  const transactionInfo = await Transaction.create({
    type: transactionType,
    sender: senderWallet.owner,
    receiver: receiverWallet.owner,
    amount,
    status: TransactionStatus.COMPLETED,
  });

  return transactionInfo.populate("sender receiver", "fullname phone role");
};
