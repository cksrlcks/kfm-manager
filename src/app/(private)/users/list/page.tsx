import SubHeader from "@/components/layout/SubHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import EditDialog from "@/features/user/components/EditDialog";
import { getUserList } from "@/features/user/server/dal";
import { verifyAdminSession } from "@/lib/dal";
import { formatDate } from "@/lib/format";

export default async function UserListPage() {
  await verifyAdminSession();

  const { data } = await getUserList();

  return (
    <>
      <SubHeader>
        <SubHeader.Title>회원 목록</SubHeader.Title>
        <SubHeader.Description>전체 사용자 목록입니다.</SubHeader.Description>
      </SubHeader>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>No</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>이름</TableHead>
            <TableHead>직책</TableHead>
            <TableHead>권한</TableHead>
            <TableHead>승인됨</TableHead>
            <TableHead>생성일</TableHead>
            <TableHead>기타</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item, index) => (
            <TableRow key={item.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{item.email}</TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.position || "-"}</TableCell>
              <TableCell>{item.role}</TableCell>
              <TableCell>
                {item.confirmed ? (
                  <Badge>예</Badge>
                ) : (
                  <Badge variant="outline">아니오</Badge>
                )}
              </TableCell>
              <TableCell>{formatDate(item.createdAt, "YYYY-MM-DD")}</TableCell>
              <TableCell>
                <EditDialog user={item}>
                  <Button variant="outline" size="sm">
                    수정
                  </Button>
                </EditDialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
