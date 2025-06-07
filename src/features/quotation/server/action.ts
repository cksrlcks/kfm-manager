"use server";

import { revalidatePath } from "next/cache";
import { verifyAdminSession } from "@/lib/dal";
import { ServerActionResult } from "@/types";
import { Quotation, QuotationForm, quotationSchema } from "../type";
import { addQuotation, updateQuotation } from "./dal";

export async function addQuotationAction(
  data: QuotationForm,
): Promise<ServerActionResult> {
  await verifyAdminSession();

  const parsed = quotationSchema.safeParse(data);

  if (!parsed.success) {
    return {
      success: false,
      message: "입력필드를 다시 확인해주세요",
    };
  }

  try {
    const result = await addQuotation(parsed.data);

    if (result) {
      revalidatePath("/quotation/list");

      return {
        success: true,
        message: "견적서 작성을 성공했습니다.",
      };
    } else {
      return {
        success: false,
        message: "견적서 작성에 문제가 생겼어요",
      };
    }
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "견적서 작성에 문제가 생겼어요",
    };
  }
}

export async function updateQuotationAction(
  id: Quotation["id"],
  data: QuotationForm,
): Promise<ServerActionResult> {
  const parsed = quotationSchema.safeParse(data);

  if (!parsed.success) {
    return {
      success: false,
      message: "입력필드를 다시 확인해주세요",
    };
  }

  try {
    const result = await updateQuotation(id, data);

    if (result) {
      revalidatePath("/quotation/list", "layout");

      return {
        success: true,
        message: "견적서 작성을 수정했습니다.",
      };
    } else {
      return {
        success: false,
        message: "견적서 수정에 문제가 생겼어요",
      };
    }
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "견적서 수정성에 문제가 생겼어요",
    };
  }
}
