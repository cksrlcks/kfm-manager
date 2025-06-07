import SettingForm from "@/features/quotation/components/SettingForm";
import { getDefaultSetting } from "@/features/quotation/server/dal";
import { verifyAdminSession } from "@/lib/dal";

export default async function SettingPage() {
  await verifyAdminSession();

  const defaultSetting = await getDefaultSetting();

  return (
    <div className="max-w-md">
      <SettingForm defaultSetting={defaultSetting} />
    </div>
  );
}
