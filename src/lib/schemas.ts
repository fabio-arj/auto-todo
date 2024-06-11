import { z } from "zod";

export const SignInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4),
});

export const SignUpSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4),
});

export const TaskSchema = z.object({
  description: z.string(),
  id: z.string(),
});
