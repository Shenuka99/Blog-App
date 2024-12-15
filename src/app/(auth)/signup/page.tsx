"use client";

import { signup } from "@/app/actions/actions";
import SubmitButton from "@/components/submit-button";
import { useActionState } from "react";

export default function Signup() {
  const [state, action, pending] = useActionState(signup, undefined);

  return (
    <main className="text-center pt-6">
      <h1 className="text-4xl md:text-5xl font-bold mb-5">Signup</h1>
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
          <ul>
            {state?.errors?.confirmPassword.map((error) => (
              <li key={error} className="text-sm text-red-500  p-2">
                {error}
              </li>
            ))}
          </ul>
        )}
        {state?.errors?._form && (
          <p className="text-sm text-red-500  p-2">{state.errors._form}</p>
        )}
        {state?.message && (
          <p className="text-sm text-red-500  p-2">{state?.message}</p>
        )}

        <SubmitButton text="Signup" pending={pending} />
      </form>
    </main>
  );
}
