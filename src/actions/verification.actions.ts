import { TimeSpan, createDate } from "oslo";
import { generateRandomString, alphabet } from "oslo/crypto";
import { prisma } from "@/lib/database";

export async function generateEmailVerificationCode(
  id: string,
  email: string
): Promise<string> {
  await prisma.verification.deleteMany({ where: { userId: id } });
  const code = generateRandomString(6, alphabet("0-9"));
  console.log(code);
  await prisma.verification.create({
    data: {
      userId: id,
      email,
      code,
      expiresAt: createDate(new TimeSpan(15, "m")),
    },
  });
  return code;
}
