import PostList from "@/components/post-list";  
import prisma from "@/lib/db";
import { Suspense } from "react";
import { sessionResults } from "@/lib/auth";

export default async function Page() {

    // await new Promise((resolve) => setTimeout(resolve, 2000))
    // this thing caches data as hell
    const session = await sessionResults()

    const posts = await prisma.post.findMany({
      where: {
        userId: session.userId,
      },
    });

  return (
    <main className="text-center pt-16 px-5">
     <h1 className="text-4xl md:text-5xl font-bold mb-5">All Posts</h1>
     
     <Suspense fallback='Loading...'>
      <PostList posts={posts}/>
     </Suspense>
        
    </main>
  )
}
