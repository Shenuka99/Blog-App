"use server";

import { cookies } from "next/headers";
import { decrypt } from "@/app/actions/stateless-sessions";
import { cache } from "react";
import { notFound, redirect } from "next/navigation";
import { PostFormState, postSchema } from "@/lib/definition";
import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import { Post, User } from "@prisma/client";

export const verifySession = cache(async () => {
  const cookie = (await cookies()).get("session")?.value;
  const session = await decrypt(cookie);

  if (!session?.userId) {
    redirect("/login");
  }

  return { isAuth: true, userId: session.userId };
});

export async function createPost(
  prevState: PostFormState,
  formData: FormData
): Promise<PostFormState> {
  const session = await verifySession();
  if (!session) return null;

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

  if (session.userId) {
    const res = await prisma.post.create({
      data: {
        title,
        body,
        user: {
          connect: { id: +session.userId },
        },
      },
    });
  }

  revalidatePath("/posts");
  redirect("/posts");
}

export async function deletePost(postId: string) {
  const session = await verifySession();
  if (!session) return null;

  try {
    const res = await prisma.post.delete({
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
  state: PostFormState,
  formData: FormData
): Promise<PostFormState> {
  const session = await verifySession();
  if (!session) return null;

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

export async function fetchAllPosts(): Promise<Post[] | null> {
  const session = await verifySession();
  if (!session) return null;

  return await prisma.post.findMany({
    orderBy: [
      {
        updatedAt: "desc",
      },
    ],
  });
}

export async function fetchPostById(id: string): Promise<Post | null> {
  const session = await verifySession();
  if (!session) return null;

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

export async function fetchUserById(userId: number): Promise<User | null> {
  const session = await verifySession();
  if (!session) return null;

  const user = await prisma.user.findFirst({
    where: {
      id: +userId,
    },
  });

  if (!user) {
    notFound();
  }

  return user;
}

export async function fetchUserDetails(): Promise<User | null> {
  const session = await verifySession();
  if (!session) return null;

  const user = await prisma.user.findFirst({
    where: {
      id: +session.userId
    },
  });

  if (!user) {
    notFound();
  }

  return user;
}

export async function UpdateUserDetails(): Promise<User | null> {
  const session = await verifySession();
  if (!session) return null;

  const user = await prisma.user.findFirst({
    where: {
      id: +session.userId
    },
  });

  if (!user) {
    notFound();
  }

  return user;
}

