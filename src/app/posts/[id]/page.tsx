import UpvoteButton from "@/components/upvoteButton"
import prisma from "@/lib/db"
import { notFound } from "next/navigation"

export default async function page({params} : {
  params: {id: string}
}) {

  // await new Promise((resolve) => setTimeout(resolve, 1500))
  // dynamic route have specila prop named params for get the dynamic id
  const post = await prisma.post.findUnique({
    where: {
      id: +params.id
    }
  })

  if (!post){
    notFound();
    // next js built in not found page
  }

  

  return (
    <main className="px-7 pt-24 text-center">
    
        <h1 className="text-5xl font-semibold mb-7">{post.title}</h1>
        <p className="max-w-[700px] mx-auto">{post.body}</p>

        <UpvoteButton/>
    </main>
  )
}
