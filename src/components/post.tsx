import prisma from "@/lib/db";
import Link from "next/link";
import { Post as TypePost } from "@prisma/client";
import { fetchUserById } from "@/app/actions/dal";

export default async function Post({ post }: { post: TypePost }) {
  const user = await fetchUserById(post.userId);

  return (
    <>
      <Link href={`/posts/${post.id}`} className="flex-grow">
        <h2 className="text-lg font-semibold mb-2">{post.title}</h2>
        <p className="text-gray-700 text-sm mb-4 line-clamp-1">{post.body}</p>
        <h2 className="text-sm text-gray-600">
          Author: {user?.firstName} {user?.lastName}
        </h2>
      </Link>
    </>
  );
}
