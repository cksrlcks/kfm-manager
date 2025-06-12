import SubHeader from "@/components/layout/SubHeader";
import ChangePasswordForm from "@/features/user/components/ChangePasswordForm";

export default function ChangePasswordPage() {
  return (
    <>
      <SubHeader>
        <SubHeader.Title>비밀번호 수정</SubHeader.Title>
        <SubHeader.Description>
          비밀번호를 수정할 수 있습니다.
        </SubHeader.Description>
      </SubHeader>
      <div className="max-w-md">
        <ChangePasswordForm />
      </div>
    </>
  );
}
