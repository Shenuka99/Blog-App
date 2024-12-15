"use client";

import { PostFormState } from "@/lib/definition";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import SubmitButton from "./submit-button";

interface FormProps {
  formAction: any;
  postData: {
    title: string;
    body: string;
  };
}

const Form: React.FC<FormProps> = ({ formAction, postData }) => {
  const [state, action, pending] = useActionState<PostFormState>(
    formAction,
    undefined
  );

  return (
    <form
      action={action}
      className="flex flex-col max-w-[400px] mx-auto gap-2 my-10"
    >
      <input
        type="text"
        name="title"
        placeholder="Title for a new post"
        className="border rounded px-3 h-10"
        required
        defaultValue={postData?.title}
      />
      {state?.errors?.title && (
        <p className="text-sm text-red-500">{state?.errors?.title}</p>
      )}

      <textarea
        name="body"
        placeholder="Body content for new post"
        className="border rounded px-3 py-2"
        rows={6}
        required
        defaultValue={postData?.body}
      ></textarea>
      {state?.errors?.body && (
        <p className="text-sm text-red-500">{state?.errors?.body}</p>
      )}

      <SubmitButton text="Submit" pending={pending} />
    </form>
  );
};

export default Form;
