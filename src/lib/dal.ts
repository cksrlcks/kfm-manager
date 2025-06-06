import "server-only";
import { cache } from "react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "./auth";

export const verifyAdminSession = cache(async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  if (!session.user.confirmed) {
    redirect("/access-denied?code=confirm_required");
  }

  if (session.user.role !== "admin") {
    redirect("/access-denied?code=admin_required");
  }

  return session;
});
