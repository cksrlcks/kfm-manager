import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { readFile } from "fs/promises";
import path from "path";
import { auth } from "@/lib/auth";

export async function GET() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || !session.user.confirmed || session.user.role !== "admin") {
    return new NextResponse("Unauthorized", { status: 403 });
  }

  const filePath = path.join(process.cwd(), "src/assets", "pdf", "catalog.pdf");

  try {
    const fileBuffer = await readFile(filePath);
    const headers = new Headers();
    headers.set("Content-Type", "application/pdf");
    headers.set(
      "Content-Disposition",
      "inline; filename=\"catalog.pdf\"; filename*=UTF-8''catalog.pdf",
    );

    return new NextResponse(fileBuffer, {
      status: 200,
      headers: headers,
    });
  } catch {
    return new NextResponse("file error", { status: 404 });
  }
}
