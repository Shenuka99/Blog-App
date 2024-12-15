import "server-only";

import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import prisma from "@/lib/db";

export type SessionPayload = {
  userId: string | number;
  expiresAt: Date;
};

const secretKey = process.env.SECRET;
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1hr")
    .sign(key);
}

export async function decrypt(session: string | undefined = "") {
  try {
    const { payload } = await jwtVerify(session, key, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    console.log("Failed to verify session");
    return null;
  }
}

export async function createSession(id: number) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  // 1. Create a session in the database
  const session = await prisma.session.create({
    data: {
      userId: id,
      expiresAt,
    },
    select: { id: true },
  });

  const sessionId = session.id;

  // 2. Encrypt the session ID
  const token = await encrypt({ userId: id, expiresAt });

  // 3. Store the session in cookies for optimistic auth checks
  (await cookies()).set("session", token, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });

  return sessionId;
}
