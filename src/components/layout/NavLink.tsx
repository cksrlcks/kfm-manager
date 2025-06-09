"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { icons } from "lucide-react";
import { cn } from "@/lib/utils";
import { NavItem } from "@/types";

type NavLinkProps = {
  item: NavItem;
};

export default function NavLink({ item }: NavLinkProps) {
  const pathname = usePathname();
  const firstDepth = pathname.split("/")[1] || "";
  const isActive = firstDepth === item.path.split("/")[1];
  const Icon = icons[item.icon];

  return (
    <Link
      key={item.path}
      href={item.path}
      className={cn(
        "text-muted-foreground flex w-16 cursor-pointer flex-col items-center justify-center gap-2 rounded-md border border-transparent px-2 py-3 text-sm tracking-tight hover:border-slate-100",
        isActive && "text-foreground bg-slate-50",
      )}
    >
      <Icon size={18} className="mb-1" />
      <span className={cn("text-xs font-medium", isActive && "font-bold")}>
        {item.label}
      </span>
    </Link>
  );
}
