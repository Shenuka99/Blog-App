import Form from "@/components/form";
import { createPost } from "@/app/actions/dal";

export const metadata = {
  title: "Create Post",
};

export default async function Page() {
  return (
    <main className="text-center pt-16">
      <h1 className="text-4xl md:text-5xl font-bold mb-5">Create post</h1>

      <Form formAction={createPost} postData={{ title: "", body: "" }} />
    </main>
  );
}
