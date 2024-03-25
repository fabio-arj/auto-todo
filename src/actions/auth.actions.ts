import { z } from "zod";
import { SignUpSchema } from "@/app/signup/page";
import { Argon2id } from "oslo/password";
import { generateId } from "lucia";
import { client as prisma }  from "@/lib/auth";

export function SignUp = async (values: z.infer<typeof SignUpSchema>) => {
  console.log(values);
  const hashedPassword = await new Argon2id().hash(values.password);
  const id = generateId(15)

  prisma.user.create({
    data: {
      hashed_password: hashedPassword,
      email: values.email,
      
    },
  });

}
