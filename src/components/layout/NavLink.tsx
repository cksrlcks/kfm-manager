"use client";

import { cn } from "@/lib/utils";
import { NavItem } from "@/types";
import Link from "next/link";
import { usePathname } from "next/navigation";

type NavLinkProps = {
  item: NavItem;
};

export default function NavLink({ item }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname.startsWith(item.path);

  return (
    <Link
      key={item.path}
      href={item.path}
      className={cn(
        "flex w-16 cursor-pointer flex-col items-center justify-center gap-2 rounded-md border border-transparent px-2 py-3 text-sm tracking-tight text-muted-foreground hover:border-slate-100",
        isActive && "bg-slate-50 text-foreground"
      )}
    >
      <item.icon size={18} className="mb-1" />
      <span className={cn("text-xs font-medium", isActive && "font-bold")}>
        {item.label}
      </span>
    </Link>
  );
}
