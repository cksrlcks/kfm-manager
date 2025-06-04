import { Inquiry } from "../type";
import InquiryActions from "./InquiryActions";

type InquiryProps = {
  inquiry: Inquiry;
  targetSite: string;
};

export default function InquiryItem({ inquiry, targetSite }: InquiryProps) {
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
    <div className="rounded-md border p-6">
      <header className="mb-3 grid grid-cols-3 gap-2">
        {headerItems.map((item) => (
          <div className="flex gap-2" key={item.label}>
            <span className="font-semibold">{item.label}</span>
            {item.value}
          </div>
        ))}
      </header>
      <div className="mb-4">
        {content ? (
          <div className="break-all">{content}</div>
        ) : (
          <p>내용이 없습니다.</p>
        )}
      </div>
      <InquiryActions targetSite={targetSite} inquiryId={id} />
    </div>
  );
}
