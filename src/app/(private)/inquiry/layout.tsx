import { PropsWithChildren } from "react";
import SubLayout from "@/components/layout/SubLayout";
import { INQUIRY_SUB_MENUS } from "@/constants";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <SubLayout>
      <SubLayout.Header>
        <SubLayout.Title>문의 관리</SubLayout.Title>
        <SubLayout.Description>
          문의 관리 페이지입니다. 문의 목록을 확인하고 관리할 수 있습니다.
        </SubLayout.Description>
      </SubLayout.Header>
      <SubLayout.Body>
        <SubLayout.Nav menus={INQUIRY_SUB_MENUS} />
        <SubLayout.Content>{children}</SubLayout.Content>
      </SubLayout.Body>
    </SubLayout>
  );
}
