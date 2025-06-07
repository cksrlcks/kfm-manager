import { Metadata } from "next";
import localFont from "next/font/local";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const pretendard = localFont({
  src: "../assets/fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
  variable: "--font-pretendard",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://kfm-manager.vercel.app"),
  title: "KFM-Manager",
  description: "KFM의 관리자를 위한 웹사이트입니다.",
  openGraph: {
    url: "https://kfm-manager.vercel.app",
    siteName: "KFM-Manager",
    title: "KFM-Manager",
    description: "KFM의 관리자를 위한 웹사이트입니다.",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "KFM-Manager",
      },
    ],
  },
};

export default function GlobalLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${pretendard.className} antialiased`}>
        {children} <Toaster />
      </body>
    </html>
  );
}
