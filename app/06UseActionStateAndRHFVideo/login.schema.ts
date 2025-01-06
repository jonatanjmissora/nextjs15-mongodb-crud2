import { z } from "zod";

export const loginSchema = z.object({
  first: z.string().trim().min(1, {
    message: "First name is required.",
  }),
  last: z.string().trim().min(1, {
    message: "Last name is required.",
  }),
  email: z.string().trim().email({
    message: "Invalid email address.",
  }),
});

export type LoginType = z.infer<typeof loginSchema>