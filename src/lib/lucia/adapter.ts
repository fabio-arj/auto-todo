import { PrismaAdapter } from "@lucia-auth/adapter-prisma";
import { prisma } from "../database";

export const adapter = new PrismaAdapter(prisma.session, prisma.user);
