import FilterProvider from "@/components/FilterProvider";
import Pagination from "@/components/Pagination";
import SubHeader from "@/components/layout/SubHeader";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import InquiryDialog from "@/features/inquiry/components/InquiryDialog";
import { getContactList } from "@/features/inquiry/server/dal";
import { verifyAdminSession } from "@/lib/dal";
import { baseFilterSchema } from "@/types";

export default async function InquiryPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; limit?: string }>;
}) {
  await verifyAdminSession();

  const parsed = baseFilterSchema.safeParse(await searchParams);

  if (!parsed.success) {
    throw new Error("Invalid search parameters");
  }

  const { page = 1, limit = 10 } = parsed.data;

  const data = await getContactList({
    page,
    limit,
    targetSite: "kfmblower",
  });

  return (
    <FilterProvider>
      <SubHeader>
        <SubHeader.Title>문의 목록</SubHeader.Title>
        <SubHeader.Description>
          kfmblower로 수신된 문의 목록입니다.
        </SubHeader.Description>
      </SubHeader>
      <Table className="mb-10 table-fixed">
        <colgroup>
          <col style={{ width: "10%" }} />
          <col style={{ width: "20%" }} />
          <col />
          <col />
          <col style={{ width: "10%" }} />
        </colgroup>
        <TableHeader>
          <TableRow>
            <TableHead>No</TableHead>
            <TableHead>회사명(이름)</TableHead>
            <TableHead>이메일</TableHead>
            <TableHead>연락처</TableHead>
            <TableHead>작성일</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.items.map((item) => (
            <InquiryDialog key={item.id} inquiry={item} targetSite="kfmblower">
              <TableRow>
                <TableCell className="overflow-hidden text-ellipsis whitespace-nowrap">
                  {item.id}
                </TableCell>
                <TableCell className="overflow-hidden text-ellipsis whitespace-nowrap">
                  {item.name}
                </TableCell>
                <TableCell className="overflow-hidden text-ellipsis whitespace-nowrap">
                  {item.email}
                </TableCell>
                <TableCell className="overflow-hidden text-ellipsis whitespace-nowrap">
                  {item.contact}
                </TableCell>
                <TableCell className="overflow-hidden text-ellipsis whitespace-nowrap">
                  {new Date(item.regdate).toLocaleDateString("ko-KR")}
                </TableCell>
              </TableRow>
            </InquiryDialog>
          ))}
        </TableBody>
      </Table>
      <Pagination totalCount={data.total} limit={limit} />
    </FilterProvider>
  );
}
