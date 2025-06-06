import { redirect } from "next/navigation";
import { verifyAdminSession } from "@/lib/dal";

export default async function UsersPage() {
  await verifyAdminSession();

  redirect("/users/list");
}
