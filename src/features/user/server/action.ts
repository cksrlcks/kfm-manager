"use server";

import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { user } from "@/db/schema";
import { verifySession } from "@/lib/dal";
import { ServerActionResult } from "@/types";
import { UserForm, userSchema } from "../type";

export async function updateUserAction(
  data: UserForm,
): Promise<ServerActionResult> {
  await verifySession();

  const parsedData = userSchema.safeParse(data);

  if (!parsedData.success) {
    return {
      success: false,
      message: "입력필드를 확인해주세요.",
    };
  }

  const { email, role, contact, confirmed } = parsedData.data;

  try {
    await db
      .update(user)
      .set({
        role,
        contact,
        confirmed,
      })
      .where(eq(user.email, email));

    revalidatePath("/users/list");

    return {
      success: true,
      message: "사용자 정보가 업데이트 되었습니다.",
    };
  } catch (error) {
    console.error("Error updating user:", error);
    return {
      success: false,
      message: "사용자 정보 업데이트 중 오류가 발생했습니다.",
    };
  }
}
