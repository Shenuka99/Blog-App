"use server"
// this is not for creating server component , it is for server actions

import prisma from '@/lib/db'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'


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