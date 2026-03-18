"use client";

import { useState } from "react";
import Link from "next/link";

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
          {/* ロゴ */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <svg
              width="28"
              height="28"
              viewBox="0 0 32 32"
              fill="none"
              className="shrink-0"
            >
              <path d="M4 16L16 4L28 16L16 28Z" fill="#4a7fb5" opacity="0.15" />
              <path d="M8 16L16 8L24 16L16 24Z" fill="#4a7fb5" opacity="0.4" />
              <path d="M12 16L16 12L20 16L16 20Z" fill="#4a7fb5" />
            </svg>
            <span className="text-sm font-bold text-text leading-tight">
              足立区{" "}
              <span className="hidden sm:inline">人材確保支援</span>
              <span className="sm:hidden">人材支援</span>
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
