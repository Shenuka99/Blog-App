"use client";

import { handleRegister } from "@/app/actions/actions";
import { useActionState } from "react";
import { useFormState, useFormStatus } from "react-dom";

export default function Signin() {
  const [state, action] = useActionState(handleRegister, undefined);

  return (
    <main className="text-center pt-16">
      <h1 className="text-4xl md:text-5xl font-bold mb-5">Sign In</h1>
      <form
        action={action}
        className="flex flex-col max-w-[400px] mx-auto gap-2"
      >
        <input
          type="text"
          name="firstName"
          required
          placeholder="First Name"
          className="border rounded h-10 px-3"
        />
        {state?.errors?.firstName && (
          <p className="text-sm text-red-500">{state.errors.firstName}</p>
        )}

        <input
          type="text"
          name="lastName"
          required
          placeholder="Last Name"
          className="border rounded h-10 px-3"
        />
        {state?.errors?.lastName && (
          <p className="text-sm text-red-500">{state.errors.lastName}</p>
        )}

        <input
          type="email"
          name="email"
          required
          placeholder="Email"
          className="border rounded h-10 px-3"
        />
        {state?.errors?.email && (
          <p className="text-sm text-red-500">{state.errors.email}</p>
        )}

        <input
          type="password"
          name="password"
          required
          placeholder="Password"
          className="border rounded h-10 px-3"
        />
        {state?.errors?.password && (
          <p className="text-sm text-red-500">{state.errors.password}</p>
        )}

        <input
          type="password"
          name="confirmPassword"
          required
          placeholder="Confirm Password"
          className="border rounded h-10 px-3"
        />

        {state?.errors?.confirmPassword && (
          <p className="text-sm text-red-500 py-2">
            {state.errors.confirmPassword}
          </p>
        )}

        {state?.errors && (
          <p className="text-sm text-red-500  p-2">{state.errors._form}</p>
        )}

        {state?.message && (
          <p className="text-sm text-red-500  p-2">{state?.message}</p>
        )}
        <SignupButton />
        {/* <button aria-disabled={pending} className="h-10 bg-blue-500 px-5 rounded text-white" type="submit"> {pending ? 'Submitting...' : 'Login'}</button> */}
      </form>
    </main>
  );
}

export function SignupButton() {
  const { pending } = useFormStatus();

  return (
    <button
      aria-disabled={pending}
      type="submit"
      className="h-10 bg-blue-500 px-5 rounded text-white"
    >
      {pending ? "Submitting..." : "Signin"}
    </button>
  );
}
