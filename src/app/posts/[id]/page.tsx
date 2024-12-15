import { deletePost, verifySession } from "@/app/actions/dal";
import prisma from "@/lib/db";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

export const metadata = {
  title: "Read Post",
};

export default async function Page(props: { params: Promise<{ id: string }> }) {
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
    "use server";
    const res = await deletePost(params.id);

    redirect("/posts");
  }

  const session = await verifySession();

  return (
    <main className="px-7 pt-24 text-center">
      <h1 className="text-5xl font-semibold mb-7">{post.title}</h1>
      <p className="max-w-[700px] mx-auto">{post.body}</p>

      {session?.userId == post.userId && (
        <div className="flex gap-4 justify-center mx-auto">
          <Link href={`/edit-post/${params.id}`}>
            <button className="my-8 py-2 px-4 bg-blue-400 rounded-xl hover:bg-blue-600">
              Edit Post
            </button>
          </Link>

          <form action={deleteAction}>
            <button className="my-8 py-2 px-4 bg-red-500 rounded-xl hover:bg-red-700">
              Delete Post
            </button>
          </form>
        </div>
      )}
    </main>
  );
}
