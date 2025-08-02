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
Object.defineProperty(exports, "__esModule", { value: true });
exports.transactionControllers = void 0;
const http_status_codes_1 = require("http-status-codes");
const catchAsync_1 = require("../../utils/catchAsync");
const sendResponse_1 = require("../../utils/sendResponse");
const transaction_service_1 = require("./transaction.service");
const myTransactions = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const decodedToken = req.user;
    const query = req.query;
    const result = yield transaction_service_1.transactionServices.myTransactions(decodedToken.userId, query);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: "User Transactions retreived successfully",
        meta: result.meta,
        data: result.data,
    });
}));
const getAllTransactions = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req.query;
    const result = yield transaction_service_1.transactionServices.getAllTransactions(query);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: "User Transactions retreived successfully",
        meta: result.meta,
        data: result.data,
    });
}));
const getSingleTransaction = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const transactionId = req.params.id;
    const transaction = yield transaction_service_1.transactionServices.getSingleTransaction(transactionId);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: "Transaction retrieved successfully",
        data: transaction,
    });
}));
const updateTransactionStatus = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const transactionId = req.params.id;
    const payload = req.body;
    const result = yield transaction_service_1.transactionServices.updateTransactionStatus(transactionId, payload);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: "Transaction status changed successfully",
        data: result,
    });
}));
exports.transactionControllers = {
    myTransactions,
    getAllTransactions,
    getSingleTransaction,
    updateTransactionStatus,
};
