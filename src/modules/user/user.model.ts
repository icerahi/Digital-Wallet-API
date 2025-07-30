import { model, Schema } from "mongoose";
import { Wallet } from "../wallet/wallet.model";
import { IUser, Role } from "./user.interface";

const userSchema = new Schema<IUser>(
  {
    fullname: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: Object.values(Role), default: Role.USER },
    // isAgentApproved:{type:Boolean,default:true}
  },
  { timestamps: true }
);

userSchema.post("save", async (doc) => {
  if (doc) {
    const isWalletExist = await Wallet.findById(doc._id);
    if (!isWalletExist) {
      await Wallet.create({ owner: doc._id });
    }
  }
});

export const User = model<IUser>("User", userSchema);
