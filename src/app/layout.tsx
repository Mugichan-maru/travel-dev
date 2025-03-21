import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "モバイルアプリモックアップ",
  description: "Next.js、Tailwind CSS、shadcn UIで作成したモバイルアプリのモックアップ",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className={`${inter.className} bg-gray-50 min-h-screen`}>{children}</body>
    </html>
  );
}