import PostList from "@/components/post-list";
import prisma from "@/lib/db";
import { Suspense } from "react";
import { verifySession } from "../actions/dal";

export const metadata = {
  title: "My Posts",
};

export default async function Page() {
  const session = await verifySession();

  const posts = await prisma.post.findMany({
    where: {
      userId: +session.userId,
    },
  });

  return (
    <main className="text-center pt-2 px-5">
      <h1 className="text-4xl md:text-5xl font-bold mb-5">My Posts</h1>

      <Suspense fallback="Loading...">
        <PostList posts={posts} />
      </Suspense>
    </main>
  );
}
