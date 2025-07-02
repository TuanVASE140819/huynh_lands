import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import ScrollToTop from "@/components/scroll-to-top";
import { LanguageProvider } from "@/contexts/language-context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Huỳnh Land - Bất động sản uy tín",
  description: "Đối tác tin cậy trong mọi giao dịch bất động sản",
  generator: "v0.dev",
  keywords: [
    "bất động sản",
    "huỳnh land",
    "mua nhà",
    "bán nhà",
    "thuê nhà",
    "real estate",
    "property",
    "apartment",
    "villa",
    "land",
    "nhà phố",
    "căn hộ",
    "biệt thự",
    "đất nền",
  ],
  authors: [{ name: "Huỳnh Land", url: "https://huynhland.vn" }],
  openGraph: {
    title: "Huỳnh Land - Bất động sản uy tín",
    description: "Đối tác tin cậy trong mọi giao dịch bất động sản",
    url: "https://huynhland.vn",
    siteName: "Huỳnh Land",
    images: [
      {
        url: "/placeholder-logo.png",
        width: 600,
        height: 315,
        alt: "Huỳnh Land Logo",
      },
    ],
    locale: "vi_VN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Huỳnh Land - Bất động sản uy tín",
    description: "Đối tác tin cậy trong mọi giao dịch bất động sản",
    site: "@huynhland",
    creator: "@huynhland",
    images: ["/placeholder-logo.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body className={inter.className}>
        <LanguageProvider>
          <ScrollToTop />
          <Header />
          <main>{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
