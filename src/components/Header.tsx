"use client";

import { useState } from "react";
import Link from "next/link";

const NAV_ITEMS = [
  { href: "/", label: "ホーム" },
  { href: "/advisory", label: "事業内容紹介" },
  { href: "/cases", label: "支援事例紹介" },
  { href: "/seminar", label: "セミナー" },
  { href: "/subsidy", label: "助成金情報" },
  { href: "/company-tour", label: "企業見学" },
  { href: "/grants", label: "関連リンク" },
] as const;

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-border-light">
      <div className="mx-auto max-w-6xl px-4 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* ロゴ */}
          <Link href="/" className="flex items-center gap-2">
            <svg
              width="28"
              height="28"
              viewBox="0 0 32 32"
              fill="none"
              className="shrink-0"
            >
              <path
                d="M4 16L16 4L28 16L16 28Z"
                fill="#0d6efd"
                opacity="0.15"
              />
              <path
                d="M8 16L16 8L24 16L16 24Z"
                fill="#0d6efd"
                opacity="0.4"
              />
              <path
                d="M12 16L16 12L20 16L16 20Z"
                fill="#0d6efd"
              />
            </svg>
            <span className="text-sm font-bold text-text leading-tight">
              足立区{" "}
              <span className="hidden sm:inline">区内中小企業人材確保支援事業</span>
              <span className="sm:hidden">人材確保支援</span>
            </span>
          </Link>

          {/* デスクトップナビ */}
          <nav className="hidden xl:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-3 py-1.5 text-[13px] font-medium text-text-light hover:text-brand transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="ml-2 inline-flex items-center bg-brand hover:bg-brand-dark text-white text-[13px] font-bold py-2 px-5 rounded transition-colors"
            >
              お問い合わせ
            </Link>
          </nav>

          {/* モバイルハンバーガー */}
          <button
            type="button"
            className="xl:hidden p-3 -mr-1 text-text-light"
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
        className={`xl:hidden overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-[500px]" : "max-h-0"
        }`}
      >
        <nav className="bg-white border-t border-border-light">
          <div className="px-4 py-2">
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
              className="block mt-3 mb-2 text-center bg-brand text-white text-sm font-bold py-3 rounded transition-colors"
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
