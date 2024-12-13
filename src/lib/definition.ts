import { z } from "zod";

export const postSchema = z.object({
  title: z.string().min(3).max(255),
  body: z.string().min(10).max(4000),
});

export const LoginFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email." }),
  password: z.string().min(1, { message: "Password field must not be empty." }),
});

export const SignupFormSchema = z
  .object({
    firstName: z
      .string()
      .min(2, { message: "First Name must be at least 2 characters long." })
      .trim(),
    lastName: z
      .string()
      .min(2, { message: "Last Name must be at least 2 characters long." })
      .trim(),
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z
      .string()
      .min(6, "Password must be at least 6 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type SignupFormState =
  | {
      errors?: {
        firstName?: string[];
        lastName?: string[];
        email?: string[];
        password?: string[];
        confirmPassword?: string[];
        _form?: string[];
      };
      message?: string;
    }
  | undefined;

export type LoginFormState =
  | {
      errors?: {
        email?: string[];
        password?: string[];
        _form?: string[];
      };
      message?: string;
    }
  | undefined;

export type PostFormState =
  | {
      errors?: {
        title?: string[];
        content?: string[];
        _form?: string[];
      };
      message?: string;
    }
  | undefined
  | null;

export type SessionPayload = {
  userId: string | number;
  expiresAt: Date;
};
