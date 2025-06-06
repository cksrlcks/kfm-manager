import { verifyAdminSession } from "@/lib/dal";

export default async function QuotationPage() {
  await verifyAdminSession();

  return <div>Quotation Page</div>;
}
