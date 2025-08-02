"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.credentialLoginZodSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.credentialLoginZodSchema = zod_1.default.object({
    phone: zod_1.default.string({ required_error: "Phone number is required!" }).min(11, { message: "Must required 11 digit BD phone number" }),
    password: zod_1.default.string({ required_error: "Password is required!" }),
});
