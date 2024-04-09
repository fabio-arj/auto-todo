import { redirect } from "next/navigation";
import { getUser } from "@/lib/lucia";
import DashboardPage from "@/components/DashboardPage";

export default async function DashBoard() {
  "use server";
  const user = await getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  return <DashboardPage />;
}
