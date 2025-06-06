import "server-only";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { user } from "@/db/schema";
import { verifyAdminSession } from "@/lib/dal";
import { UserForm } from "../type";

export async function getUserList() {
  await verifyAdminSession();

  const data = await db.query.user.findMany({
    orderBy: (fields, { desc }) => desc(fields.createdAt),
  });

  return {
    totalCount: data.length,
    data,
  };
}

export async function updateUser(data: UserForm) {
  await verifyAdminSession();

  return db.update(user).set(data).where(eq(user.id, data.id));
}
