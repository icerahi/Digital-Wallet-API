import z from "zod";
import { TransactionStatus } from "./transaction.interface";

export const UpdateTransactionStatusZodSchema = z.object({
  status: z.enum(Object.values(TransactionStatus) as [string], {
    required_error: "Valid Status is required!",
  }),
});
