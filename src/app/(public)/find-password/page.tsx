import Link from "next/link";
import AuthForm from "@/features/auth/components/AuthForm";
import FindForm from "@/features/auth/components/FindForm";

export default async function FindPasswordPage() {
  return (
    <AuthForm>
      <AuthForm.Header>
        <AuthForm.Title>비밀번호 초기화</AuthForm.Title>
        <AuthForm.Description>
          가입하신 메일로 초기화 메일을 보내드립니다.
        </AuthForm.Description>
      </AuthForm.Header>
      <AuthForm.Body>
        <FindForm />
      </AuthForm.Body>
      <AuthForm.Footer>
        <span className="text-muted-foreground">이미 회원이신가요?</span>
        <Link href="/login" className="ml-2 underline underline-offset-4">
          로그인
        </Link>
      </AuthForm.Footer>
    </AuthForm>
  );
}
