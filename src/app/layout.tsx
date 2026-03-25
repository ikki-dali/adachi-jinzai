import type { Metadata, Viewport } from "next";
import { Noto_Sans_JP, Caveat } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import "@/styles/globals.css";

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  display: "swap",
  variable: "--font-noto",
});

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
  variable: "--font-caveat",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: "足立区 区内中小企業人材確保支援事業",
    template: "%s | 足立区 中小企業人材確保支援",
  },
  description:
    "足立区内の中小企業の人材確保を総合的に支援。アドバイザリー支援、企業見学会、セミナー開催など。",
  openGraph: {
    type: "website",
    locale: "ja_JP",
    siteName: "足立区 区内中小企業人材確保支援事業",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" className={`${notoSansJP.variable} ${caveat.variable}`} suppressHydrationWarning>
      <body className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <ChatWidget />
      </body>
    </html>
  );
}
