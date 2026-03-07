import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#2c3e50] text-white/80">
      <div className="mx-auto max-w-6xl px-4 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* 事業情報 */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-2 mb-4">
              <svg width="24" height="24" viewBox="0 0 32 32" fill="none">
                <path d="M4 16L16 4L28 16L16 28Z" fill="#fff" opacity="0.15" />
                <path d="M8 16L16 8L24 16L16 24Z" fill="#fff" opacity="0.3" />
                <path d="M12 16L16 12L20 16L16 20Z" fill="#fff" />
              </svg>
              <span className="text-sm font-bold text-white">
                足立区 区内中小企業人材確保支援事業
              </span>
            </div>
            <p className="text-sm leading-relaxed text-white/50 mt-3">
              足立区 区内中小企業人材確保支援事業 事務局
            </p>
            <div className="mt-4 space-y-1 text-sm text-white/50">
              <p>〒120-XXXX</p>
              <p>東京都足立区XXXX</p>
              <p>TEL: 03-XXXX-XXXX</p>
              <p>受付時間：平日10時00分〜17時30分</p>
            </div>
          </div>

          {/* ナビ */}
          <div className="md:col-span-3">
            <ul className="space-y-2.5">
              {[
                { href: "/", label: "HOME" },
                { href: "/advisory", label: "事業内容紹介" },
                { href: "/cases", label: "支援事例紹介" },
                { href: "/seminar", label: "セミナー" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-white/60 hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <ul className="space-y-2.5">
              {[
                { href: "/subsidy", label: "助成金情報" },
                { href: "/company-tour", label: "企業見学" },
                { href: "/grants", label: "関連リンク" },
                { href: "/contact", label: "お問い合わせ" },
                { href: "/privacy", label: "プライバシーポリシー" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-white/60 hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/10 text-center">
          <p className="text-xs text-white/30">
            &copy; {new Date().getFullYear()} 足立区 区内中小企業人材確保支援事業 ALL
            RIGHTS RESERVED
          </p>
        </div>
      </div>
    </footer>
  );
}
