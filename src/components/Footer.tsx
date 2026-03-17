import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#1a1a2e] text-white/80">
      <div className="mx-auto max-w-5xl px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* 事業情報 */}
          <div className="md:col-span-5">
            <span className="font-accent text-2xl text-white/40">Adachi Jinzai</span>
            <p className="mt-2 text-sm font-bold text-white">
              足立区 区内中小企業人材確保支援事業
            </p>
            <div className="mt-4 space-y-1 text-sm text-white/40">
              <p>足立区 区内中小企業人材確保支援事業 事務局</p>
              <p>〒120-XXXX 東京都足立区XXXX</p>
              <p>TEL: 03-XXXX-XXXX</p>
              <p>受付時間：平日10時00分〜17時30分</p>
            </div>
          </div>

          {/* ナビ */}
          <div className="md:col-span-3">
            <p className="text-xs font-bold text-white/30 uppercase tracking-widest mb-4">Menu</p>
            <ul className="space-y-2.5">
              {[
                { href: "/", label: "ホーム" },
                { href: "/advisory", label: "事業内容紹介" },
                { href: "/cases", label: "支援事例紹介" },
                { href: "/seminar", label: "セミナー" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-white/50 hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <p className="text-xs font-bold text-white/30 uppercase tracking-widest mb-4">Links</p>
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
                    className="text-sm text-white/50 hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 text-center">
          <p className="text-xs text-white/25">
            &copy; {new Date().getFullYear()} 足立区 区内中小企業人材確保支援事業
          </p>
        </div>
      </div>
    </footer>
  );
}
