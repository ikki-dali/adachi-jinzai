import Link from "next/link";
import Image from "next/image";

const FOOTER_MENU = [
  { href: "/", label: "ホーム" },
  { href: "/advisory", label: "事業内容紹介" },
  { href: "/cases", label: "支援事例紹介" },
  { href: "/seminar", label: "セミナー" },
] as const;

const FOOTER_LINKS = [
  { href: "/subsidy", label: "助成金情報" },
  { href: "/company-tour", label: "企業見学" },
  { href: "/grants", label: "関連リンク" },
  { href: "/contact", label: "お問い合わせ" },
  { href: "https://www.sigma-staff.co.jp/corp/privacy.shtml", label: "プライバシーポリシー", external: true },
] as const;

const FOOTER_BAR_LINKS = [
  { href: "/", label: "ホーム" },
  { href: "/advisory", label: "事業内容" },
  { href: "/cases", label: "支援事例" },
  { href: "/seminar", label: "セミナー" },
  { href: "/company-tour", label: "企業見学" },
  { href: "/contact", label: "お問い合わせ" },
  { href: "https://www.sigma-staff.co.jp/corp/privacy.shtml", label: "プライバシーポリシー", external: true },
] as const;

export default function Footer() {
  return (
    <footer className="relative z-20 mt-24 bg-[#1a1a2e] text-white/80">
      <div className="mx-auto max-w-5xl px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* 事業情報 */}
          <div className="md:col-span-5">
            <div className="inline-flex px-1 py-1">
              <Image
                src="/images/logos/adachi-city-symbol-dark.png"
                alt="足立区"
                width={1361}
                height={375}
                className="h-14 w-auto"
              />
            </div>
            <p className="mt-2 text-sm font-bold text-white">
              足立区 区内中小企業人材確保支援事業
            </p>
            <div className="mt-4 space-y-1 text-sm text-white/40">
              <p>足立区 区内中小企業人材確保支援事業 事務局</p>
              <p>〒120-0034 東京都足立区千住1-4-1 東京芸術センター10階</p>
              <p>TEL: 03-6806-1211</p>
              <p>受付時間：平日10時00分〜17時30分</p>
            </div>
          </div>

          {/* ナビ */}
          <div className="md:col-span-3">
            <p className="text-xs font-bold text-white/30 uppercase tracking-widest mb-4">Menu</p>
            <ul className="space-y-2.5">
              {FOOTER_MENU.map((item) => (
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
              {FOOTER_LINKS.map((item) => (
                <li key={item.href}>
                  {"external" in item && item.external ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-white/50 hover:text-white transition-colors"
                    >
                      {item.label}
                    </a>
                  ) : (
                    <Link
                      href={item.href}
                      className="text-sm text-white/50 hover:text-white transition-colors"
                    >
                      {item.label}
                    </Link>
                  )}
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

      <div className="border-t border-white/10 bg-[#0b1220] shadow-[0_-12px_30px_rgba(0,0,0,0.18)]">
        <div className="mx-auto flex min-h-24 max-w-5xl flex-col gap-4 px-4 py-5 lg:px-8 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <div className="inline-flex w-fit">
              <Image
                src="/images/logos/adachi-city-symbol-dark.png"
                alt="足立区"
                width={1361}
                height={375}
                className="h-9 w-auto"
              />
            </div>
            <nav aria-label="フッターバー" className="flex flex-wrap gap-x-4 gap-y-2">
              {FOOTER_BAR_LINKS.map((item) =>
                "external" in item && item.external ? (
                  <a
                    key={item.href}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-medium text-white/80 transition-colors hover:text-white"
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-xs font-medium text-white/80 transition-colors hover:text-white"
                  >
                    {item.label}
                  </Link>
                )
              )}
            </nav>
          </div>
          <p className="text-[11px] text-white/45">
            サイトマップとポリシー情報をこちらにまとめています。
          </p>
        </div>
      </div>
    </footer>
  );
}
