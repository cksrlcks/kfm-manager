import { PropsWithChildren } from "react";
import Link from "next/link";
import LogoutButton from "@/components/LogoutButton";
import Logo from "@/components/layout/Logo";
import Nav from "@/components/layout/Nav";
import RootLayout from "@/components/layout/RootLayout";
import User from "@/components/layout/User";
import { Button } from "@/components/ui/button";
import { verifySession } from "@/lib/dal";

export default async function Layout({ children }: PropsWithChildren) {
  await verifySession();

  return (
    <RootLayout>
      <RootLayout.Header>
        <RootLayout.HeaderTop>
          <Logo />
          <div className="flex items-center gap-4">
            <User />
            <div className="flex items-center gap-2">
              <Button asChild variant="outline">
                <Link href="/mypage">내정보</Link>
              </Button>
              <LogoutButton variant="outline">로그아웃</LogoutButton>
            </div>
          </div>
        </RootLayout.HeaderTop>
        <RootLayout.HeaderBottom>
          <Nav />
        </RootLayout.HeaderBottom>
      </RootLayout.Header>
      <RootLayout.Body>{children}</RootLayout.Body>
    </RootLayout>
  );
}
