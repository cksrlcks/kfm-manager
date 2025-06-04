import { db } from "@/db";
import { verifySession } from "@/lib/dal";

export const getUserList = async () => {
  await verifySession();

  const data = await db.query.user.findMany({
    orderBy: (fields, { desc }) => desc(fields.createdAt),
  });

  return {
    totalCount: data.length,
    data,
  };
};
