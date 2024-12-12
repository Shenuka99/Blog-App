// submit-button.tsx
'use client';

import { useFormStatus } from "react-dom";


export default function SubmitButton({text = 'Sign up'}) {
  const { pending } = useFormStatus();
  return (
    <button className="h-10 bg-blue-500 px-5 rounded text-white" type="submit" disabled={pending}>{ pending ? 'Submitting...' : text}</button>
  );
}