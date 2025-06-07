"use server";

import { revalidateTag } from "next/cache";
import { verifyAdminSession } from "@/lib/dal";
import { ServerActionResult } from "@/types";
import {
  Quotation,
  QuotationDefaultSettingForm,
  QuotationForm,
  quotationSchema,
} from "../type";
import {
  addQuotation,
  removeQuotation,
  updateDefaultSettings,
  updateQuotation,
} from "./dal";

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
    await addQuotation(parsed.data);

    revalidateTag("quotation");
    return {
      success: true,
      message: "견적서 작성을 성공했습니다.",
    };
  } catch (error) {
    console.error(error);

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
    await updateQuotation(id, data);

    revalidateTag("quotation");

    return {
      success: true,
      message: "견적서 작성을 수정했습니다.",
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: "견적서 수정성에 문제가 생겼어요",
    };
  }
};

export const removeQuotationAction = async (id: Quotation["id"]) => {
  try {
    await removeQuotation(id);

    revalidateTag("quotation");

    return {
      success: true,
      message: "삭제했습니다.",
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: "삭제를 실패했습니다.",
    };
  }
};

export const updateDefaultSettingAction = async (
  data: QuotationDefaultSettingForm,
) => {
  await verifyAdminSession();

  try {
    await updateDefaultSettings(data);

    revalidateTag("default-setting");

    return {
      success: true,
      message: "기본 설정을 업데이트했습니다.",
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: "기본 설정 업데이트에 문제가 생겼어요",
    };
  }
};
