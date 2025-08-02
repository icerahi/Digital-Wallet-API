"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cashOutZodSchema = exports.sendMoneyAndCashInZodSchema = exports.addMoneyZodSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.addMoneyZodSchema = zod_1.default.object({
    amount: zod_1.default
        .number({ invalid_type_error: "Amount must be number" })
        .min(1, { message: "Add money amount must be positive number" }),
});
exports.sendMoneyAndCashInZodSchema = zod_1.default.object({
    receiver: zod_1.default.string({ invalid_type_error: "Receiver Id must be string" }),
    amount: zod_1.default
        .number({ invalid_type_error: "Amount must be number" })
        .min(1, { message: "Send money amount must be positive number" }),
});
exports.cashOutZodSchema = zod_1.default.object({
    sender: zod_1.default.string({ invalid_type_error: "Sender Id must be string" }),
    amount: zod_1.default
        .number({ invalid_type_error: "Amount must be number" })
        .min(1, { message: "Cash out money amount must be positive number" }),
});
