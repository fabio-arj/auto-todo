import { redirect } from "next/navigation";
import { getUser } from "@/lib/lucia";
import SignupForm from "@/components/SignupForm";

export default async function AuthForm() {
  "use server";
  const user = await getUser();

  if (user) {
    return redirect("/");
  }
  return <SignupForm />;
}
