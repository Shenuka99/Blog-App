import { fetchPostById, updatePost } from "@/app/actions/dal";
import Form from "@/components/form";

export const metadata = {
  title: "Edit Post",
};

export default async function EditPost(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;

  const post = await fetchPostById(params.id);

  const updateAction = updatePost.bind(null, params.id);

  return (
    <main className="text-center pt-16">
      <h1 className="text-4xl md:text-5xl font-bold mb-5">Edit post</h1>

      <Form
        formAction={updateAction}
        postData={{
          title: post?.title ? post?.title : "",
          body: post?.body ? post?.body : "",
        }}
      />
    </main>
  );
}
