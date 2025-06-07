import Link from "next/link";
import {
  ArrowUpRight,
  CirclePlus,
  DraftingCompass,
  Globe,
  Mail,
  Menu,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SITE_LISTS } from "@/constants/dashboard";

export default async function DashboardPage() {
  return (
    <div className="mx-auto w-full max-w-xl">
      <div className="space-y-5">
        <h2 className="flex items-center gap-2 font-semibold">
          <Menu size={16} />
          자주사용하는 메뉴
        </h2>
        <div className="flex flex-wrap gap-1">
          <Button asChild variant="outline">
            <Link href="/quotation/create">
              <CirclePlus />
              새로운 견적 생성하기
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/inquiry/kfmblower">
              <Mail />
              <b>KFM</b> Blower 문의 내역
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/inquiry/kfmbusan">
              <Mail />
              <b>KFM</b> Busan 문의 내역
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/blower">
              <DraftingCompass />
              블로워 선정표
            </Link>
          </Button>
        </div>
      </div>
      <Separator className="my-10" />
      <div className="space-y-5">
        <h2 className="flex items-center gap-2 font-semibold">
          <Globe size={16} />
          자주이용하는 사이트
        </h2>
        <ul className="grid grid-cols-2 gap-3">
          {SITE_LISTS.map((item) => (
            <li key={item.label}>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={item.url}
                className="hover:bg-accent hover:text-accent-foreground flex items-center justify-between gap-2 rounded-md border bg-transparent p-4 transition-colors"
              >
                <div className="w-[80%]">
                  <div className="text-sm font-semibold">{item.label}</div>
                  <div className="text-muted-foreground overflow-hidden text-xs overflow-ellipsis whitespace-nowrap">
                    {item.url}
                  </div>
                </div>
                <ArrowUpRight size={16} />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
