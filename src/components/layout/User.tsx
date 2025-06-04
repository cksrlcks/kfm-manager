"use client";

import { authClient } from "@/lib/auth-client";

export default function User() {
  const { data: session } = authClient.useSession();

  if (!session) return null;

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-semibold">{session.user.name}</span>
      <span className="text-muted-foreground text-xs">
        {session.user.email}
      </span>
    </div>
  );
}
