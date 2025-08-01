"use strict";
/* eslint-disable @typescript-eslint/no-explicit-any */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
exports.transactionServices = void 0;
const http_status_codes_1 = require("http-status-codes");
const mongoose_1 = __importStar(require("mongoose"));
const AppError_1 = __importDefault(require("../../helpers/AppError"));
const user_model_1 = require("../user/user.model");
const transaction_model_1 = require("./transaction.model");
const myTransactions = (userId, query) => __awaiter(void 0, void 0, void 0, function* () {
    const currentUserId = new mongoose_1.default.Types.ObjectId(userId);
    const filter = {
        $or: [{ sender: currentUserId }, { receiver: currentUserId }],
    };
    if (query.type)
        filter.type = query.type;
    const sort = query.sort || "-createdAt";
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;
    const skip = (page - 1) * Number(limit);
    const transactions = yield transaction_model_1.Transaction.find(filter)
        .sort(sort)
        .skip(skip)
        .limit(limit);
    for (const tx of transactions) {
        if ((0, mongoose_1.isValidObjectId)(tx.sender))
            yield tx.populate("sender", "fullname phone role");
        if ((0, mongoose_1.isValidObjectId)(tx.receiver))
            yield tx.populate("receiver", "fullname phone role");
    }
    const total = yield transaction_model_1.Transaction.countDocuments(filter);
    const totalPages = Math.ceil(total / limit);
    return {
        data: transactions,
        meta: {
            total,
            limit,
            page,
            totalPages,
        },
    };
});
const getAllTransactions = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const filter = {};
    if (query.type)
        filter.type = query.type;
    if (query.sender) {
        const user = yield user_model_1.User.findOne({ phone: query.sender }, "_id");
        if (!user)
            throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "Number doesn't associate with any user wallet");
        filter.sender = user._id;
    }
    if (query.receiver) {
        const user = yield user_model_1.User.findOne({ phone: query.receiver }, "_id");
        if (!user)
            throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "Number doesn't associate with any user wallet");
        filter.receiver = user._id;
    }
    const sort = query.sort || "-createdAt";
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;
    const skip = (page - 1) * Number(limit);
    const result = yield transaction_model_1.Transaction.find(filter)
        .sort(sort)
        .skip(skip)
        .limit(limit);
    for (const tx of result) {
        if ((0, mongoose_1.isValidObjectId)(tx.sender))
            yield tx.populate("sender", "fullname phone role");
        if ((0, mongoose_1.isValidObjectId)(tx.receiver))
            yield tx.populate("receiver", "fullname phone role");
    }
    const total = yield transaction_model_1.Transaction.countDocuments(filter);
    const totalPages = Math.ceil(total / limit);
    return {
        data: result,
        meta: { total, limit, page, totalPages },
    };
});
const getSingleTransaction = (transactionId) => __awaiter(void 0, void 0, void 0, function* () {
    const transaction = yield transaction_model_1.Transaction.findById(transactionId);
    if (!transaction) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "Transaction not found");
    }
    if ((0, mongoose_1.isValidObjectId)(transaction.sender))
        yield transaction.populate("sender", "fullname phone role");
    if ((0, mongoose_1.isValidObjectId)(transaction.receiver))
        yield transaction.populate("receiver", "fullname phone role");
    return transaction; //.populate("sender receiver", "fullname phone role");
});
const updateTransactionStatus = (transactionId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const transaction = yield transaction_model_1.Transaction.findById(transactionId);
    if (!transaction) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "Transaction does not exist");
    }
    transaction.status = payload.status;
    yield transaction.save();
    return transaction;
});
exports.transactionServices = {
    myTransactions,
    getAllTransactions,
    getSingleTransaction,
    updateTransactionStatus,
};
