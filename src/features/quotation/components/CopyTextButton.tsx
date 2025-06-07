import { MouseEvent, PropsWithChildren, useRef } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export default function CopyTextButton({ children }: PropsWithChildren) {
  const focusedElRef = useRef<HTMLInputElement | HTMLTextAreaElement | null>(
    null,
  );

  const handleMouseDown = () => {
    const element = document.activeElement;
    if (
      element instanceof HTMLInputElement ||
      element instanceof HTMLTextAreaElement
    ) {
      focusedElRef.current = element;
    } else {
      focusedElRef.current = null;
    }
  };

  const handleCopy = async (e: MouseEvent) => {
    const content = e.currentTarget.textContent;
    const currentElement = focusedElRef.current;

    if (!content) return;

    if (currentElement) {
      const start = currentElement.selectionStart;
      const end = currentElement.selectionEnd;
      const value = currentElement.value;

      if (start === null || end === null) return;

      currentElement.value = value.slice(0, start) + content + value.slice(end);
      currentElement.setSelectionRange(
        start + content.length,
        start + content.length,
      );
      currentElement.focus();
    } else {
      try {
        await navigator.clipboard.writeText(content);
        toast.success("클립보드에 복사했습니다. 붙여넣기로 사용해주세요");
      } catch {
        toast.success("복사에 실패했습니다.");
      }
    }
  };

  return (
    <Button
      variant="secondary"
      type="button"
      onClick={handleCopy}
      onMouseDown={handleMouseDown}
    >
      {children}
    </Button>
  );
}
