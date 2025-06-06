import SubHeader from "@/components/layout/SubHeader";
import ProfileEditForm from "@/features/user/components/ProfileEditForm";
import { verifyAdminSession } from "@/lib/dal";

export default async function EditProfilePage() {
  const session = await verifyAdminSession();

  return (
    <>
      <SubHeader>
        <SubHeader.Title>내 정보 수정</SubHeader.Title>
        <SubHeader.Description>
          프로필을 수정할 수 있습니다.
        </SubHeader.Description>
      </SubHeader>
      <div className="max-w-md">
        <ProfileEditForm user={session.user} />
      </div>
    </>
  );
}
