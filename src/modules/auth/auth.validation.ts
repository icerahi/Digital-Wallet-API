import z from "zod";

export const credentialLoginZodSchema = z.object({
  phone: z.string({ required_error: "Phone number is required!" }).min(11,{message:"Must required 11 digit BD phone number"}),
  password: z.string({ required_error: "Password is required!" }),
});
