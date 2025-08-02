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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Wallet = void 0;
const http_status_codes_1 = require("http-status-codes");
const mongoose_1 = require("mongoose");
const AppError_1 = __importDefault(require("../../helpers/AppError"));
const transaction_interface_1 = require("../transaction/transaction.interface");
const transaction_model_1 = require("../transaction/transaction.model");
const walletSchema = new mongoose_1.Schema({
    balance: { type: Number, min: 0, default: 50 },
    isBlocked: { type: Boolean, default: false },
    owner: { type: mongoose_1.Schema.Types.ObjectId, ref: "User" },
}, { timestamps: true });
//add money
walletSchema.statics.addMoney = function (userId, amount) {
    return __awaiter(this, void 0, void 0, function* () {
        const wallet = yield this.findOne({ owner: userId });
        if (!wallet) {
            throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Wallet does not exist!");
        }
        wallet.balance += amount;
        yield wallet.save();
        // add transaction record
        yield transaction_model_1.Transaction.create({
            type: transaction_interface_1.TransactionType.ADD_MONEY,
            amount,
            sender: "external_bank/credit_card",
            receiver: wallet.owner,
            status: transaction_interface_1.TransactionStatus.COMPLETED,
        });
        return wallet;
    });
};
//withdraw money
walletSchema.statics.withdrawMoney = function (userId, amount) {
    return __awaiter(this, void 0, void 0, function* () {
        const wallet = yield this.findOne({ owner: userId });
        if (!wallet) {
            throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "Wallet does not exist!");
        }
        if (wallet.balance < amount) {
            throw new AppError_1.default(http_status_codes_1.StatusCodes.FORBIDDEN, "Insufficient balance!");
        }
        wallet.balance -= amount;
        yield wallet.save();
        //add transaction record
        yield transaction_model_1.Transaction.create({
            type: transaction_interface_1.TransactionType.WITHDRAW_MONEY,
            sender: wallet.owner,
            receiver: "external_service/atm_both",
            amount,
            status: transaction_interface_1.TransactionStatus.COMPLETED,
        });
        return wallet;
    });
};
walletSchema.statics.sendMoney = function (senderId, receiverId, amount) {
    return __awaiter(this, void 0, void 0, function* () {
        const senderWallet = yield exports.Wallet.findOne({ owner: senderId });
        const receiverWallet = yield exports.Wallet.findOne({ owner: receiverId });
        if (!senderWallet)
            throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "Sender Wallet does not exist");
        if (!receiverWallet)
            throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "Receiver Wallet does not exist");
        if (receiverWallet.isBlocked)
            throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "Receiver Wallet is blocked");
        if (senderWallet.balance < amount) {
            throw new AppError_1.default(http_status_codes_1.StatusCodes.FORBIDDEN, "Insufficient balance!");
        }
        senderWallet.balance -= amount;
        receiverWallet.balance += amount;
        yield senderWallet.save();
        yield receiverWallet.save();
        //add transaction record
        yield transaction_model_1.Transaction.create({
            type: transaction_interface_1.TransactionType.SEND_MONEY,
            sender: senderWallet.owner,
            receiver: receiverWallet.owner,
            amount,
            status: transaction_interface_1.TransactionStatus.COMPLETED,
        });
        return senderWallet;
    });
};
walletSchema.statics.cashIn = function (senderId, receiverId, amount) {
    return __awaiter(this, void 0, void 0, function* () {
        const senderWallet = yield exports.Wallet.findOne({ owner: senderId });
        const receiverWallet = yield exports.Wallet.findOne({ owner: receiverId });
        if (!senderWallet)
            throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "Sender Wallet does not exist");
        if (!receiverWallet)
            throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "Receiver Wallet does not exist");
        if (receiverWallet.isBlocked)
            throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "Receiver Wallet is blocked");
        if (senderWallet.balance < amount) {
            throw new AppError_1.default(http_status_codes_1.StatusCodes.FORBIDDEN, "Insufficient balance!");
        }
        senderWallet.balance -= amount;
        receiverWallet.balance += amount;
        yield senderWallet.save();
        yield receiverWallet.save();
        //add transaction record
        const transactionInfo = yield transaction_model_1.Transaction.create({
            type: transaction_interface_1.TransactionType.CASH_IN,
            sender: senderWallet.owner,
            receiver: receiverWallet.owner,
            amount,
            status: transaction_interface_1.TransactionStatus.COMPLETED,
        });
        return transactionInfo.populate("sender receiver", "fullname phone role");
    });
};
walletSchema.statics.cashOut = function (senderId, receiverId, amount) {
    return __awaiter(this, void 0, void 0, function* () {
        const senderWallet = yield exports.Wallet.findOne({ owner: senderId });
        const receiverWallet = yield exports.Wallet.findOne({ owner: receiverId });
        if (!senderWallet)
            throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "Sender does not exist");
        if (senderWallet.isBlocked)
            throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "Sender Wallet is blocked");
        if (!receiverWallet)
            throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "Receiver does not exist");
        if (senderWallet.balance < amount) {
            throw new AppError_1.default(http_status_codes_1.StatusCodes.FORBIDDEN, "Insufficient balance!");
        }
        senderWallet.balance -= amount;
        receiverWallet.balance += amount;
        yield senderWallet.save();
        yield senderWallet.save();
        //store transaction record
        const transactionInfo = yield transaction_model_1.Transaction.create({
            type: transaction_interface_1.TransactionType.CASH_OUT,
            sender: senderWallet.owner,
            receiver: receiverWallet.owner,
            amount,
            status: transaction_interface_1.TransactionStatus.COMPLETED,
        });
        return transactionInfo.populate("sender receiver", "fullname phone role");
    });
};
exports.Wallet = (0, mongoose_1.model)("Wallet", walletSchema);
