import InquiryItem from "@/features/inquiry/components/InquiryItem";
import { InquiryResponse } from "@/features/inquiry/type";

export default async function InquiryPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; limit?: string }>;
}) {
  const { page = 1, limit = 10 } = await searchParams;

  const response = await fetch(
    `${process.env.KFMBLOWER_API_URL}/get-contact.php?page=${page}&limit=${limit}`,
    {
      method: "GET",
      headers: {
        "X-API-KEY": process.env.KFMBLOWER_API_KEY || "",
        "Content-Type": "application/json",
      },
      cache: "no-store",
    },
  );

  if (!response.ok) {
    throw new Error("정보를 가져오지 못했습니다.");
  }

  const data = (await response.json()) as InquiryResponse;

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
