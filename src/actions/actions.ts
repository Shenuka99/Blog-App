"use server"
// this is not for creating server component , it is for server actions

import prisma from '@/lib/db'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { revalidatePath } from 'next/cache'
import { z } from "zod";
import { createSession, deleteSession } from "../lib/session";
import { redirect } from "next/navigation";

const testUser = {
  id: "1",
  email: "contact@cosdensolutions.io",
  password: "12345678",
};

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }).trim(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .trim(),
});

export async function login(prevState: any, formData: FormData) {
  const result = loginSchema.safeParse(Object.fromEntries(formData));

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  const { email, password } = result.data;

  if (email !== testUser.email || password !== testUser.password) {
    return {
      errors: {
        email: ["Invalid email or password"],
      },
    };
  }

  await createSession(testUser.id);

  redirect("/dashboard");
}

export async function logout() {
  await deleteSession();
  redirect("/login");
}


export async function createPost(formData: FormData){
      // here we have to validate formdata

    //auth check
    const {isAuthenticated} = getKindeServerSession()
    if(!(await isAuthenticated())){
        redirect('/api/auth/login')
    }
   
    // validation checks (e.g.zod) formdata type should be unknown

    const title = formData.get('title') as string
    const body = formData.get('body') as string

    await prisma.post.create({
        data: {
            title,
            body
        }
    })

    revalidatePath('/posts')

} 