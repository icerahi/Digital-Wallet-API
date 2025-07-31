import { Types } from "mongoose";

export enum Role {
  SUPERADMIN = "SUPERADMIN",
  ADMIN = "ADMIN",
  USER = "USER",
  AGENT = "AGENT",
}

export interface IUser {
  _id?: Types.ObjectId;
  fullname: string;
  phone: string;
  password: string;
  role?: Role;
  agentApproval?: boolean;
}
