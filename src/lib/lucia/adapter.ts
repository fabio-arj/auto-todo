import { PrismaAdapter } from "@lucia-auth/adapter-prisma";
import { prisma } from "../database";
import { Lucia } from "lucia";

export const adapter = new PrismaAdapter(prisma.session, prisma.user);

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    attributes: {
      secure: process.env.NODE_ENV === "production",
    },
  },
});
