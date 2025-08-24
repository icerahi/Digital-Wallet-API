import z from "zod";

export const sendWithdrawAndCashInZodSchema = z.object({
  receiver: z.string({ invalid_type_error: "Receiver Id must be string" }),
  amount: z
    .number({ invalid_type_error: "Amount must be number" })
    .min(1, { message: "Send money amount must be positive number" }),
});

export const addMoneyAndCashOutZodSchema = z.object({
  sender: z.string({ invalid_type_error: "Sender Id must be string" }),
  amount: z
    .number({ invalid_type_error: "Amount must be number" })
    .min(1, { message: "Cash out money amount must be positive number" }),
});
