"use server";

import { verifySession } from "@/lib/dal";
import { ServerActionResult } from "@/types";
import { Inquiry } from "../type";

export async function deleteContactAction({
  inquiryId,
  targetSite,
}: {
  inquiryId: Inquiry["id"];
  targetSite: string;
}): Promise<ServerActionResult> {
  await verifySession();

  const targetAPIUrl =
    targetSite === "kfmblower"
      ? process.env.KFMBLOWER_API_URL
      : process.env.KFMBUSAN_API_URL;

  try {
    const response = await fetch(`${targetAPIUrl}/delete-contact.php`, {
      method: "DELETE",
      headers: {
        "X-API-KEY": process.env.KFMBLOWER_API_KEY || "",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: inquiryId }),
    });

    if (!response.ok) {
      throw new Error("삭제에 실패했습니다.");
    }

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
}
