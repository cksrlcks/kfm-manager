import { redirect } from "next/navigation";
import { verifyAdminSession } from "@/lib/dal";

export default async function InquiryPage() {
  await verifyAdminSession();

  redirect("/inquiry/kfmblower");
}
