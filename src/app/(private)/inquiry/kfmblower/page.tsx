import InquiryItem from "@/features/inquiry/components/InquiryItem";
import { getContactList } from "@/features/inquiry/server/dal";
import { verifyAdminSession } from "@/lib/dal";
import { searchParamsSchema } from "@/types";

export default async function InquiryPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; limit?: string }>;
}) {
  await verifyAdminSession();

  const parsed = searchParamsSchema.safeParse(await searchParams);

  if (!parsed.success) {
    throw new Error("Invalid search parameters");
  }

  const data = await getContactList({
    ...parsed.data,
    targetSite: "kfmblower",
  });

  return (
    <ul className="space-y-4">
      {data.items.map((item) => (
        <li key={item.id}>
          <InquiryItem inquiry={item} targetSite="kfmblower" />
        </li>
      ))}
    </ul>
  );
}
