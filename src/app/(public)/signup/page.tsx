import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import AuthForm from "@/features/auth/components/AuthForm";
import SignupForm from "@/features/auth/components/SignupForm";
import { auth } from "@/lib/auth";

export default async function SignupPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) {
    redirect("/dashboard");
  }

  return (
    <AuthForm>
      <AuthForm.Header>
        <AuthForm.Title>회원가입</AuthForm.Title>
        <AuthForm.Description>
          아래의 정보를 입력하여 회원가입을 진행해주세요.
        </AuthForm.Description>
      </AuthForm.Header>
      <AuthForm.Body>
        <SignupForm />
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
