import { Model, Types } from "mongoose";
import { ITransaction } from "../transaction/transaction.interface";

export interface IWallet {
  owner: Types.ObjectId;
  balance: number;
  isBlocked?: boolean;
}

export interface IWalletStaticMethods extends Model<IWallet> {
  addMoney(
    sender: Types.ObjectId,
    receiver: Types.ObjectId,
    amount: number
  ): Promise<IWallet>;
  withdrawMoney(
    sender: Types.ObjectId,
    receiver: Types.ObjectId,
    amount: number
  ): Promise<IWallet>;
  sendMoney(
    sender: Types.ObjectId,
    receiver: Types.ObjectId,
    amount: number
  ): Promise<IWallet>;
  cashIn(
    sender: Types.ObjectId,
    receiver: Types.ObjectId,
    amount: number
  ): Promise<ITransaction>;
  cashOut(
    sender: Types.ObjectId,
    receiver: Types.ObjectId,
    amount: number
  ): Promise<ITransaction>;
}

export interface IWalletFilter {
  isBlocked?: boolean;
}
