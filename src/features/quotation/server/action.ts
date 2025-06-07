"use server";

import { revalidateTag } from "next/cache";
import { verifyAdminSession } from "@/lib/dal";
import { ServerActionResult } from "@/types";
import { Quotation, QuotationForm, quotationSchema } from "../type";
import { addQuotation, removeQuotation, updateQuotation } from "./dal";

export const addQuotationAction = async (
  data: QuotationForm,
): Promise<ServerActionResult> => {
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
      revalidateTag("quotation");

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
};

export const updateQuotationAction = async (
  id: Quotation["id"],
  data: QuotationForm,
): Promise<ServerActionResult> => {
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
      revalidateTag("quotation");

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
};

export const removeQuotationAction = async (id: Quotation["id"]) => {
  try {
    const result = await removeQuotation(id);

    if (result) {
      revalidateTag("quotation");

      return {
        success: true,
        message: "삭제했습니다.",
      };
    } else {
      return {
        success: false,
        message: "삭제를 실패했습니다.",
      };
    }
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "삭제를 실패했습니다.",
    };
  }
};
