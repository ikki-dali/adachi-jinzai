import Link from "next/link";
import Image from "next/image";
import { getNews } from "@/lib/microcms";
import FadeIn from "@/components/FadeIn";
import ServiceIcon from "@/components/ServiceIcon";
import HeroIllustration from "@/components/HeroIllustration";

const SERVICES = [
  {
    title: "コンサルティング支援",
    description:
      "人材に関する課題への改善内容をご提案。経験豊富なコンサルタントが伴走します。",
    href: "/advisory",
    num: "01",
    icon: "consulting" as const,
  },
  {
    title: "企業見学会",
    description:
      "就職希望の学生へ企業見学を実施。未来の人材との出会いの場を創ります。",
    href: "/company-tour",
    num: "02",
    icon: "tour" as const,
  },
  {
    title: "セミナー開催",
    description:
      "人材の確保、定着、育成に関するテーマでセミナーを定期開催しています。",
    href: "/seminar",
    num: "03",
    icon: "seminar" as const,
  },
] as const;

export default async function Home() {
  const news = await getNews({ limit: 5 });

  return (
    <>
      {/* ====== ヒーロー ====== */}
      <section className="relative overflow-hidden">
        {/* 背景のグラデーション装飾 */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-bg via-white to-accent-bg/30" />
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-accent/[0.06]" />
        <div className="absolute -bottom-40 left-1/4 w-[500px] h-[500px] rounded-full bg-brand/[0.04]" />

        <div className="relative z-10 mx-auto max-w-6xl px-4 lg:px-8 py-16 sm:py-20">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
            {/* テキスト側 */}
            <div className="flex-1 text-center lg:text-left">
              <p className="text-brand text-sm font-bold mb-4">
                足立区 区内中小企業人材確保支援事業
              </p>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text leading-tight">
                人手不足に悩む企業の
                <br />
                <span className="text-brand">活気あふれる職場づくり</span>
                を応援
              </h1>
              <p className="mt-6 text-text-muted leading-relaxed max-w-lg mx-auto lg:mx-0">
                経験豊富なコンサルタントが、人材確保に関する課題を解決します。
                コンサルティング支援、企業見学会、セミナー開催など、
                多角的にサポートいたします。
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center bg-brand hover:bg-brand-dark text-white font-bold py-3.5 px-8 rounded transition-colors"
                >
                  お問い合わせ・お申し込み
                  <svg className="ml-2 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                </Link>
                <Link
                  href="/advisory"
                  className="inline-flex items-center justify-center border-2 border-brand text-brand hover:bg-brand hover:text-white font-bold py-3.5 px-8 rounded transition-colors"
                >
                  事業内容紹介
                  <svg className="ml-2 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                </Link>
              </div>
            </div>
            {/* イラスト側 */}
            <div className="flex-1 max-w-xs sm:max-w-sm lg:max-w-lg">
              <HeroIllustration className="w-full h-auto" />
            </div>
          </div>
        </div>
      </section>

      {/* ====== お知らせ ====== */}
      <section className="py-16 sm:py-20 bg-bg-light">
        <div className="mx-auto max-w-6xl px-4 lg:px-8">
          <FadeIn>
            <h2 className="text-center text-xl font-bold text-brand mb-8">
              お知らせ
            </h2>
          </FadeIn>

          <FadeIn delay={80}>
            <div className="max-w-3xl mx-auto bg-white rounded-lg border border-border p-6">
              {news.contents.length > 0 ? (
                <ul className="divide-y divide-border-light">
                  {news.contents.map((item) => (
                    <li key={item.id} className="py-4 first:pt-0 last:pb-0">
                      <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                        <time className="text-sm text-text-muted shrink-0 tabular-nums">
                          {new Date(item.date).toLocaleDateString("ja-JP", {
                            year: "numeric",
                            month: "2-digit",
                            day: "2-digit",
                          })}
                        </time>
                        {item.category && (
                          <span className="inline-flex self-start px-2 py-0.5 text-xs font-bold text-brand bg-brand-bg rounded">
                            {item.category}
                          </span>
                        )}
                        <span className="text-sm text-text flex-1">
                          {item.title}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-text-muted text-sm text-center py-4">
                  現在お知らせはありません。
                </p>
              )}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ====== 支援内容 ====== */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {SERVICES.map((service, i) => (
              <FadeIn key={service.href} delay={i * 80}>
                <Link
                  href={service.href}
                  className="group block text-center"
                >
                  {/* 丸いアイコン枠 */}
                  <div className="relative mx-auto w-48 h-48 mb-6">
                    <div className="absolute inset-0 rounded-full bg-[#fdf6e3] border-2 border-[#e8dcc8] group-hover:border-brand/30 transition-colors" />
                    <div className="absolute -top-1 -right-1 bg-brand text-white text-xs font-bold w-12 h-12 rounded-full flex items-center justify-center leading-tight z-10 shadow-sm">
                      支援
                      <br />
                      {service.num}
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <ServiceIcon type={service.icon} className="w-32 h-32" />
                    </div>
                  </div>
                  <h3 className="font-bold text-lg text-text group-hover:text-brand transition-colors mb-3">
                    {service.title}
                  </h3>
                  <p className="text-sm text-text-muted leading-relaxed">
                    {service.description}
                  </p>
                </Link>
              </FadeIn>
            ))}
          </div>

          <FadeIn>
            <div className="mt-12 text-center">
              <Link
                href="/advisory"
                className="inline-flex items-center bg-brand hover:bg-brand-dark text-white font-bold py-3.5 px-8 rounded transition-colors"
              >
                事業内容紹介
                <svg className="ml-2 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ====== 支援事例・関連リンク ====== */}
      <section className="py-16 sm:py-20 bg-bg-light">
        <div className="mx-auto max-w-4xl px-4 lg:px-8 space-y-8">
          {/* 支援事例紹介 */}
          <FadeIn>
            <Link href="/cases" className="group block bg-white border border-border rounded-xl p-6 sm:p-8 hover:border-brand/30 transition-colors">
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <div className="w-28 h-28 shrink-0">
                  <Image src="/images/illust/presentation-female.png" alt="成功事例を紹介するイラスト" width={112} height={112} className="w-full h-full object-contain" />
                </div>
                <div className="text-center sm:text-left flex-1">
                  <h3 className="text-lg font-bold text-brand mb-2">支援事例紹介</h3>
                  <p className="text-sm text-text-muted leading-relaxed">
                    人材不足に悩む中小企業の成功事例を紹介します。
                    市場や仕員数規模の大小に関わらず、
                    足業種やケースに合わせたコンサルティング事例をご覧ください。
                  </p>
                  <span className="inline-flex items-center mt-3 text-sm text-brand font-bold group-hover:underline">
                    支援事例紹介
                    <svg className="ml-1 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                  </span>
                </div>
              </div>
            </Link>
          </FadeIn>

          {/* 関連リンク */}
          <FadeIn delay={80}>
            <Link href="/grants" className="group block bg-white border border-border rounded-xl p-6 sm:p-8 hover:border-brand/30 transition-colors">
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <div className="w-28 h-28 shrink-0">
                  <Image src="/images/illust/online-conversation.png" alt="オンラインで相談するイラスト" width={112} height={112} className="w-full h-full object-contain" />
                </div>
                <div className="text-center sm:text-left flex-1">
                  <h3 className="text-lg font-bold text-brand mb-2">関連リンク</h3>
                  <p className="text-sm text-text-muted leading-relaxed">
                    足立区内の中小企業が活用できる補助金や助成金などの情報、また東京都や国などの関連リンクをご紹介します。
                  </p>
                  <span className="inline-flex items-center mt-3 text-sm text-brand font-bold group-hover:underline">
                    関連リンク
                    <svg className="ml-1 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                  </span>
                </div>
              </div>
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* ====== CTA ====== */}
      <section className="relative py-20 sm:py-28 overflow-hidden">
        {/* 背景グラデーション */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-bg via-bg-section to-accent-bg/20" />
        <div className="absolute -top-20 right-[10%] w-72 h-72 rounded-full bg-brand/[0.03]" />
        <div className="absolute -bottom-32 -left-16 w-96 h-96 rounded-full bg-accent/[0.04]" />

        <div className="relative z-10 mx-auto max-w-6xl px-4 lg:px-8 text-center">
          <FadeIn>
            <h2 className="text-2xl sm:text-3xl font-bold text-text mb-4">
              お気軽にご相談ください
            </h2>
            <p className="text-text-muted max-w-lg mx-auto mb-8">
              人材確保に関するお悩み、助成金の活用方法、セミナーへの参加など、
              どんなことでもお気軽にお問い合わせください。費用は一切かかりません。
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center bg-brand hover:bg-brand-dark text-white font-bold py-4 px-10 rounded transition-colors"
            >
              お問い合わせ・お申し込み
              <svg className="ml-2 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
            </Link>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
