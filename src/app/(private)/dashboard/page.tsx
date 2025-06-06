import { verifyAdminSession } from "@/lib/dal";

export default async function DashboardPage() {
  await verifyAdminSession();

  return <div>Dashboard Page</div>;
}
