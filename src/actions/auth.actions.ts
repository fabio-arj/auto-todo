"use server";

import { z } from "zod";
import { SignUpSchema } from "@/lib/schemas";
import { SignInSchema } from "@/lib/schemas";
import { Argon2id } from "oslo/password";
import { generateId } from "lucia";
import { prisma } from "@/lib/database";
import { lucia } from "@/lib/auth";
import { cookies } from "next/headers";
import { TimeSpan, createDate } from "oslo";
import { generateRandomString, alphabet } from "oslo/crypto";

export const signUp = async (values: z.infer<typeof SignUpSchema>) => {
  const hashedPassword = await new Argon2id().hash(values.password);
  const userId = generateId(15);

  try {
    await prisma.user.create({
      data: {
        password: hashedPassword,
        email: values.email,
        id: userId,
        isVerified: false,
      },
    });

    const verificationCode = await generateEmailVerificationCode(
      userId,
      values.email
    );
    await sendVerificationCode(values.email, verificationCode);

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
    success: true,
  };
};

export async function generateEmailVerificationCode(
  id: string,
  email: string
): Promise<string> {
  await prisma.verification.deleteMany({ where: { userId: id } });
  const code = generateRandomString(6, alphabet("0-9"));
  await prisma.verification.create({
    data: {
      id,
      userId: id,
      email,
      code,
      expiresAt: createDate(new TimeSpan(15, "m")),
    },
  });
  return code;
}
