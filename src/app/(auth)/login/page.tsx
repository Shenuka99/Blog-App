"use client";

import { login } from "@/app/actions/actions";
import SubmitButton from "@/components/submit-button";
import { useActionState } from "react";

export default function Login() {
  const [state, action, pending] = useActionState(login, undefined);

  return (
    <main className="text-center pt-16">
      <h1 className="text-4xl md:text-5xl font-bold mb-5">Login</h1>
      <form
        action={action}
        className="flex flex-col max-w-[400px] mx-auto gap-2"
      >
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
        {state?.errors && (
          <p className="text-sm text-red-500  p-2">{state.errors._form}</p>
        )}

        {state?.message && (
          <p className="text-sm text-red-500  p-2">{state?.message}</p>
        )}
        <SubmitButton text="Login" pending={pending} />
      </form>
    </main>
  );
}
