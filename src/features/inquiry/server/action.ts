"use server";

import { verifyAdminSession } from "@/lib/dal";
import { ServerActionResult } from "@/types";
import { Inquiry } from "../type";
import { deleteContact } from "./dal";

export const deleteContactAction = async ({
  inquiryId,
  targetSite,
}: {
  inquiryId: Inquiry["id"];
  targetSite: string;
}): Promise<ServerActionResult> => {
  await verifyAdminSession();

  try {
    await deleteContact(inquiryId, targetSite);

    return {
      success: true,
      message: "삭제되었습니다.",
    };
  } catch (error) {
    console.error("삭제 오류:", error);

    return {
      success: false,
      message: "삭제 중 오류가 발생했습니다.",
    };
  }
};
