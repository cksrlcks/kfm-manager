"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { deleteContactAction } from "../server/action";
import { Inquiry } from "../type";

type InquiryActionsProps = {
  inquiryId: Inquiry["id"];
  targetSite: string;
};

export default function InquiryActions({
  inquiryId,
  targetSite,
}: InquiryActionsProps) {
  const router = useRouter();

  const handleDelete = async () => {
    const response = await deleteContactAction({ inquiryId, targetSite });
    if (response.success) {
      toast.success(response.message);
      router.refresh();
    } else {
      toast.error(response.message);
    }
  };

  return (
    <div className="flex gap-1">
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="outline">삭제하기</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>정말 삭제하시겠습니까?</AlertDialogTitle>
            <AlertDialogDescription>
              삭제후 문의내역은 되돌릴 수 없습니다. 문의 내용을
              삭제하시겠습니까?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>취소</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>삭제</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
