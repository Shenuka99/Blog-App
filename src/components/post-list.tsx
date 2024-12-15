import prisma from "@/lib/db";
import Link from "next/link";
// Import the BookmarkIcon from Heroicons
import Post from "./post";
import { Post as TypePost } from "@prisma/client";

export default async function PostList({
  posts,
}: {
  posts: TypePost[] | null;
}) {
  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-center">
        {posts && posts.length > 0 ? (
          posts.map((post) => (
            <div
              key={post.id}
              className="border border-gray-200 bg-white shadow-md rounded-lg p-4 flex flex-col justify-between relative"
            >
              <Post post={post} />
            </div>
          ))
        ) : (
          <h2 className="text-xl text-center py-auto">No posts available</h2>
        )}
      </div>
    </div>
  );
}
