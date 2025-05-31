import { Button } from "../ui/button";
import Link from "next/link";

export default function User() {
  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2 text-sm">
        <div className="font-semibold">김찬기</div>
        <div className="text-xs tracking-tight text-muted-foreground">
          (kim@example.com)
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button asChild variant="outline">
          <Link href="/mypage">내정보</Link>
        </Button>
        <Button variant="outline">로그아웃</Button>
      </div>
    </div>
  );
}
