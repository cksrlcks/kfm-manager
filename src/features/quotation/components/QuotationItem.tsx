import Link from "next/link";
import { FileText } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/format";
import { removeQuotationAction } from "../server/action";
import { Quotation } from "../type";
import { QuotationPreviewDialog } from "./Preview";
import QuotationDeleteDialog from "./QuotationDeleteDialog";

type QuotationItemProps = {
  quotation: Quotation;
};

export default function QuotationItem({ quotation }: QuotationItemProps) {
  const metaData = [
    {
      label: "견적번호",
      value: quotation.quot_no,
    },
    {
      label: "견적일",
      value: formatDate(quotation.created_at, "YYYY-MM-DD"),
    },
    {
      label: "작성자",
      value: quotation.prepared,
    },
  ];

  const handleDelete = async () => {
    const result = await removeQuotationAction(quotation.id);
    if (result) {
      toast.success("견적서가 삭제되었습니다.");
    } else {
      toast.error("견적서 삭제에 실패했습니다.");
    }
  };

  return (
    <>
      <div className="hover:bg-muted/20 rounded-md border p-3">
        <div className="flex items-stretch gap-5">
          <div className="bg-muted flex aspect-[2/2.5] w-full max-w-[100px] items-center justify-center rounded-md border p-4">
            <FileText size={32} strokeWidth="2" />
          </div>
          <div className="flex flex-1 flex-col justify-between gap-2 px-1 py-2">
            <div className="text-lg font-semibold text-ellipsis whitespace-nowrap">
              {quotation.company_name}
            </div>
            <div>
              {metaData.map((item) => (
                <div
                  className="flex items-center gap-1 text-sm"
                  key={item.label}
                >
                  <span className="text-muted-foreground w-[4em]">
                    {item.label}
                  </span>
                  <span>{item.value}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-1">
            <QuotationPreviewDialog data={quotation}>
              <Button type="button">보기</Button>
            </QuotationPreviewDialog>
            <Button type="button" variant="outline" asChild>
              <Link href={`/quotation/edit/${quotation.id}`}>수정</Link>
            </Button>
            <QuotationDeleteDialog onDelete={handleDelete}>
              <Button type="button" variant="outline">
                삭제
              </Button>
            </QuotationDeleteDialog>
          </div>
        </div>
      </div>
    </>
  );
}
