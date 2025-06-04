"use client";

import { ComponentProps } from "react";
import { authClient } from "@/lib/auth-client";
import { Button } from "./ui/button";

export default function LogoutButton(
  props: Omit<ComponentProps<typeof Button>, "onClick">,
) {
  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          window.location.href = "/";
        },
      },
    });
  };

  return <Button {...props} onClick={handleLogout} />;
}
