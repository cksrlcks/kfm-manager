"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { SubNavItem } from "@/types";

type NavLinkProps = {
  item: SubNavItem;
};

export default function SubNavLink({ item }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname.startsWith(item.path);

  return (
    <Link
      key={item.path}
      href={item.path}
      className={cn(
        "flex items-center gap-3 rounded-md border border-transparent px-4 py-3 hover:border-slate-100",
        isActive && "bg-slate-50 font-medium",
      )}
    >
      <span className="text-sm">{item.label}</span>
    </Link>
  );
}
