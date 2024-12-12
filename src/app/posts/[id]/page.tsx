import { deletePost } from "@/app/actions/actions";
import UpvoteButton from "@/components/upvoteButton";
import prisma from "@/lib/db";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

export const metadata = {
  title: "Post",
}

export default async function Page(props: {params : Promise<{ id: string}>}) {
  const params = await props.params;
  const post = await prisma.post.findUnique({
    where: {
      id: +params.id,
    },
  });

  if (!post) {
    notFound();
  }

  async function deleteAction(formData: FormData) {
    'use server';
    const res = await deletePost(params.id);
    // put a toast
    redirect('/posts');
  }

  return (
    <main className="px-7 pt-24 text-center">
      <h1 className="text-5xl font-semibold mb-7">{post.title}</h1>
      <p className="max-w-[700px] mx-auto">{post.body}</p>

      <div className="flex gap-4 justify-center mx-auto">
        <Link href={`/edit-post/${params.id}`}>
          <button className="my-8 p-2 bg-blue-400 rounded-xl">
            Edit Post
          </button>
        </Link>

        <form action={deleteAction}>
          <button className="my-8 p-2 bg-red-500 rounded-xl">
            Delete Post
          </button>
        </form>
      </div>
    </main>
  );
}
