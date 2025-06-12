import SettingForm from "@/features/quotation/components/SettingForm";
import { getDefaultSetting } from "@/features/quotation/server/dal";

export default async function SettingPage() {
  const defaultSetting = await getDefaultSetting();

  return (
    <div className="max-w-md">
      <SettingForm defaultSetting={defaultSetting} />
    </div>
  );
}
