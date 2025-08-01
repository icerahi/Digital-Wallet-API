import { StatusCodes } from "http-status-codes";
import { model, Schema } from "mongoose";
import AppError from "../../helpers/AppError";
import {
  TransactionStatus,
  TransactionType,
} from "../transaction/transaction.interface";
import { Transaction } from "../transaction/transaction.model";
import { IWallet, IWalletStaticMethods } from "./wallet.interface";

const walletSchema = new Schema<IWallet, IWalletStaticMethods>(
  {
    balance: { type: Number, min: 0, default: 50 },
    isBlocked: { type: Boolean, default: false },
    owner: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

//add money
walletSchema.statics.addMoney = async function (userId, amount) {
  const wallet = await this.findOne({ owner: userId });
  if (!wallet) {
    throw new AppError(StatusCodes.BAD_REQUEST, "Wallet does not exist!");
  }
  wallet.balance += amount;
  await wallet.save();
  // add transaction record
  await Transaction.create({
    type: TransactionType.ADD_MONEY,
    amount,
    sender: "external_bank/credit_card",
    receiver: wallet.owner,

    status: TransactionStatus.COMPLETED,
  });

  return wallet;
};

//withdraw money
walletSchema.statics.withdrawMoney = async function (
  userId: string,
  amount: number
) {
  const wallet = await this.findOne({ owner: userId });
  if (!wallet) {
    throw new AppError(StatusCodes.NOT_FOUND, "Wallet does not exist!");
  }
  if (wallet.balance < amount) {
    throw new AppError(StatusCodes.FORBIDDEN, "Insufficient balance!");
  }
  wallet.balance -= amount;
  await wallet.save();

  //add transaction record
  await Transaction.create({
    type: TransactionType.WITHDRAW_MONEY,
    sender: wallet.owner,
    receiver: "external_service/atm_both",
    amount,
    status: TransactionStatus.COMPLETED,
  });

  return wallet;
};

walletSchema.statics.sendMoney = async function (senderId, receiverId, amount) {
  const senderWallet = await Wallet.findOne({ owner: senderId });
  const receiverWallet = await Wallet.findOne({ owner: receiverId });

  if (!senderWallet)
    throw new AppError(StatusCodes.NOT_FOUND, "Sender Wallet does not exist");

  if (!receiverWallet)
    throw new AppError(StatusCodes.NOT_FOUND, "Receiver Wallet does not exist");

  if (receiverWallet.isBlocked)
    throw new AppError(StatusCodes.NOT_FOUND, "Receiver Wallet is blocked");

  if (senderWallet.balance < amount) {
    throw new AppError(StatusCodes.FORBIDDEN, "Insufficient balance!");
  }

  senderWallet.balance -= amount;
  receiverWallet.balance += amount;

  await senderWallet.save();
  await receiverWallet.save();

  //add transaction record
  await Transaction.create({
    type: TransactionType.SEND_MONEY,
    sender: senderWallet.owner,
    receiver: receiverWallet.owner,
    amount,
    status: TransactionStatus.COMPLETED,
  });

  return senderWallet;
};

walletSchema.statics.cashIn = async function (senderId, receiverId, amount) {
  const senderWallet = await Wallet.findOne({ owner: senderId });
  const receiverWallet = await Wallet.findOne({ owner: receiverId });

  if (!senderWallet)
    throw new AppError(StatusCodes.NOT_FOUND, "Sender Wallet does not exist");

  if (!receiverWallet)
    throw new AppError(StatusCodes.NOT_FOUND, "Receiver Wallet does not exist");

  if (receiverWallet.isBlocked)
    throw new AppError(StatusCodes.NOT_FOUND, "Receiver Wallet is blocked");

  if (senderWallet.balance < amount) {
    throw new AppError(StatusCodes.FORBIDDEN, "Insufficient balance!");
  }
  senderWallet.balance -= amount;
  receiverWallet.balance += amount;

  await senderWallet.save();
  await receiverWallet.save();

  //add transaction record
  const transactionInfo = await Transaction.create({
    type: TransactionType.CASH_IN,
    sender: senderWallet.owner,
    receiver: receiverWallet.owner,
    amount,
    status: TransactionStatus.COMPLETED,
  });

  return transactionInfo.populate("sender receiver", "fullname phone role");
};

walletSchema.statics.cashOut = async function (senderId, receiverId, amount) {
  const senderWallet = await Wallet.findOne({ owner: senderId });
  const receiverWallet = await Wallet.findOne({ owner: receiverId });

  if (!senderWallet)
    throw new AppError(StatusCodes.NOT_FOUND, "Sender does not exist");

  if (senderWallet.isBlocked)
    throw new AppError(StatusCodes.NOT_FOUND, "Sender Wallet is blocked");

  if (!receiverWallet)
    throw new AppError(StatusCodes.NOT_FOUND, "Receiver does not exist");

  if (senderWallet.balance < amount) {
    throw new AppError(StatusCodes.FORBIDDEN, "Insufficient balance!");
  }

  senderWallet.balance -= amount;
  receiverWallet.balance += amount;
  await senderWallet.save();
  await senderWallet.save();

  //store transaction record
  const transactionInfo = await Transaction.create({
    type: TransactionType.CASH_OUT,
    sender: senderWallet.owner,
    receiver: receiverWallet.owner,
    amount,
    status: TransactionStatus.COMPLETED,
  });

  return transactionInfo.populate("sender receiver", "fullname phone role");
};

export const Wallet = model<IWallet, IWalletStaticMethods>(
  "Wallet",
  walletSchema
);
