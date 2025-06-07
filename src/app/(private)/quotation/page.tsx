import { redirect } from "next/navigation";

export default async function QuotationPage() {
  redirect("/quotation/list");
}
