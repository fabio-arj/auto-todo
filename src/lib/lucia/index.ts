"use server";

import { z } from "zod";
import { Argon2id } from "oslo/password";
import { generateId } from "lucia";
import { prisma } from "@/lib/database";
import { cookies } from "next/headers";
import { lucia } from "./adapter";
import { SignInSchema, SignUpSchema } from "../schemas";

export const getUser = async () => {
  const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;
  if (!sessionId) return null;
  const { user, session } = await lucia.validateSession(sessionId);

  try {
    if (session && session.fresh) {
      const sessionCookie = lucia.createSessionCookie(session.id);
      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
      );
    }
    if (!session) {
      const sessionCookie = lucia.createBlankSessionCookie();
      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
      );
    }
  } catch {
    // Next.js throws error when attempting to set cookies when rendering page
  }
  return user;
};

export const signUp = async (values: z.infer<typeof SignUpSchema>) => {
  "use server";
  const hashedPassword = await new Argon2id().hash(values.password);
  const userId = generateId(15);

  try {
    await prisma.user.create({
      data: {
        password: hashedPassword,
        email: values.email,
        id: userId,
      },
    });

    const session = await lucia.createSession(userId, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );

    return {
      success: true,
      data: {
        userId,
      },
    };
  } catch (error: any) {
    return {
      error: error?.message,
    };
  }
};

export const signIn = async (values: z.infer<typeof SignInSchema>) => {
  "use server";
  const userExist = await prisma.user.findFirst({
    where: { email: values.email },
  });

  if (!userExist) {
    return {
      error: "Usuário não encontrado",
    };
  }

  if (!userExist.password) {
    return {
      error: "Usuário não encontrado",
    };
  }

  const isValidPassword = await new Argon2id().verify(
    userExist.password,
    values.password
  );

  if (!isValidPassword) {
    return {
      error: "Usuário e/ou senha incorretos",
    };
  }

  const session = await lucia.createSession(userExist.id, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );

  return {
    success: "LogIn realizado com sucesso",
  };
};

declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
  }
}
