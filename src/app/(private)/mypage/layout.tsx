import { PropsWithChildren } from "react";
import SubLayout from "@/components/layout/SubLayout";
import { MYPAGE_SUB_MENUS } from "@/constants";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <SubLayout>
      <SubLayout.Header>
        <SubLayout.Title>내정보 관리</SubLayout.Title>
        <SubLayout.Description>
          내정보 관리 페이지입니다. 내정보를 확인하고 수정할 수 있습니다.
        </SubLayout.Description>
      </SubLayout.Header>
      <SubLayout.Body>
        <SubLayout.Nav menus={MYPAGE_SUB_MENUS} />
        <SubLayout.Content>{children}</SubLayout.Content>
      </SubLayout.Body>
    </SubLayout>
  );
}
