import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import AuthForm from "@/features/auth/components/AuthForm";
import LoginForm from "@/features/auth/components/LoginForm";
import { auth } from "@/lib/auth";

export default async function LoginPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) {
    redirect("/dashboard");
  }

  return (
    <AuthForm>
      <AuthForm.Header>
        <AuthForm.Title>로그인</AuthForm.Title>
        <AuthForm.Description>
          아래의 정보를 입력하여 로그인해 주세요.
        </AuthForm.Description>
      </AuthForm.Header>
      <AuthForm.Body>
        <LoginForm />
      </AuthForm.Body>
      <AuthForm.Footer>
        <div className="flex items-center justify-center">
          <div>
            <span className="text-muted-foreground">회원이 아니신가요?</span>
            <Link href="/signup" className="ml-2 underline underline-offset-4">
              회원가입
            </Link>
          </div>
          <Separator className="mx-4 min-h-3" orientation="vertical" />
          <div>
            <Link
              href="/find-password"
              className="underline underline-offset-4"
            >
              비밀번호 재설정
            </Link>
          </div>
        </div>
      </AuthForm.Footer>
    </AuthForm>
  );
}
