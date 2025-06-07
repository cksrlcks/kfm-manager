import SettingForm from "@/features/quotation/components/SettingForm";
import { getDefaultSetting } from "@/features/quotation/server/dal";

export default async function SettingPage() {
  const defaultSetting = await getDefaultSetting();

  return <SettingForm defaultSetting={defaultSetting} />;
}
