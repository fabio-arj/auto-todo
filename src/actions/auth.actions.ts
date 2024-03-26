"use server";

import { z } from "zod";
import { SignUpSchema } from "@/app/signup/page";
import { Argon2id } from "oslo/password";
import { generateId } from "lucia";
import { lucia, client as prisma } from "@/lib/auth";
import { cookies } from "next/headers";

export const signUp = async (values: z.infer<typeof SignUpSchema>) => {
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
