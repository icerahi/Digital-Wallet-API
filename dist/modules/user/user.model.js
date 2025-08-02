"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const wallet_model_1 = require("../wallet/wallet.model");
const user_interface_1 = require("./user.interface");
const userSchema = new mongoose_1.Schema({
    fullname: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    role: { type: String, enum: Object.values(user_interface_1.Role), default: user_interface_1.Role.USER },
    agentApproval: { type: Boolean, default: undefined },
}, { timestamps: true });
userSchema.pre("save", function (next) {
    if (this.isNew && this.role === user_interface_1.Role.AGENT) {
        this.agentApproval = true;
    }
    next();
});
userSchema;
userSchema.post("save", (doc) => __awaiter(void 0, void 0, void 0, function* () {
    if (doc) {
        if (doc.role === user_interface_1.Role.USER || doc.role === user_interface_1.Role.AGENT) {
            const isWalletExist = yield wallet_model_1.Wallet.findById(doc._id);
            if (!isWalletExist) {
                yield wallet_model_1.Wallet.create({ owner: doc._id });
            }
        }
    }
}));
exports.User = (0, mongoose_1.model)("User", userSchema);
