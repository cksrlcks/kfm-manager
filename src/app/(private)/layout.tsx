import { PropsWithChildren } from "react";
import Link from "next/link";
import LogoutButton from "@/components/LogoutButton";
import Logo from "@/components/layout/Logo";
import Nav from "@/components/layout/Nav";
import RootLayout from "@/components/layout/RootLayout";
import Tools from "@/components/layout/Tools";
import User from "@/components/layout/User";
import { Button } from "@/components/ui/button";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <RootLayout>
      <RootLayout.Header>
        <RootLayout.HeaderTop>
          <Link href="/dashboard">
            <Logo />
          </Link>
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
          <Tools />
        </RootLayout.HeaderBottom>
      </RootLayout.Header>
      <RootLayout.Body>{children}</RootLayout.Body>
      <RootLayout.Footer />
    </RootLayout>
  );
}
