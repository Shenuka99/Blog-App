"use client";

// import { updateUserDetails } from "@/app/actions/actions";
import SubmitButton from "@/components/submit-button";
import { useActionState, useEffect, useState } from "react";
import Image from "next/image";
import { User } from "@prisma/client";
import { fetchUserDetails, UpdateUserDetails } from "../actions/dal";

export default function Profile() {
  const [user, setUser] = useState<User | null>();
  const [editing, setEditing] = useState(false);

  const [state, action, pending] = useActionState(UpdateUserDetails, undefined);

  async function getUserData() {
    const user = await fetchUserDetails();
    setUser(user);
  }

  useEffect(() => {
    getUserData();
  });

  function handleEditClick() {
    setEditing(!editing);
  }

  return (
    <main className="text-center pt-2">
      <h1 className="text-4xl md:text-5xl font-bold mb-5">Profile</h1>
      {user && (
        <>
          <Image
            src={""}
            alt="User Profile"
            className="w-32 h-32 rounded-full mx-auto mb-4"
          />
          <form
            // action={action}
            className="flex flex-col max-w-[400px] mx-auto gap-2"
          >
            <input
              type="text"
              name="firstName"
              required
              placeholder="First Name"
              className={`border rounded h-10 px-3 ${
                !editing && "bg-gray-300"
              } `}
              defaultValue={user.firstName}
              disabled={!editing}
            />
            {/* {state?.errors?.firstName && (
              <p className="text-sm text-red-500">{state.errors.firstName}</p>
            )} */}
            <input
              type="text"
              name="lastName"
              required
              placeholder="Last Name"
              className={`border rounded h-10 px-3 ${
                !editing && "bg-gray-300"
              } `}
              defaultValue={user.lastName}
              disabled={!editing}
            />
            {/* {state?.errors?.lastName && (
              <p className="text-sm text-red-500">{state.errors.lastName}</p>
            )} */}
            <input
              type="email"
              name="email"
              required
              placeholder="Email"
              className={`border rounded h-10 px-3 ${
                !editing && "bg-gray-300"
              } `}
              defaultValue={user.email}
              disabled={!editing}
            />
            {/* {state?.errors?.email && (
              <p className="text-sm text-red-500">{state.errors.email}</p>
            )} */}
            {/* {editing && (
              <>
                {state?.errors?._form && (
                  <p className="text-sm text-red-500  p-2">
                    {state.errors._form}
                  </p>
                )}
                {state?.message && (
                  <p className="text-sm text-red-500  p-2">{state?.message}</p>
                )}
              </>
            )} */}

            {!editing && (
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
                onClick={handleEditClick}
              >
                Edit Profile
              </button>
            )}

            {editing && (
              <div className="flex justify-center">
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded mt-4 mx-2 w-20"
                  onClick={handleEditClick}
                >
                  Cancel
                </button>
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded mt-4 mx-2 w-20"
                  onClick={handleEditClick}
                  type="submit"
                >
                  Done
                </button>
              </div>
            )}
          </form>
        </>
      )}
    </main>
  );
}
