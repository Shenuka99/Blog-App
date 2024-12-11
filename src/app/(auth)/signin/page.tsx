'use client'

import { login } from "@/actions/actions";
import { useActionState } from "react";

export default function Signin() {

    const [state, loginAction] = useActionState(login, undefined)

  return (
    <main className="text-center pt-16">
      <h1 className="text-4xl md:text-5xl font-bold mb-5">Sign In</h1>
      <form action={loginAction} className="flex flex-col max-w-[400px] mx-auto gap-2">
        <input
          type="text"
          name="firstName"
          required
          placeholder="First Name"
          className="border rounded h-10 px-3"
        />

        <input
          type="text"
          name="lastName"
          required
          placeholder="Last Name"
          className="border rounded h-10 px-3"
        />

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

        <input
          type="password"
          name="confirmPassword"
          required
          placeholder="Confirm Password"
          className="border rounded h-10 px-3"
        />
      </form>
    </main>
  );
}
