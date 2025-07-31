import { model, Schema } from "mongoose";
import { Wallet } from "../wallet/wallet.model";
import { IUser, Role } from "./user.interface";

const userSchema = new Schema<IUser>(
  {
    fullname: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    role: { type: String, enum: Object.values(Role), default: Role.USER },
    agentApproval: { type: Boolean, default: undefined },
  },
  { timestamps: true }
);

userSchema.pre("save", function (next) {
  if (this.role !== Role.AGENT) {
    this.agentApproval = undefined;
  } else {
    this.agentApproval = true; //agent approval true by default
  }
  next();
});

userSchema.post("save", async (doc) => {
  if (doc) {
    if (doc.role === Role.USER || doc.role === Role.AGENT) {
      const isWalletExist = await Wallet.findById(doc._id);
      if (!isWalletExist) {
        await Wallet.create({ owner: doc._id });
      }
    }
  }
});

export const User = model<IUser>("User", userSchema);
