import QuotationForm from "@/features/quotation/components/QuotationForm";
import {
  getDefaultSetting,
  getEmployees,
} from "@/features/quotation/server/dal";
import { verifyAdminSession } from "@/lib/dal";

export default async function AddPage() {
  await verifyAdminSession();

  const [defaultSetting, employees] = await Promise.all([
    getDefaultSetting(),
    getEmployees(),
  ]);

  return (
    <QuotationForm defaultSetting={defaultSetting} employees={employees} />
  );
}
