import z from "zod";

export const credentialLoginZodSchema = z.object({
  email: z
    .string({ required_error: "Email is required!" })
    .min(11, { message: "Must required a valid email address" }),
  password: z.string({ required_error: "Password is required!" }),
});
