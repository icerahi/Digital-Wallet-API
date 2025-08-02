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
exports.walletServices = void 0;
const http_status_codes_1 = require("http-status-codes");
const AppError_1 = __importDefault(require("../../helpers/AppError"));
const user_interface_1 = require("../user/user.interface");
const user_model_1 = require("../user/user.model");
const wallet_model_1 = require("./wallet.model");
const myWallet = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const info = yield wallet_model_1.Wallet.findOne({ owner: userId }).populate("owner", "fullname phone role");
    return info;
});
const addMoney = (userId, amount) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedWallet = yield wallet_model_1.Wallet.addMoney(userId, amount);
    return updatedWallet;
});
const withdrawMoney = (userId, amount) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedWallet = yield wallet_model_1.Wallet.withdrawMoney(userId, amount);
    return updatedWallet;
});
const sendMoney = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const sender = yield user_model_1.User.findOne({ phone: payload.sender });
    const receiver = yield user_model_1.User.findOne({ phone: payload.receiver });
    if (!sender)
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "Sender does not exist");
    if (!receiver)
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "Receiver does not exist");
    if (receiver.role !== user_interface_1.Role.USER) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, `Receiver must be a User.`);
    }
    const updatedWallet = yield wallet_model_1.Wallet.sendMoney(sender._id, receiver._id, payload.amount);
    return updatedWallet;
});
const cashIn = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const sender = yield user_model_1.User.findOne({ phone: payload.sender });
    const receiver = yield user_model_1.User.findOne({ phone: payload.receiver });
    if (!sender)
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "Sender does not exist");
    if (!receiver) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "Receiver does not exist");
    }
    if (receiver.role !== user_interface_1.Role.USER) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.FORBIDDEN, `Receiver must be a User.`);
    }
    const transactionInfo = yield wallet_model_1.Wallet.cashIn(sender._id, receiver._id, payload.amount);
    return transactionInfo;
});
const cashOut = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const sender = yield user_model_1.User.findOne({ phone: payload.sender });
    const receiver = yield user_model_1.User.findOne({ phone: payload.receiver });
    if (!sender) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "Sender does not exist");
    }
    if (!receiver) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "Receiver does not exist");
    }
    if (sender.role !== user_interface_1.Role.USER) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.FORBIDDEN, `Sender must be a User.`);
    }
    const transactionInfo = yield wallet_model_1.Wallet.cashOut(sender._id, receiver._id, payload.amount);
    return transactionInfo;
});
const getAllWallets = (query) => __awaiter(void 0, void 0, void 0, function* () {
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    const filter = {};
    const sort = query.sort || "-createdAt";
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;
    const skip = (page - 1) * Number(limit);
    if (query.isBlocked)
        filter.isBlocked = Boolean(query.isBlocked);
    if (query.phone) {
        const user = yield user_model_1.User.findOne({ phone: query.phone }, "_id");
        if (!user)
            throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "Number doesn't associate with any user wallet");
        filter.owner = user._id;
    }
    const wallets = yield wallet_model_1.Wallet.find(filter)
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .populate("owner", "fullname phone role");
    const total = yield wallet_model_1.Wallet.countDocuments(filter);
    const totalPages = Math.ceil(total / limit);
    return {
        data: wallets,
        meta: { total, limit, page, totalPages },
    };
});
const getSingleWallet = (walletId) => __awaiter(void 0, void 0, void 0, function* () {
    const wallet = yield wallet_model_1.Wallet.findById(walletId);
    if (!wallet) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "Wallet not found");
    }
    return wallet.populate("owner", "fullname phone role");
});
const blockWallet = (walletId) => __awaiter(void 0, void 0, void 0, function* () {
    const wallet = yield wallet_model_1.Wallet.findById(walletId);
    if (!wallet) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "Wallet not found");
    }
    if (wallet.isBlocked) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_GATEWAY, "Wallet is already blocked");
    }
    wallet.isBlocked = true;
    yield wallet.save();
    return wallet;
});
const unblockWallet = (walletId) => __awaiter(void 0, void 0, void 0, function* () {
    const wallet = yield wallet_model_1.Wallet.findById(walletId);
    if (!wallet) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "Wallet not found");
    }
    if (!wallet.isBlocked) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_GATEWAY, "Wallet is already unblocked");
    }
    wallet.isBlocked = false;
    yield wallet.save();
    return wallet;
});
exports.walletServices = {
    //user & agent
    myWallet,
    //user
    addMoney,
    withdrawMoney,
    sendMoney,
    //agent
    cashIn,
    cashOut,
    //admin
    getAllWallets,
    getSingleWallet,
    blockWallet,
    unblockWallet,
};
