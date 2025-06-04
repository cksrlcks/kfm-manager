import LogoutButton from "@/components/LogoutButton";
import Logo from "@/components/layout/Logo";

const generateErrorMessage = (code?: string) => {
  switch (code) {
    case "admin_required":
      return "관리자만 접근이 가능합니다.";
    case "confirm_required":
      return "승인된 관리자만 접근이 가능합니다. \n관리자에게 문의해주세요.";
    default:
      return "권한이 없습니다.";
  }
};

export default async function AccessDeniedPage({
  searchParams,
}: {
  searchParams: Promise<{ code?: string }>;
}) {
  const { code } = await searchParams;
  const message = generateErrorMessage(code);

  return (
    <div className="bg-muted flex min-h-dvh flex-col items-center justify-center gap-8">
      <Logo />
      <div className="bg-background mx-auto flex min-h-[160px] w-full max-w-sm items-center justify-center rounded-2xl border p-4 text-center text-sm whitespace-pre-wrap">
        {message}
      </div>
      <div>
        <LogoutButton variant="outline">처음으로</LogoutButton>
      </div>
    </div>
  );
}
