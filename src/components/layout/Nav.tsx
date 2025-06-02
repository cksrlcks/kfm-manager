"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MENUS } from "@/constants";
import { cn } from "@/lib/utils";

export default function Nav() {
  const pathname = usePathname();

  return (
    <nav className="sticky:bg-red sticky top-0 z-50 mb-8 flex items-center justify-between bg-white">
      <ul className="flex items-center gap-2">
        {MENUS.map((item) => {
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
              <item.icon size={18} className="mb-1" />
              <span
                className={cn("text-xs font-medium", isActive && "font-bold")}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </ul>
    </nav>
  );
}
