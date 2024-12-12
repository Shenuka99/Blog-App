"use server";
// this is not for creating server component , it is for server actions

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import type { Post, User } from "@prisma/client";
import { z } from "zod";
import {
  createSession,
  deleteSession,
  verifySession,
} from "./stateless-sessions";
import { notFound, redirect } from "next/navigation";
import { hashSync } from "bcrypt-ts";
import { compare, compareSync } from "bcrypt-ts/browser";

const postSchema = z.object({
  title: z.string().min(3).max(255),
  body: z.string().min(10).max(4000),
});

const LoginFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email." }),
  password: z.string().min(1, { message: "Password field must not be empty." }),
});

type PostFormState =
  | {
      errors?: {
        title?: string[];
        content?: string[];
        _form?: string[];
      };
    }
  | undefined;

const userSchema = z
  .object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
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

type ActionResult =
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

export async function handleRegister(
  prevState: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  const data = Object.fromEntries(formData.entries());

  const result = userSchema.safeParse(data);

  console.log("result1", result);

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  const { firstName, lastName, email, password } = result.data;

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

  try {
    const hashedPassword = await hashSync(password, 10);

    let result = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword,
      },
    });

    console.log("result2", result);

    if (!result) {
      return {
        message: "An error occurred while creating your account.",
      };
    }

    // 4. Create a session for the user
    const userId = result.id.toString();
    const sessionId = await createSession(userId);
    //   console.log(sessionId)

    // redirect('/login');
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
}

export async function login(
  state: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  const validatedFields = LoginFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });
  const errorMessage: ActionResult = { message: "Invalid login credentials." };

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { email, password } = validatedFields.data;

  const user = await prisma.user.findUnique({
    where: { email },
  });

  // If user is not found, return early
  if (!user) {
    return errorMessage;
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
  deleteSession();
  redirect('/login')
}

export async function createPost(
  prevState: PostFormState,
  formData: FormData
): Promise<PostFormState> {
  console.log(formData);

  const result = postSchema.safeParse({
    title: formData.get("title"),
    body: formData.get("body"),
  });

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  const { title, body } = result.data;

  const data = await verifySession();

  if (data.userId) {
    const res = await prisma.post.create({
      data: {
        title,
        body,
        user: {
          connect: { id: +data.userId },
        },
      },
    });
  }

  revalidatePath("/posts");
  redirect("/posts");
}

export async function deletePost(postId: string) {
  try {
    await prisma.post.delete({
      where: {
        id: +postId,
      },
    });
    return { success: true };
  } catch (error) {
    //   console.error('Failed to delete post:', error);
    return { success: false, error: "Failed to delete post" };
  }
}

export async function updatePost(
  postId: string,
  formState: PostFormState,
  formData: FormData
): Promise<PostFormState> {
  const result = postSchema.safeParse({
    title: formData.get("title"),
    body: formData.get("body"),
  });

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  let post: Post;
  try {
    post = await prisma.post.update({
      where: {
        id: +postId,
      },
      data: {
        title: result.data.title,
        body: result.data.body,
      },
    });
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

  revalidatePath("/");
  redirect("/");
}

export async function fetchPosts(): Promise<Post[]> {
  return await prisma.post.findMany({
    orderBy: [
      {
        updatedAt: "desc",
      },
    ],
  });
}

export async function fetchPostById(id: string): Promise<Post | null> {
  const post = await prisma.post.findFirst({
    where: {
      id: +id,
    },
  });

  if (!post) {
    notFound();
  }

  return post;
}
