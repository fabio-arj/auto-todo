import { redirect } from "next/navigation";
import { getUser } from "@/lib/lucia";
import SigninForm from "@/components/SigninForm";

export default async function SignInPage() {
  "use server";
  const user = await getUser();

  if (user) {
    return redirect("/");
  }

  return <SigninForm />;
}
