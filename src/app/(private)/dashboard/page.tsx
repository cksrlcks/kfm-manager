import Link from "next/link";
import {
  ArrowUpRight,
  CircleGauge,
  CirclePlus,
  DraftingCompass,
  Globe,
  Mail,
  Star,
} from "lucide-react";
import PressureConvertorDialog from "@/components/PressureConvertorDialog";
import { Button } from "@/components/ui/button";
import { SITE_LISTS } from "@/constants/dashboard";

export default function DashboardPage() {
  return (
    <div className="bg-muted space-y-4 rounded-md p-6">
      <div className="bg-background flex-1 space-y-5 rounded-md p-5">
        <h2 className="flex items-center gap-2 font-semibold">
          <Star size={16} />
          자주사용하는 메뉴
        </h2>
        <div className="flex flex-wrap gap-1">
          <Button asChild variant="outline">
            <Link href="/quotation/add">
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
          <PressureConvertorDialog>
            <Button variant="outline">
              <CircleGauge />
              압력 단위 변환
            </Button>
          </PressureConvertorDialog>
        </div>
      </div>
      <div className="bg-background flex-1 space-y-5 rounded-md p-5">
        <h2 className="flex items-center gap-2 font-semibold">
          <Globe size={16} />
          자주이용하는 사이트
        </h2>
        <ul className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
          {SITE_LISTS.map((item) => (
            <li key={item.label}>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={item.url}
                className="hover:bg-accent hover:text-accent-foreground flex items-center justify-between gap-2 rounded-md border bg-transparent p-4 transition-colors"
              >
                <div className="w-[80%]">
                  <div className="overflow-hidden text-sm font-semibold overflow-ellipsis whitespace-nowrap">
                    {item.label}
                  </div>
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
