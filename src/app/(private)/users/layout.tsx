import { PropsWithChildren } from "react";
import SubLayout from "@/components/layout/SubLayout";
import { USERS_SUB_MENUS } from "@/constants";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <SubLayout>
      <SubLayout.Header>
        <SubLayout.Title>회원 관리</SubLayout.Title>
        <SubLayout.Description>
          회원 관리 페이지입니다. 회원 목록을 확인하고 관리할 수 있습니다.
        </SubLayout.Description>
      </SubLayout.Header>
      <SubLayout.Body>
        <SubLayout.Nav menus={USERS_SUB_MENUS} />
        <SubLayout.Content>{children}</SubLayout.Content>
      </SubLayout.Body>
    </SubLayout>
  );
}
