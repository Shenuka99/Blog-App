import PostList from "../components/post-list";
import { Suspense } from "react";
import { fetchAllPosts } from "./actions/dal";

export const metadata = {
  title: "Home",
};

export default async function Home() {
  const posts = await fetchAllPosts();

  return (
    <main className="text-center pt-2 px-5">
      <h1 className="text-4xl md:text-5xl font-bold mb-2">All Blogs</h1>
      <div className="max-w-[750px] mx-auto leading-8">
        <Suspense fallback="Loading...">
          <PostList posts={posts} />
        </Suspense>
      </div>
    </main>
  );
}
