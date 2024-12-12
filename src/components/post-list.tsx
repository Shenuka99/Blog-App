import prisma from "@/lib/db";
import Link from "next/link";
import { BookmarkIcon } from "@heroicons/react/outline"; // Import the BookmarkIcon from Heroicons

export default async function PostList({posts}) {

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {
          posts.map((post) => (
            <div key={post.id} className="border border-gray-200 bg-white shadow-md rounded-lg p-4 flex flex-col justify-between relative">
              <Link href={`/posts/${post.id}`} className="flex-grow">
                <h2 className="text-lg font-semibold mb-2">{post.title}</h2>
                <p className="text-gray-700 text-sm mb-4 line-clamp-1">{post.body}</p>
                <h2 className="text-sm text-gray-600">By: {post.userId}</h2>
              </Link>
              <button className="absolute top-4 right-4 bg-transparent text-gray-500 hover:text-gray-700">
                {/* <BookmarkIcon className="h-5 w-5" /> */}
              </button>
            </div>
          ))
        }
      </div>
    </div>
  )
}
