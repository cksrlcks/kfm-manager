import { notFound } from "next/navigation";
import QuotationForm from "@/features/quotation/components/QuotationForm";
import {
  getDefaultSetting,
  getEmployees,
  getQuotation,
} from "@/features/quotation/server/dal";

export default async function EditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [data, defaultSetting, employees] = await Promise.all([
    getQuotation(Number(id)),
    getDefaultSetting(),
    getEmployees(),
  ]);

  if (!data) {
    notFound();
  }

  return (
    <QuotationForm
      defaultSetting={defaultSetting}
      employees={employees}
      initialData={data}
    />
  );
}
