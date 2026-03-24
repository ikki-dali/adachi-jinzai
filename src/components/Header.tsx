"use client";

import { useState } from "react";
import Link from "next/link";
import AdachiCityLogo from "@/components/AdachiCityLogo";

const NAV_ITEMS = [
  { href: "/advisory", label: "事業内容" },
  { href: "/cases", label: "支援事例" },
  { href: "/seminar", label: "セミナー" },
  { href: "/subsidy", label: "助成金" },
  { href: "/company-tour", label: "企業見学" },
  { href: "/grants", label: "関連リンク" },
] as const;

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border-light">
      <div className="mx-auto max-w-6xl px-4 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex min-w-0 items-center gap-3 shrink-0">
            <AdachiCityLogo
              className="h-10 w-auto shrink-0 sm:h-11"
              width={293}
              height={136}
              priority
            />
            <span className="hidden text-sm font-bold leading-tight text-text md:block">
              足立区 区内中小企業人材確保支援事業
            </span>
          </Link>

          {/* デスクトップナビ */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-3 py-1.5 text-[13px] font-medium text-text-light hover:text-brand transition-colors whitespace-nowrap"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="ml-3 inline-flex items-center bg-brand hover:bg-brand-dark text-white text-[13px] font-bold py-2 px-5 rounded-full transition-colors whitespace-nowrap"
            >
              お問い合わせ
            </Link>
          </nav>

          {/* ハンバーガー */}
          <button
            type="button"
            className="lg:hidden p-3 -mr-1 text-text-light"
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-label="メニューを開く"
          >
            <div className="w-5 flex flex-col gap-[5px]">
              <span
                className={`block h-[2px] bg-current transition-all duration-300 origin-center ${
                  isOpen ? "rotate-45 translate-y-[7px]" : ""
                }`}
              />
              <span
                className={`block h-[2px] bg-current transition-all duration-300 ${
                  isOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block h-[2px] bg-current transition-all duration-300 origin-center ${
                  isOpen ? "-rotate-45 -translate-y-[7px]" : ""
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* モバイルナビ */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-[500px]" : "max-h-0"
        }`}
      >
        <nav className="bg-white border-t border-border-light">
          <div className="px-4 py-2">
            <Link
              href="/"
              className="block py-3 text-sm text-text-light hover:text-brand transition-colors border-b border-border-light"
              onClick={() => setIsOpen(false)}
            >
              ホーム
            </Link>
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block py-3 text-sm text-text-light hover:text-brand transition-colors border-b border-border-light last:border-b-0"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="block mt-3 mb-2 text-center bg-brand text-white text-sm font-bold py-3 rounded-full transition-colors"
              onClick={() => setIsOpen(false)}
            >
              お問い合わせ
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
