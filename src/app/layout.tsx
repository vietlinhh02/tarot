import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tarot Online - Xem bói Tarot trực tuyến",
  description: "Trang web xem bói Tarot trực tuyến với các lá bài được rút ngẫu nhiên và diễn giải thông minh.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className={inter.className}>{children}</body>
    </html>
  );
} 