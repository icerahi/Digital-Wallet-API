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
  const sender = await User.findOne({ phone: payload.sender });
  const receiver = await User.findOne({ phone: payload.receiver });

  if (!sender)
    throw new AppError(StatusCodes.NOT_FOUND, "Sender does not exist");

  if (!receiver)
    throw new AppError(StatusCodes.NOT_FOUND, "Receiver does not exist");

  if (receiver.role !== Role.USER) {
    throw new AppError(StatusCodes.BAD_REQUEST, `Receiver must be a User.`);
  }

  const updatedWallet = await Wallet.sendMoney(
    sender._id,
    receiver._id,
    payload.amount!
  );
  return updatedWallet;
};

const cashIn = async (payload: Partial<ITransaction>) => {
  const sender = await User.findOne({ phone: payload.sender });
  const receiver = await User.findOne({ phone: payload.receiver });

  if (!sender)
    throw new AppError(StatusCodes.NOT_FOUND, "Sender does not exist");

  if (!receiver) {
    throw new AppError(StatusCodes.NOT_FOUND, "Receiver does not exist");
  }
  if (receiver.role !== Role.USER) {
    throw new AppError(StatusCodes.FORBIDDEN, `Receiver must be a User.`);
  }

  const transactionInfo = await Wallet.cashIn(
    sender._id,
    receiver._id,
    payload.amount!
  );
  return transactionInfo;
};

const cashOut = async (payload: Partial<ITransaction>) => {
  const sender = await User.findOne({ phone: payload.sender });
  const receiver = await User.findOne({ phone: payload.receiver });

  if (!sender) {
    throw new AppError(StatusCodes.NOT_FOUND, "Sender does not exist");
  }
  if (!receiver) {
    throw new AppError(StatusCodes.NOT_FOUND, "Receiver does not exist");
  }
  if (sender.role !== Role.USER) {
    throw new AppError(StatusCodes.FORBIDDEN, `Sender must be a User.`);
  }

  const transactionInfo = await Wallet.cashOut(
    sender._id,
    receiver._id,
    payload.amount!
  );
  return transactionInfo;
};

const getAllWallets = async (query: Record<string, string>) => {
  const filter = query;

  const wallets = await Wallet.find(filter).populate(
    "owner",
    "fullname phone role"
  );

  const total = wallets.length;

  return {
    data: wallets,
    meta: { total },
  };
};

const getSingleWallet = async (walletId: string) => {
  const wallet = await Wallet.findById(walletId);
  if (!wallet) {
    throw new AppError(StatusCodes.NOT_FOUND, "Wallet not found");
  }

  return wallet.populate("owner", "fullname phone role");
};

const blockWallet = async (walletId: string) => {
  const wallet = await Wallet.findById(walletId);
  if (!wallet) {
    throw new AppError(StatusCodes.NOT_FOUND, "Wallet not found");
  }
  if (wallet.isBlocked) {
    throw new AppError(StatusCodes.BAD_GATEWAY, "Wallet is already blocked");
  }

  wallet.isBlocked = true;
  await wallet.save();

  return wallet;
};

const unblockWallet = async (walletId: string) => {
  const wallet = await Wallet.findById(walletId);
  if (!wallet) {
    throw new AppError(StatusCodes.NOT_FOUND, "Wallet not found");
  }
  if (!wallet.isBlocked) {
    throw new AppError(StatusCodes.BAD_GATEWAY, "Wallet is already unblocked");
  }

  wallet.isBlocked = false;
  await wallet.save();

  return wallet;
};

export const walletServices = {
  //user & agent
  myWallet,

  //user
  addMoney,
  withdrawMoney,
  sendMoney,

  //agent
  cashIn,
  cashOut,

  //admin
  getAllWallets,
  getSingleWallet,
  blockWallet,
  unblockWallet,
};
