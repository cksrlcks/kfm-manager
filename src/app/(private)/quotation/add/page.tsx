import QuotationForm from "@/features/quotation/components/QuotationForm";
import { getDefaultSettings } from "@/features/quotation/server/dal";

export default async function AddPage() {
  const { defaultSettings, employees } = await getDefaultSettings();

  return (
    <QuotationForm defaultSettings={defaultSettings} employees={employees} />
  );
}
