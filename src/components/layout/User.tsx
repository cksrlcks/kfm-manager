"use client";

import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { Button } from "../ui/button";

export default function User() {
  const { data: session } = authClient.useSession();
  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          window.location.href = "/";
        },
      },
    });
  };

  if (!session) return null;

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2">
        <span className="text-sm font-semibold">{session.user.name}</span>
        <span className="text-muted-foreground text-xs">
          {session.user.email}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <Button asChild variant="outline">
          <Link href="/mypage">내정보</Link>
        </Button>
        <Button variant="outline" onClick={handleLogout}>
          로그아웃
        </Button>
      </div>
    </div>
  );
}
