'use client'

import { login } from "@/actions/actions";
import { useActionState } from "react";
import { useFormState, useFormStatus } from "react-dom";

export default function Login() {

    const [state, loginAction] = useActionState(login, undefined)

  return (
    <main className="text-center pt-16">
      <h1 className="text-4xl md:text-5xl font-bold mb-5">Login</h1>
      <form action={loginAction} className="flex flex-col max-w-[400px] mx-auto gap-2">

        <input
          type="email"
          name="email"
          required
          placeholder="Email"
          className="border rounded h-10 px-3"
        />

        <input
          type="password"
          name="password"
          required
          placeholder="Password"
          className="border rounded h-10 px-3"
        />

      </form>

      <SubmitButton/>
    </main>
  );

  

}

function SubmitButton(){
    const { pending } = useFormStatus()

    return (
        <button disabled={pending} type="submit">
            Login
        </button>
    )
}

