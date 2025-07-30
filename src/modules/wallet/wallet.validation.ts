import z from "zod";

export const addMoneyZodSchema = z.object({
  amount: z
    .number({ invalid_type_error: "Amount must be number" })
    .min(1, { message: "Add money amount must be positive number" }),
});

export const sendMoneyZodSchema = z.object({
  receiver: z.string({ invalid_type_error: "Receiver Id must be string" }),
  amount: z
    .number({ invalid_type_error: "Amount must be number" })
    .min(1, { message: "Send money amount must be positive number" }),
});
