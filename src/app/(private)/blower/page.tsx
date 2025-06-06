import BlowerTable from "@/features/blower/components/BlowerTable";
import { verifyAdminSession } from "@/lib/dal";

export default async function BlowerPage() {
  await verifyAdminSession();

  return <BlowerTable />;
}
