import { PropsWithChildren } from "react";
import SubLayout from "@/components/layout/SubLayout";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <SubLayout>
      <SubLayout.Header>
        <SubLayout.Title>KFM Manager</SubLayout.Title>
        <SubLayout.Description>필요한 작업을 선택하세요.</SubLayout.Description>
      </SubLayout.Header>
      <SubLayout.Body>
        <SubLayout.Content>{children}</SubLayout.Content>
      </SubLayout.Body>
    </SubLayout>
  );
}
