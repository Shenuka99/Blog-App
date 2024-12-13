"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";

interface FormProps {
  formAction: any;
  postData: {
    title: string;
    body: string;
  };
}

interface FormErrors {
  title?: string[];
  body?: string[];
}

interface FormState {
  errors: FormErrors;
}
const Form: React.FC<FormProps> = ({ formAction, postData }) => {
  const [state, action, pending] = useActionState(formAction, undefined);

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

      {/* <button className="h-10 bg-blue-500 px-5 rounded text-white" type="submit">Submit</button> */}
      <SubmitButton />
    </form>
  );
};

export default Form;

export function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      aria-disabled={pending}
      type="submit"
      className="h-10 bg-blue-500 px-5 rounded text-white"
    >
      {pending ? "Submitting..." : "Submit"}
    </button>
  );
}
