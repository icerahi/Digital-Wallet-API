import { Model, Types } from "mongoose";
import { ITransaction } from "../transaction/transaction.interface";

export interface IWallet {
  owner: Types.ObjectId;
  balance: number;
  isBlocked?: boolean;
}

export interface IWalletStaticMethods extends Model<IWallet> {
  addMoney(userId: string, amount: number): Promise<IWallet>;
  withdrawMoney(userId: string, amount: number): Promise<IWallet>;
  sendMoney(payload: Partial<ITransaction>): Promise<IWallet>;
  cashIn(payload: Partial<ITransaction>): Promise<ITransaction>;
}
