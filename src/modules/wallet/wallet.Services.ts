import { StatusCodes } from "http-status-codes";
import AppError from "../../helpers/AppError";
import { ITransaction } from "../transaction/transaction.interface";
import { Role } from "../user/user.interface";
import { User } from "../user/user.model";
import { Wallet } from "./wallet.model";

const myWallet = async (userId: string) => {
  const info = await Wallet.findOne({ owner: userId }).populate(
    "owner",
    "fullname phone role"
  );
  return info;
};

const addMoney = async (userId: string, amount: number) => {
  const updatedWallet = await Wallet.addMoney(userId, amount);

  return updatedWallet;
};

const withdrawMoney = async (userId: string, amount: number) => {
  const updatedWallet = await Wallet.withdrawMoney(userId, amount);

  return updatedWallet;
};

const sendMoney = async (payload: Partial<ITransaction>) => {
  const updatedWallet = await Wallet.sendMoney(payload);
  return updatedWallet;
};

const cashIn = async (payload: Partial<ITransaction>) => {
  const receiver = await User.findById(payload.receiver);
  if (!receiver) {
    throw new AppError(StatusCodes.NOT_FOUND, "Receiver does not exist");
  }
  if (receiver.role !== Role.USER) {
    throw new AppError(StatusCodes.FORBIDDEN, `Receiver must be a User.`);
  }
  const transactionInfo = await Wallet.cashIn(payload);
  return transactionInfo;
};
export const walletServices = {
  myWallet,
  addMoney,
  withdrawMoney,
  sendMoney,
  cashIn,
};
