import { verifyAdminSession } from "@/lib/dal";

export default async function MyPage() {
  await verifyAdminSession();

  return <div>My Page</div>;
}
