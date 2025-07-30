import { Types } from "mongoose";

export enum TransactionType {
  ADD_MONEY = "ADD_MONEY",
  WITHDRAW_MONEY = "WITHDRAW_MONEY",
  SEND_MONEY = "SEND_MONEY",
  CASH_IN = "CASH_IN",
  CASH_OUT = "CASH_OUT",
}

export enum TransactionStatus {
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
  REVERSED = "REVERSED",
}

export interface ITransaction {
  type: TransactionType;
  amount: number;
  sender: Types.ObjectId;
  receiver: Types.ObjectId;
  status: TransactionStatus;
}
