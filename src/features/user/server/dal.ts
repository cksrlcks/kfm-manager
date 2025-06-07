import "server-only";
import { unstable_cache } from "next/cache";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { user } from "@/db/schema";
import { verifyAdminSession } from "@/lib/dal";
import { UserForm } from "../type";

export const getUserList = unstable_cache(
  async () => {
    await verifyAdminSession();

    const data = await db.query.user.findMany({
      orderBy: (fields, { desc }) => desc(fields.createdAt),
    });

    return {
      totalCount: data.length,
      data,
    };
  },
  ["get-users"],
  { tags: ["users"] },
);

export const updateUser = async (data: UserForm) => {
  await verifyAdminSession();

  return db.update(user).set(data).where(eq(user.id, data.id));
};
