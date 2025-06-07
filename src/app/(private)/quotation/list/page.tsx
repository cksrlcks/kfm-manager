import { Suspense } from "react";
import FilterProvider from "@/components/FilterProvider";
import Pagination from "@/components/Pagination";
import QuotationList from "@/features/quotation/components/QuotationList";
import Searchbar from "@/features/quotation/components/Searchbar";
import { getQuotations } from "@/features/quotation/server/dal";
import { verifyAdminSession } from "@/lib/dal";
import { baseFilterSchema } from "@/types";

export default async function ListPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; limit?: string; keyword?: string }>;
}) {
  const parsed = baseFilterSchema.safeParse(await searchParams);

  if (!parsed.success) {
    throw new Error("Invalid search parameters");
  }

  const { page = 1, limit = 10, keyword } = parsed.data;

  await verifyAdminSession();

  const data = await getQuotations({
    page,
    limit,
    keyword,
  });

  return (
    <FilterProvider>
      <div className="mb-8 flex items-center justify-between">
        <div className="text-sm">전체 : {data.total} 건</div>
        <Suspense>
          <Searchbar />
        </Suspense>
      </div>
      <QuotationList quotations={data.items} />
      <Pagination totalCount={data.total} limit={limit} />
    </FilterProvider>
  );
}
