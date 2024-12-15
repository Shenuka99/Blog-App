"use server";
// this is not for creating server component , it is for server actions

import prisma from "@/lib/db";
import { createSession, deleteSession } from "./stateless-sessions";
import { redirect } from "next/navigation";
import { hashSync } from "bcrypt-ts";
import { compare } from "bcrypt-ts/browser";
import {
  LoginFormSchema,
  LoginFormState,
  SignupFormSchema,
  SignupFormState,
} from "../../lib/definition";

export async function signup(
  state: SignupFormState,
  formData: FormData
): Promise<SignupFormState> {
  const data = Object.fromEntries(formData.entries());
  const validationFields = SignupFormSchema.safeParse(data);

  if (!validationFields.success) {
    return {
      errors: validationFields.error.flatten().fieldErrors,
    };
  }

  const { firstName, lastName, email, password } = validationFields.data;

  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (existingUser) {
    return {
      message: "Email already exists, please use a different email or login.",
    };
  }

  const hashedPassword = await hashSync(password, 10);

  try {
    let user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword,
      },
    });

    console.log(user);

    if (!user) {
      return {
        message: "An error occurred while creating your account.",
      };
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        errors: {
          _form: [error.message],
        },
      };
    } else {
      return {
        errors: {
          _form: ["Something went wrong"],
        },
      };
    }
  }

  redirect("/login");
}

export async function login(
  state: LoginFormState,
  formData: FormData
): Promise<LoginFormState> {
  const validatedFields = LoginFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });
  const errorMessage: LoginFormState = {
    message: "Invalid login credentials.",
  };

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { email, password } = validatedFields.data;

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return { message: "User not found" };
  }

  const passwordMatch = await compare(password, user.password);

  if (!passwordMatch) {
    return errorMessage;
  }

  const userId = user.id.toString();
  await createSession(userId);

  return { message: "Login successful" };
}

export async function logout() {
  await deleteSession();
}
