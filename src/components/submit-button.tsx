"use client";

type SubmitButtonPrps = {
  text: string;
  pending: boolean;
};

export default function SubmitButton({ text, pending }: SubmitButtonPrps) {
  return (
    <button
      aria-disabled={pending}
      type="submit"
      className="h-10 bg-blue-500 px-5 rounded text-white hover:bg-blue-600"
    >
      {pending ? "Submitting..." : text}
    </button>
  );
}
