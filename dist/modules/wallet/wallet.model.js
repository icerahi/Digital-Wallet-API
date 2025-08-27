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
exports.Wallet = void 0;
const mongoose_1 = require("mongoose");
const wallet_1 = require("../../utils/wallet");
const transaction_interface_1 = require("../transaction/transaction.interface");
const walletSchema = new mongoose_1.Schema({
    balance: { type: Number, min: 0, default: 50 },
    isBlocked: { type: Boolean, default: false },
    owner: { type: mongoose_1.Schema.Types.ObjectId, ref: "User" },
}, { timestamps: true });
//add money
walletSchema.statics.addMoney = function (senderId, receiverId, amount) {
    return __awaiter(this, void 0, void 0, function* () {
        const transactionInfo = (0, wallet_1.performCommonTransaction)(transaction_interface_1.TransactionType.ADD_MONEY, senderId, receiverId, amount);
        return transactionInfo;
    });
};
//withdraw money
walletSchema.statics.withdrawMoney = function (senderId, receiverId, amount) {
    return __awaiter(this, void 0, void 0, function* () {
        const transactionInfo = (0, wallet_1.performCommonTransaction)(transaction_interface_1.TransactionType.WITHDRAW_MONEY, senderId, receiverId, amount);
        return transactionInfo;
    });
};
walletSchema.statics.sendMoney = function (senderId, receiverId, amount) {
    return __awaiter(this, void 0, void 0, function* () {
        const transactionInfo = (0, wallet_1.performCommonTransaction)(transaction_interface_1.TransactionType.WITHDRAW_MONEY, senderId, receiverId, amount);
        return transactionInfo;
    });
};
walletSchema.statics.cashIn = function (senderId, receiverId, amount) {
    return __awaiter(this, void 0, void 0, function* () {
        const transactionInfo = (0, wallet_1.performCommonTransaction)(transaction_interface_1.TransactionType.CASH_IN, senderId, receiverId, amount);
        return transactionInfo;
    });
};
walletSchema.statics.cashOut = function (senderId, receiverId, amount) {
    return __awaiter(this, void 0, void 0, function* () {
        const transactionInfo = (0, wallet_1.performCommonTransaction)(transaction_interface_1.TransactionType.CASH_OUT, senderId, receiverId, amount);
        return transactionInfo;
    });
};
exports.Wallet = (0, mongoose_1.model)("Wallet", walletSchema);
