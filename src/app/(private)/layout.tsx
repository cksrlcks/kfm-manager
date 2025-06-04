import { PropsWithChildren } from "react";
import Logo from "@/components/layout/Logo";
import Nav from "@/components/layout/Nav";
import User from "@/components/layout/User";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className="mx-auto max-w-screen-2xl px-8 py-6">
      <header className="mb-2 flex h-9 items-center justify-between border-b border-slate-100 pb-4">
        <Logo />
        <User />
      </header>
      <Nav />
      {children}
    </div>
  );
}
