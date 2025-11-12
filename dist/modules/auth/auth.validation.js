"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.credentialLoginZodSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.credentialLoginZodSchema = zod_1.default.object({
    email: zod_1.default
        .string({ required_error: "Email is required!" })
        .min(11, { message: "Must required a valid email address" }),
    password: zod_1.default.string({ required_error: "Password is required!" }),
});
