import { notFound } from "next/navigation";
import QuotationForm from "@/features/quotation/components/QuotationForm";
import {
  getDefaultSettings,
  getQuotation,
} from "@/features/quotation/server/dal";

export default async function EditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [data, { defaultSettings, employees }] = await Promise.all([
    getQuotation(Number(id)),
    getDefaultSettings(),
  ]);

  if (!data) {
    notFound();
  }

  return (
    <QuotationForm
      defaultSettings={defaultSettings}
      employees={employees}
      initialData={data}
    />
  );
}
