import { z } from "zod";
import { Role } from "./user.interface";

export const createUserZodSchema = z.object({
  fullname: z
    .string({ invalid_type_error: "Fullname must be string" })
    .min(2, { message: "Fullname atleast 2 charecter long" }),
  phone: z.string({ invalid_type_error: "Phone number must be string" }),
  email: z.string().email(),
  password: z
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
  role: z.enum(Object.values(Role) as [string]).optional(),
});

export const updateUserZodSchema = z.object({
  fullname: z
    .string({ invalid_type_error: "Fullname must be string" })
    .min(2, { message: "Fullname atleast 2 charecter long" })
    .optional(),
  phone: z
    .string({ invalid_type_error: "Phone number must be string" })
    .optional(),
  email: z.string().email(),
});

export const chanagePasswordZodSchema = z.object({
  currentPassword: z
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

  newPassword: z
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
