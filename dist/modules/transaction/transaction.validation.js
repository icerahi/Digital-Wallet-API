"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTransactionStatusZodSchema = void 0;
const zod_1 = __importDefault(require("zod"));
const transaction_interface_1 = require("./transaction.interface");
exports.UpdateTransactionStatusZodSchema = zod_1.default.object({
    status: zod_1.default.enum(Object.values(transaction_interface_1.TransactionStatus), {
        required_error: "Valid Status is required!",
    }),
});
