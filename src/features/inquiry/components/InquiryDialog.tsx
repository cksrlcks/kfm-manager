import { PropsWithChildren } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Inquiry } from "../type";
import InquiryActions from "./InquiryActions";

type InquiryProps = PropsWithChildren<{
  inquiry: Inquiry;
  targetSite: string;
}>;

export default function InquiryDialog({
  inquiry,
  targetSite,
  children,
}: InquiryProps) {
  const { id, name, contact, email, regdate, category, done, content } =
    inquiry;
  const headerItems = [
    { label: "회사명", value: name },
    { label: "연락처", value: contact },
    { label: "이메일", value: email },
    { label: "등록일", value: new Date(regdate).toLocaleString("ko-KR") },
    { label: "카테고리", value: category },
    { label: "상태", value: done ? "완료" : "대기" },
  ];

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>견적문의</DialogTitle>
          <DialogDescription>견적문의 상세내용</DialogDescription>
          <Separator className="my-2" />
          <header className="space-y-1">
            {headerItems.map((item) => (
              <div
                className="flex justify-between gap-4 text-sm"
                key={item.label}
              >
                <span className="font-semibold">{item.label}</span>
                {item.value}
              </div>
            ))}
          </header>
          <Separator className="my-2" />

          {content ? (
            <div className="mb-8 text-sm break-all">{content}</div>
          ) : (
            <p>내용이 없습니다.</p>
          )}
          <Separator className="my-2" />

          <InquiryActions targetSite={targetSite} inquiryId={id} />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
