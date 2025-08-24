import { model, Schema } from "mongoose";
import { performCommonTransaction } from "../../utils/wallet";
import { TransactionType } from "../transaction/transaction.interface";
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
walletSchema.statics.addMoney = async function (senderId, receiverId, amount) {
  const transactionInfo = performCommonTransaction(
    TransactionType.ADD_MONEY,
    senderId,
    receiverId,
    amount
  );
  return transactionInfo;
};

//withdraw money
walletSchema.statics.withdrawMoney = async function (
  senderId,
  receiverId,
  amount
) {
  const transactionInfo = performCommonTransaction(
    TransactionType.WITHDRAW_MONEY,
    senderId,
    receiverId,
    amount
  );
  return transactionInfo;
};

walletSchema.statics.sendMoney = async function (senderId, receiverId, amount) {
  const transactionInfo = performCommonTransaction(
    TransactionType.WITHDRAW_MONEY,
    senderId,
    receiverId,
    amount
  );
  return transactionInfo;
};

walletSchema.statics.cashIn = async function (senderId, receiverId, amount) {
  const transactionInfo = performCommonTransaction(
    TransactionType.CASH_IN,
    senderId,
    receiverId,
    amount
  );
  return transactionInfo;
};

walletSchema.statics.cashOut = async function (senderId, receiverId, amount) {
  const transactionInfo = performCommonTransaction(
    TransactionType.CASH_OUT,
    senderId,
    receiverId,
    amount
  );
  return transactionInfo;
};

export const Wallet = model<IWallet, IWalletStaticMethods>(
  "Wallet",
  walletSchema
);
