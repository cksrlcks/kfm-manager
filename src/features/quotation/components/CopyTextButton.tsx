import { MouseEvent, PropsWithChildren } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export default function CopyTextButton({ children }: PropsWithChildren) {
  const handleCopy = async (e: MouseEvent) => {
    const content = e.currentTarget.textContent;

    if (content) {
      try {
        await navigator.clipboard.writeText(content);
        toast.success("클립보드에 복사했습니다. 붙여넣기로 사용해주세요");
      } catch {
        toast.success("복사에 실패했습니다.");
      }
    }
  };

  return (
    <Button variant="secondary" type="button" onClick={handleCopy}>
      {children}
    </Button>
  );
}
