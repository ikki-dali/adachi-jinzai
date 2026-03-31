import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import FadeIn from "@/components/FadeIn";
import Link from "next/link";

export const metadata: Metadata = {
  title: "助成金・補助金のご案内",
  description:
    "費用負担を抑えて、魅力的な職場環境づくりを。足立区の人材定着サポート助成金と、都・国の補助金情報をご紹介。",
};

const ADACHI_MENUS = [
  {
    label: "A",
    title: "職場環境整備",
    tagline: "従業員が快適に働ける環境づくりをサポートします。",
    examples: [
      "従業員用のトイレ・ロッカー・休憩室の整備",
      "空調設備の導入",
      "手すり・段差解消などのバリアフリー工事",
    ],
    rate: "対象経費（工事・設計費など）の 1/2",
    max: "上限100万円",
    color: "bg-brand",
  },
  {
    label: "B",
    title: "熱中症対策",
    tagline: "夏の過酷な現場環境を改善し、従業員の健康と安全を守ります。",
    examples: [
      "スポットクーラーの設置",
      "作業場の空調設備導入・更新",
      "ファン付きベストなど熱中症対策物品の購入",
    ],
    rate: "対象経費（工事費や購入費など）の 1/2",
    max: "上限40万円",
    color: "bg-accent",
  },
  {
    label: "C",
    title: "就業規則の新規作成・改定",
    tagline: "時代に合わせた働き方のルール作りをサポートします。",
    examples: [
      "多様な勤務形態や休暇制度の設定",
      "人材育成方針の策定",
      "社内メンター制度の整備",
    ],
    rate: "対象経費（社会保険労務士への委託費・報酬）の 1/2",
    max: "上限10万円",
    color: "bg-[#e67e22]",
  },
] as const;

const OTHER_LINKS = [
  {
    name: "東京都の助成金情報ポータルサイト",
    description:
      "東京都が実施する中小企業向け助成金・補助金の最新情報をまとめたポータルサイトです。",
  },
  {
    name: "厚生労働省：雇用関係助成金検索ツール",
    description:
      "国が実施する雇用関係の助成金を、目的・対象から検索できるツールです。",
  },
  {
    name: "IT導入補助金 公式サイト",
    description:
      "中小企業・小規模事業者のIT導入を支援する補助金の申請情報です。",
  },
] as const;

export default function SubsidyPage() {
  return (
    <>
      <PageHeader
        title="助成金・補助金のご案内"
        titleEn="Subsidy & Grants"
        description="費用負担を抑えて、魅力的な職場環境づくりを。"
        illustration={{
          src: "/images/illust/data-analysis.png",
          alt: "データ分析するイラスト",
        }}
      />

      <div className="py-16 sm:py-24">
        <div className="mx-auto max-w-5xl px-4 lg:px-8">
          {/* 導入文 */}
          <FadeIn>
            <div className="text-text-muted text-sm sm:text-base leading-relaxed mb-16 max-w-3xl mx-auto text-center space-y-4">
              <p>
                「従業員のための休憩室を作りたい」「夏の熱中症対策を強化したい」「多様な働き方に合わせて就業規則を見直したい」——そんな人材定着に向けた企業の取り組みを資金面からバックアップする助成金をご紹介します。
              </p>
              <p>
                本事業では、助成金の申請や制度作りに向けた専門家（社会保険労務士や中小企業診断士など）の<span className="font-bold text-brand">無料派遣サポート</span>も行っています。
              </p>
            </div>
          </FadeIn>

          {/* 2カード：企業見学ページ風の導線 */}
          <FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
              <a
                href="#adachi-subsidy"
                className="bg-brand-bg border border-brand/10 rounded-2xl p-6 hover:border-brand/30 transition-colors"
              >
                <h3 className="font-bold text-text mb-2 flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-brand shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0H5m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                  足立区の助成金
                </h3>
                <p className="text-sm text-text-muted leading-relaxed">
                  区内中小企業人材定着サポート助成金（職場環境整備・熱中症対策・就業規則）の詳細と、専門家による無料サポートのご案内。
                </p>
              </a>
              <a
                href="#other-grants"
                className="bg-accent-bg border border-accent/10 rounded-2xl p-6 hover:border-accent/30 transition-colors"
              >
                <h3 className="font-bold text-text mb-2 flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-accent shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                    />
                  </svg>
                  東京都・国の補助金情報
                </h3>
                <p className="text-sm text-text-muted leading-relaxed">
                  IT導入や業務効率化、採用活動に使える国や東京都の補助金・助成金の情報リンク集。
                </p>
              </a>
            </div>
          </FadeIn>

          {/* ====== セクション1: 足立区の助成金 ====== */}
          <section id="adachi-subsidy">
            <FadeIn>
              <div className="flex items-center gap-3 mb-3">
                <span className="inline-flex items-center justify-center w-10 h-10 bg-brand text-white text-sm font-bold rounded-2xl">
                  区
                </span>
                <h2 className="text-xl font-bold text-text">
                  区内中小企業人材定着サポート助成金
                </h2>
              </div>
              <p className="text-sm text-text-muted leading-relaxed mb-10 max-w-3xl">
                足立区内の中小企業が、人材定着を図るための労働環境整備などに掛かった経費の一部を助成します。目的別に以下の3つのメニューをご活用いただけます。
              </p>
            </FadeIn>

            <div className="space-y-6">
              {ADACHI_MENUS.map((menu, i) => (
                <FadeIn key={menu.label} delay={i * 100}>
                  <div className="bg-white border border-border rounded-2xl p-5 sm:p-7">
                    <div className="flex items-center gap-3 mb-3">
                      <span
                        className={`inline-flex items-center justify-center w-8 h-8 ${menu.color} text-white text-xs font-bold rounded-xl`}
                      >
                        {menu.label}
                      </span>
                      <h3 className="font-bold text-text text-lg">
                        {menu.title}
                      </h3>
                    </div>
                    <p className="text-sm text-text-muted mb-4">
                      {menu.tagline}
                    </p>

                    <div className="bg-bg-section rounded-xl p-4 mb-4">
                      <p className="text-xs font-bold text-text-muted mb-2">
                        対象となる取り組み例
                      </p>
                      <ul className="space-y-1">
                        {menu.examples.map((ex) => (
                          <li
                            key={ex}
                            className="text-sm text-text-light flex items-start gap-2"
                          >
                            <span className="text-brand mt-1 shrink-0">•</span>
                            {ex}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-sm">
                      <div>
                        <span className="text-text-muted">助成率：</span>
                        <span className="text-text font-medium">
                          {menu.rate}
                        </span>
                      </div>
                      <div>
                        <span className="text-text-muted">上限額：</span>
                        <span className="text-brand font-bold text-lg">
                          {menu.max}
                        </span>
                      </div>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>

            {/* 専門家サポート */}
            <FadeIn>
              <div className="mt-10 bg-brand-bg border border-brand/15 rounded-2xl p-6 sm:p-8">
                <div className="flex items-start gap-3 mb-4">
                  <svg
                    className="w-6 h-6 text-brand shrink-0 mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                  <h3 className="font-bold text-text text-lg">
                    区内中小企業人材定着サポート：専門家による無料サポート
                  </h3>
                </div>
                <p className="text-sm text-text-muted leading-relaxed mb-4">
                  助成金を活用したいけれど「何から始めればいいかわからない」「自社に合った環境整備のアドバイスが欲しい」という企業様へ。
                </p>
                <p className="text-sm text-text-light leading-relaxed">
                  本事業にお申し込みいただくと、申請前と事業実施後の<span className="font-bold text-brand">計2回</span>、実務経験豊富な専門家（中小企業診断士、社会保険労務士等）が<span className="font-bold text-brand">無料</span>で御社を訪問します。現状の課題洗い出しから、効果的な設備導入や就業規則作成のアドバイスまで、専門家がしっかり伴走します。
                </p>
              </div>
            </FadeIn>
          </section>

          {/* ====== セクション2: その他の補助金・助成金 ====== */}
          <section id="other-grants" className="mt-20">
            <FadeIn>
              <div className="flex items-center gap-3 mb-3">
                <span className="inline-flex items-center justify-center w-10 h-10 bg-accent text-white text-sm font-bold rounded-2xl">
                  他
                </span>
                <h2 className="text-xl font-bold text-text">
                  東京都・国が実施する各種支援情報
                </h2>
              </div>
              <p className="text-sm text-text-muted leading-relaxed mb-8 max-w-3xl">
                足立区の助成金以外にも、IT導入や業務効率化、採用活動に使える国や東京都の補助金・助成金が多数あります。詳細や最新情報は各リンク先よりご確認ください。
              </p>
            </FadeIn>

            <div className="space-y-4">
              {OTHER_LINKS.map((link, i) => (
                <FadeIn key={link.name} delay={i * 80}>
                  <div className="bg-white border border-border rounded-2xl p-5 sm:p-6 flex items-start gap-4">
                    <svg
                      className="w-5 h-5 text-accent shrink-0 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                    <div>
                      <h3 className="font-bold text-text">{link.name}</h3>
                      <p className="mt-1 text-sm text-text-muted leading-relaxed">
                        {link.description}
                      </p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>

            <FadeIn>
              <p className="mt-6 text-sm text-brand font-medium bg-brand-bg rounded-xl p-4">
                どの中小企業向け補助金が自社に最適か、アドバイザリー支援（無料）の中でアドバイスすることも可能です。
              </p>
            </FadeIn>
          </section>

          {/* チラシPDF */}
          <FadeIn>
            <div className="mt-16 bg-white border border-border rounded-2xl p-6 sm:p-8">
              <h3 className="font-bold text-text text-lg mb-3">
                案内チラシ（PDF）
              </h3>
              <p className="text-text-muted text-sm mb-4">
                区内中小企業人材定着サポート助成金の案内チラシをご覧いただけます。
              </p>
              <a
                href="/docs/teichaku-support-flyer.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-brand font-bold hover:underline"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                チラシを見る（PDF）
              </a>
            </div>
          </FadeIn>

          {/* CTA */}
          <FadeIn>
            <div className="mt-8 bg-bg-section rounded-2xl p-8 sm:p-10 text-center">
              <h3 className="font-bold text-text text-lg mb-2">
                助成金の活用に関するご相談・お問い合わせ
              </h3>
              <p className="text-text-muted text-sm mb-6 max-w-lg mx-auto">
                「うちの会社はこの助成金の対象になる？」「専門家に一度相談してみたい」など、まずはお気軽にお問い合わせください。
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://www.city.adachi.tokyo.jp/chusho/jinzaiteicyakusapoto.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center bg-brand hover:bg-brand/90 text-white font-bold py-3.5 px-8 rounded-full transition-colors"
                >
                  足立区の助成金ページを見る
                  <svg className="ml-2 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center bg-accent hover:bg-accent-light text-white font-bold py-3.5 px-8 rounded-full transition-colors"
                >
                  無料相談に申し込む
                  <svg className="ml-2 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </>
  );
}
