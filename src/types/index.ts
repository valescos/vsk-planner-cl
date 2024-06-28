import { z } from "zod";

export type Todo = {
  id: string;
  user_email: string;
  title: string;
  progress: number;
  date: string;
};

export type AuthMode = "signup" | "signin";

export const signUpSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(8, "Пароль должен быть не менее 8 знаков"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Пароль не совпадает с подтверждением",
    path: ["confirmPassword"],
  });

export type TSignUpSchema = z.infer<typeof signUpSchema>;

export const singInSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export type TSignInSchema = z.infer<typeof signUpSchema>;
