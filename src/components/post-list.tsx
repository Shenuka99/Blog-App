import prisma from "@/lib/db";
import Link from "next/link";
// Import the BookmarkIcon from Heroicons
import Post from "./post";

export default async function PostList({ posts }) {
  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {posts.map((post) => (
          <div
            key={post.id}
            className="border border-gray-200 bg-white shadow-md rounded-lg p-4 flex flex-col justify-between relative"
          >
            <Post post={post} />
          </div>
        ))}
      </div>
    </div>
  );
}
