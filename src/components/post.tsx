import prisma from "@/lib/db";
import Link from "next/link";
import { BookmarkIcon } from "@heroicons/react/outline";

export default async function Post({ post }) {
  const user = await prisma.user.findFirst({
    where: {
      id: +post.userId,
    },
  });

  return (
    <>
      <Link href={`/posts/${post.id}`} className="flex-grow">
        <h2 className="text-lg font-semibold mb-2">{post.title}</h2>
        <p className="text-gray-700 text-sm mb-4 line-clamp-1">{post.body}</p>
        <h2 className="text-sm text-gray-600">
          Author: {user?.firstName} {user?.lastName}
        </h2>
      </Link>
      <button className="absolute top-4 right-4 bg-transparent text-gray-500 hover:text-gray-700">
        {/* <BookmarkIcon className="h-5 w-5" /> */}
      </button>
    </>
  );
}
