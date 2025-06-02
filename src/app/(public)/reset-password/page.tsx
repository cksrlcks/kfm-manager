import { Suspense } from "react";
import Link from "next/link";
import AuthForm from "@/features/auth/components/AuthForm";
import ResetForm from "@/features/auth/components/ResetForm";

export default function ResetPasswordPage() {
  return (
    <AuthForm>
      <AuthForm.Header>
        <AuthForm.Title>비밀번호 초기화</AuthForm.Title>
        <AuthForm.Description>
          새로운 비밀번호를 입력해주세요.
        </AuthForm.Description>
      </AuthForm.Header>
      <AuthForm.Body>
        <Suspense>
          <ResetForm />
        </Suspense>
      </AuthForm.Body>
      <AuthForm.Footer>
        <Link href="/" className="underline underline-offset-4">
          처음으로
        </Link>
      </AuthForm.Footer>
    </AuthForm>
  );
}
