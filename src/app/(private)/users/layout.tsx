import { PropsWithChildren } from "react";
import SubLayout from "@/components/layout/SubLayout";
import { USERS_SUB_MENUS } from "@/constants/nav";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <SubLayout>
      <SubLayout.Header>
        <SubLayout.Title>{USERS_SUB_MENUS.title}</SubLayout.Title>
        <SubLayout.Description>
          {USERS_SUB_MENUS.description}
        </SubLayout.Description>
      </SubLayout.Header>
      <SubLayout.Body>
        <SubLayout.Nav menus={USERS_SUB_MENUS.items} />
        <SubLayout.Content>{children}</SubLayout.Content>
      </SubLayout.Body>
    </SubLayout>
  );
}
