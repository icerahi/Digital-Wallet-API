"use strict";
/* eslint-disable @typescript-eslint/no-unused-vars */
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
exports.walletControllers = void 0;
const http_status_codes_1 = require("http-status-codes");
const AppError_1 = __importDefault(require("../../helpers/AppError"));
const catchAsync_1 = require("../../utils/catchAsync");
const sendResponse_1 = require("../../utils/sendResponse");
const wallet_Services_1 = require("./wallet.Services");
const myWallet = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const decodedToken = req.user;
    const info = yield wallet_Services_1.walletServices.myWallet(decodedToken.userId);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: "User Wallet retrieved successfully",
        data: info,
    });
}));
const addMoney = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const decodedToken = req.user;
    const { amount } = req.body;
    const wallet = yield wallet_Services_1.walletServices.addMoney(decodedToken.userId, amount);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: "Money added successfully",
        data: wallet,
    });
}));
const withdrawMoney = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const decodedToken = req.user;
    const { amount } = req.body;
    const wallet = yield wallet_Services_1.walletServices.withdrawMoney(decodedToken.userId, amount);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: "Money withdraw successfully",
        data: wallet,
    });
}));
const sendMoney = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const decodedToken = req.user;
    const payload = {
        sender: decodedToken.phone,
        receiver: req.body.receiver,
        amount: req.body.amount,
    };
    if (payload.sender === payload.receiver) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.FORBIDDEN, "Sender and Receiver can be same. Choose a valid receiver.");
    }
    const wallet = yield wallet_Services_1.walletServices.sendMoney(payload);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: "Send money successfully",
        data: wallet,
    });
}));
const cashIn = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const decodedToken = req.user;
    const payload = {
        sender: decodedToken.phone,
        receiver: req.body.receiver,
        amount: req.body.amount,
    };
    const transactionInfo = yield wallet_Services_1.walletServices.cashIn(payload);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: "Cash-in successfully",
        data: transactionInfo,
    });
}));
const cashOut = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const decodedToken = req.user;
    const payload = {
        sender: req.body.sender,
        receiver: decodedToken.phone,
        amount: req.body.amount,
    };
    const transactionInfo = yield wallet_Services_1.walletServices.cashOut(payload);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: "Cash-out successfully",
        data: transactionInfo,
    });
}));
const getAllWallets = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req.query;
    const result = yield wallet_Services_1.walletServices.getAllWallets(query);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: "Retrieved All wallets successfully",
        meta: result.meta,
        data: result.data,
    });
}));
const getSingleWallet = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const walletId = req.params.id;
    const wallet = yield wallet_Services_1.walletServices.getSingleWallet(walletId);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: "Wallet retrieved successfully",
        data: wallet,
    });
}));
const blockWallet = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const walletId = req.params.id;
    const updatedWallet = yield wallet_Services_1.walletServices.blockWallet(walletId);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: "Wallet blocked successfully",
        data: updatedWallet,
    });
}));
const unblockWallet = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const walletId = req.params.id;
    const updatedWallet = yield wallet_Services_1.walletServices.unblockWallet(walletId);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: "Wallet unblocked successfully",
        data: updatedWallet,
    });
}));
exports.walletControllers = {
    myWallet,
    addMoney,
    withdrawMoney,
    sendMoney,
    cashIn,
    cashOut,
    getAllWallets,
    getSingleWallet,
    blockWallet,
    unblockWallet,
};
