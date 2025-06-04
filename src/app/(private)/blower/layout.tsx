import { PropsWithChildren } from "react";
import SubLayout from "@/components/layout/SubLayout";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <SubLayout>
      <SubLayout.Header>
        <SubLayout.Title>블로워 선정</SubLayout.Title>
        <SubLayout.Description>
          블로워 선정 페이지입니다. 블로워 목록을 확인 할 수 있습니다.
        </SubLayout.Description>
      </SubLayout.Header>
      <SubLayout.Body>
        <SubLayout.Content>{children}</SubLayout.Content>
      </SubLayout.Body>
    </SubLayout>
  );
}
