"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { DynamicIcon } from "lucide-react/dynamic";
import { cn } from "@/lib/utils";
import { NavItem } from "@/types";

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
        "text-muted-foreground flex w-16 cursor-pointer flex-col items-center justify-center gap-2 rounded-md border border-transparent px-2 py-3 text-sm tracking-tight hover:border-slate-100",
        isActive && "text-foreground bg-slate-50",
      )}
    >
      <DynamicIcon name={item.icon} size={18} className="mb-1" />
      <span className={cn("text-xs font-medium", isActive && "font-bold")}>
        {item.label}
      </span>
    </Link>
  );
}
