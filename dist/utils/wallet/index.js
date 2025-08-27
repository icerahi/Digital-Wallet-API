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
exports.performCommonTransaction = void 0;
const http_status_codes_1 = require("http-status-codes");
const AppError_1 = __importDefault(require("../../helpers/AppError"));
const transaction_interface_1 = require("../../modules/transaction/transaction.interface");
const transaction_model_1 = require("../../modules/transaction/transaction.model");
const wallet_model_1 = require("../../modules/wallet/wallet.model");
const performCommonTransaction = (transactionType, senderId, receiverId, amount) => __awaiter(void 0, void 0, void 0, function* () {
    const senderWallet = yield wallet_model_1.Wallet.findOne({ owner: senderId });
    const receiverWallet = yield wallet_model_1.Wallet.findOne({ owner: receiverId });
    if (!senderWallet)
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "Sender Wallet does not exist");
    if (!receiverWallet)
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "Receiver Wallet does not exist");
    if (receiverWallet.isBlocked)
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Receiver Wallet is blocked");
    if (senderWallet.balance < amount) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.FORBIDDEN, "Insufficient balance!");
    }
    senderWallet.balance -= amount;
    receiverWallet.balance += amount;
    yield senderWallet.save();
    yield receiverWallet.save();
    //add transaction record
    const transactionInfo = yield transaction_model_1.Transaction.create({
        type: transactionType,
        sender: senderWallet.owner,
        receiver: receiverWallet.owner,
        amount,
        status: transaction_interface_1.TransactionStatus.COMPLETED,
    });
    return transactionInfo.populate("sender receiver", "fullname phone role");
});
exports.performCommonTransaction = performCommonTransaction;
