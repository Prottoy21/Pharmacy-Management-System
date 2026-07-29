import { z } from "zod";

export const registerSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters")
    .max(50),

  email: z.string().email("Invalid email"),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters"),

  phone: z
    .string()
    .min(11)
    .max(15),

  role: z
    .enum(["admin", "pharmacist", "staff"])
    .optional(),
});

export const loginSchema = z.object({
  email: z.string().email(),

  password: z.string().min(6),
});