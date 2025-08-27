import { StatusCodes } from "http-status-codes";
import AppError from "../../helpers/AppError";
import { ITransaction } from "../transaction/transaction.interface";
import { Role } from "../user/user.interface";
import { User } from "../user/user.model";
import { Wallet } from "./wallet.model";

const myWallet = async (userId: string) => {
  const info = await Wallet.findOne({ owner: userId }).populate(
    "owner",
    "fullname phone role agentApproval"
  );
  return info;
};

const addMoney = async (payload: Partial<ITransaction>) => {
  const sender = await User.findOne({ phone: payload.sender });
  const receiver = await User.findOne({ phone: payload.receiver });
  if (!sender)
    throw new AppError(StatusCodes.NOT_FOUND, "Sender does not exist");

  if (!receiver) {
    throw new AppError(StatusCodes.NOT_FOUND, "Receiver does not exist");
  }

  if (sender.role !== Role.AGENT) {
    throw new AppError(StatusCodes.FORBIDDEN, `Sender must be an Agent.`);
  }

  if (!sender.agentApproval) {
    throw new AppError(StatusCodes.FORBIDDEN, `Agent has been suspended`);
  }

  const transactionInfo = await Wallet.addMoney(
    sender._id,
    receiver._id,
    payload.amount as number
  );

  return transactionInfo;
};

const withdrawMoney = async (payload: Partial<ITransaction>) => {
  const sender = await User.findOne({ phone: payload.sender });
  const receiver = await User.findOne({ phone: payload.receiver });

  if (!sender)
    throw new AppError(StatusCodes.NOT_FOUND, "Sender does not exist");

  if (!receiver) {
    throw new AppError(StatusCodes.NOT_FOUND, "Receiver does not exist");
  }

  if (receiver.role !== Role.AGENT) {
    throw new AppError(StatusCodes.FORBIDDEN, `Receiver must be an Agent.`);
  }

  if (!receiver.agentApproval) {
    throw new AppError(StatusCodes.FORBIDDEN, `Agent has been suspended`);
  }

  const transactionInfo = await Wallet.withdrawMoney(
    sender._id,
    receiver._id,
    payload.amount as number
  );

  return transactionInfo;
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
    payload.amount as number
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

  if (!sender.agentApproval) {
    throw new AppError(
      StatusCodes.FORBIDDEN,
      `You have been suspended! You can not perform this operation!`
    );
  }

  const transactionInfo = await Wallet.cashIn(
    sender._id,
    receiver._id,
    payload.amount as number
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
    throw new AppError(
      StatusCodes.FORBIDDEN,
      `Cashout number doesn't associated with a user`
    );
  }

  if (!receiver.agentApproval) {
    throw new AppError(
      StatusCodes.FORBIDDEN,
      `You have been suspended! You can not perform this operation!`
    );
  }

  const transactionInfo = await Wallet.cashOut(
    sender._id,
    receiver._id,
    payload.amount as number
  );
  return transactionInfo;
};

const getAllWallets = async (query: Record<string, string>) => {
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  const filter: any = {};
  const sort = query.sort || "-createdAt";
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 10;
  const skip = (page - 1) * Number(limit);

  if (query.isBlocked) filter.isBlocked = query.isBlocked;

  if (query.role) {
    const users = await User.find({ role: query.role }, "_id");
    filter.owner = users.map((u) => u._id);
  }

  if (query.phone) {
    const user = await User.findOne({ phone: query.phone }, "_id");
    if (!user)
      throw new AppError(
        StatusCodes.NOT_FOUND,
        "Number doesn't associate with any user wallet"
      );
    filter.owner = user._id;
  }

  const wallets = await Wallet.find(filter)
    .sort(sort)
    .skip(skip)
    .limit(limit)
    .populate("owner", "fullname phone role agentApproval");

  const total = await Wallet.countDocuments(filter);
  const totalPages = Math.ceil(total / limit);

  return {
    data: wallets,
    meta: { total, limit, page, totalPages },
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
