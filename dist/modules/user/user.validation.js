"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chanagePasswordZodSchema = exports.updateUserZodSchema = exports.createUserZodSchema = void 0;
const zod_1 = require("zod");
const user_interface_1 = require("./user.interface");
exports.createUserZodSchema = zod_1.z.object({
    fullname: zod_1.z
        .string({ invalid_type_error: "Fullname must be string" })
        .min(2, { message: "Fullname atleast 2 charecter long" }),
    phone: zod_1.z.string({ invalid_type_error: "Phone number must be string" }),
    email: zod_1.z.string().email(),
    password: zod_1.z
        .string({ invalid_type_error: "Password must be string" })
        .min(8, { message: "Password must be at least 8 charecter." })
        .regex(/^(?=.*[A-Z])/, {
        message: "Password must contain at least 1 uppercase letter.",
    })
        .regex(/^(?=.*[!@#$%^&*])/, {
        message: "Password must contain at least 1 special character.",
    })
        .regex(/^(?=.*\d)/, {
        message: "Password must contain at least 1 number.",
    }),
    role: zod_1.z.enum(Object.values(user_interface_1.Role)).optional(),
});
exports.updateUserZodSchema = zod_1.z.object({
    fullname: zod_1.z
        .string({ invalid_type_error: "Fullname must be string" })
        .min(2, { message: "Fullname atleast 2 charecter long" })
        .optional(),
    phone: zod_1.z
        .string({ invalid_type_error: "Phone number must be string" })
        .optional(),
    email: zod_1.z.string().email(),
});
exports.chanagePasswordZodSchema = zod_1.z.object({
    currentPassword: zod_1.z
        .string({ invalid_type_error: "Password must be string" })
        .min(8, { message: "Password must be at least 8 charecter." })
        .regex(/^(?=.*[A-Z])/, {
        message: "Password must contain at least 1 uppercase letter.",
    })
        .regex(/^(?=.*[!@#$%^&*])/, {
        message: "Password must contain at least 1 special character.",
    })
        .regex(/^(?=.*\d)/, {
        message: "Password must contain at least 1 number.",
    }),
    newPassword: zod_1.z
        .string({ invalid_type_error: "Password must be string" })
        .min(8, { message: "Password must be at least 8 charecter." })
        .regex(/^(?=.*[A-Z])/, {
        message: "Password must contain at least 1 uppercase letter.",
    })
        .regex(/^(?=.*[!@#$%^&*])/, {
        message: "Password must contain at least 1 special character.",
    })
        .regex(/^(?=.*\d)/, {
        message: "Password must contain at least 1 number.",
    }),
});
