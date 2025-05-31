import Logo from "@/components/layout/Logo";
import { PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className="flex min-h-dvh items-center justify-center p-8">
      <div className="max-w-sm w-full flex flex-col gap-5">
        <header className="flex justify-center">
          <Logo />
        </header>
        <div>{children}</div>
      </div>
    </div>
  );
}
