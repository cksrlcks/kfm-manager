import QuotationForm from "@/features/quotation/components/QuotationForm";
import {
  getDefaultSetting,
  getEmployees,
} from "@/features/quotation/server/dal";

export default async function AddPage() {
  const [defaultSetting, employees] = await Promise.all([
    getDefaultSetting(),
    getEmployees(),
  ]);

  return (
    <QuotationForm defaultSetting={defaultSetting} employees={employees} />
  );
}
