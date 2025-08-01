"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transaction = exports.transactionSchema = void 0;
const mongoose_1 = require("mongoose");
const transaction_interface_1 = require("./transaction.interface");
exports.transactionSchema = new mongoose_1.Schema({
    type: {
        type: String,
        enum: Object.values(transaction_interface_1.TransactionType),
        required: true,
    },
    amount: { type: Number, min: 1, required: true },
    sender: {
        type: mongoose_1.Schema.Types.Mixed,
        ref: "User",
    },
    receiver: { type: mongoose_1.Schema.Types.Mixed, ref: "User" },
    status: {
        type: String,
        enum: Object.values(transaction_interface_1.TransactionStatus),
        default: transaction_interface_1.TransactionStatus.COMPLETED,
    },
}, { timestamps: true });
exports.Transaction = (0, mongoose_1.model)("Transaction", exports.transactionSchema);
