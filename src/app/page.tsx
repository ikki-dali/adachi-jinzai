import Link from "next/link";
import { getNews } from "@/lib/microcms";
import FadeIn from "@/components/FadeIn";
import HeroVideo from "@/components/HeroVideo";

const SERVICES = [
  {
    title: "コンサルティング支援",
    en: "Consulting",
    description:
      "課題のヒアリングから改善提案まで、経験豊富なコンサルタントが伴走します。",
    href: "/advisory",
    num: "01",
  },
  {
    title: "企業見学会",
    en: "Company Tour",
    description:
      "就職希望の学生と企業をつなぐ見学会。未来の仲間との出会いの場を創ります。",
    href: "/company-tour",
    num: "02",
  },
  {
    title: "セミナー開催",
    en: "Seminar",
    description:
      "人材の確保・定着・育成をテーマに、実践的なセミナーを定期開催しています。",
    href: "/seminar",
    num: "03",
  },
] as const;

export default async function Home() {
  const news = await getNews({ limit: 5 });

  return (
    <>
      {/* ====== 固定動画背景（最下層） ====== */}
      <div className="fixed inset-0 z-0">
        <HeroVideo />
        <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-black/20 to-white/50" />
      </div>

      {/* ====== ヒーロー ====== */}
      <section className="relative z-10 min-h-screen flex items-center">
        <div className="mx-auto max-w-6xl px-4 lg:px-8 py-20 sm:py-28 text-center">
          {/* 手書き風の大きな英語テキスト */}
          <span className="font-accent text-5xl sm:text-7xl lg:text-8xl text-white/70 drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)] leading-none">
            Challenge
          </span>
          <p className="mt-2 text-white/80 text-sm tracking-[0.3em] drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)]">
            — 変化を、ここから —
          </p>

          <h1 className="mt-8 text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]">
            人手不足に悩む企業の
            <br />
            <span className="text-cyan">活気あふれる職場づくり</span>を
          </h1>
          <p className="mt-6 text-white/85 leading-relaxed max-w-md mx-auto text-[15px] drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]">
            足立区の中小企業を、コンサルティング・見学会・セミナーで
            多角的にサポート。費用は一切かかりません。
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center bg-accent hover:bg-accent-light text-white font-bold py-4 px-10 rounded-full shadow-lg transition-colors text-sm tracking-wide"
            >
              無料で相談する
              <svg className="ml-2 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
            </Link>
            <Link
              href="/advisory"
              className="inline-flex items-center justify-center border-2 border-white/60 text-white hover:bg-white hover:text-text font-bold py-4 px-10 rounded-full transition-colors backdrop-blur-sm text-sm tracking-wide"
            >
              事業内容を見る
            </Link>
          </div>
        </div>
      </section>

      {/* ====== メインコンテンツ ====== */}
      <div className="relative z-20">
        <div className="relative -mt-12">
          {/* 斜めの切り替え演出 */}
          <div className="absolute -top-16 left-0 right-0 h-20 bg-white" style={{ clipPath: "polygon(0 100%, 100% 30%, 100% 100%, 0 100%)" }} />

          {/* ====== イントロ + お知らせ ====== */}
          <section className="pt-24 pb-20 sm:pt-32 sm:pb-24 bg-white">
            <div className="mx-auto max-w-5xl px-4 lg:px-8">
              <FadeIn>
                <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-20">
                  {/* 左：手書き風テキスト */}
                  <div className="lg:w-2/5">
                    <span className="font-accent text-5xl sm:text-6xl text-brand leading-none">Here!</span>
                    <h2 className="mt-4 text-2xl sm:text-3xl font-bold text-text leading-snug">
                      全てはココから
                      <br />
                      はじまる。
                    </h2>
                  </div>
                  {/* 右：説明テキスト */}
                  <div className="lg:w-3/5">
                    <p className="text-sm text-text-light leading-[2.2]">
                      足立区では区内中小企業の人材確保を総合的に支援するため、
                      経験豊富なコンサルタントによる伴走型のサポートを提供しています。
                      採用活動の見直しから職場環境の改善まで、企業の課題に合わせた
                      オーダーメイドの支援で、持続的な人材確保を実現します。
                    </p>
                    <Link
                      href="/advisory"
                      className="mt-8 inline-flex items-center border border-text text-text text-sm py-3 px-8 rounded-full hover:bg-text hover:text-white transition-colors"
                    >
                      事業内容
                    </Link>
                  </div>
                </div>
              </FadeIn>

              {/* お知らせ */}
              <FadeIn delay={100}>
                <div className="mt-20 pt-12 border-t border-border-light">
                  <div className="flex items-center gap-4 mb-8">
                    <span className="font-accent text-4xl text-brand/20 leading-none">News</span>
                    <h3 className="text-base font-bold text-text">お知らせ</h3>
                  </div>
                  <div className="max-w-3xl">
                    {news.contents.length > 0 ? (
                      <ul>
                        {news.contents.map((item) => (
                          <li key={item.id} className="py-4 border-b border-border-light">
                            <div className="flex flex-col sm:flex-row gap-2 sm:gap-5 items-start sm:items-center">
                              <time className="text-xs text-text-muted shrink-0 tabular-nums tracking-wide">
                                {new Date(item.date).toLocaleDateString("ja-JP", {
                                  year: "numeric",
                                  month: "2-digit",
                                  day: "2-digit",
                                })}
                              </time>
                              {item.category && (
                                <span className="inline-flex px-2.5 py-0.5 text-[11px] font-bold text-accent bg-accent-bg rounded-full">
                                  {item.category}
                                </span>
                              )}
                              <span className="text-sm text-text flex-1">{item.title}</span>
                            </div>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-text-muted text-sm py-4">現在お知らせはありません。</p>
                    )}
                  </div>
                </div>
              </FadeIn>
            </div>
          </section>

          {/* ====== 支援内容（シアンアクセント帯） ====== */}
          <section className="relative py-24 sm:py-32 overflow-hidden">
            {/* 斜めの背景 */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-bg via-brand-bg to-white" />
            <div className="absolute top-0 left-0 right-0 h-20 bg-white" style={{ clipPath: "polygon(0 0, 100% 0, 100% 0%, 0 100%)" }} />
            <div className="absolute bottom-0 left-0 right-0 h-20 bg-white" style={{ clipPath: "polygon(0 100%, 100% 0%, 100% 100%, 0 100%)" }} />

            <div className="relative z-10 mx-auto max-w-5xl px-4 lg:px-8">
              <FadeIn>
                <div className="text-center mb-16">
                  <span className="font-accent text-6xl sm:text-7xl text-brand/10 leading-none block">
                    Keep on Moving
                  </span>
                  <p className="mt-1 font-accent text-3xl text-brand/40">Support</p>
                  <h2 className="mt-4 text-xl sm:text-2xl font-bold text-text">
                    3つの支援で、<span className="text-brand">御社の力に。</span>
                  </h2>
                </div>
              </FadeIn>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                {SERVICES.map((service, i) => (
                  <FadeIn key={service.href} delay={i * 100}>
                    <Link
                      href={service.href}
                      className="group block bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all hover:-translate-y-1"
                    >
                      <span className="font-accent text-5xl font-bold text-brand/15 leading-none">
                        {service.num}
                      </span>
                      <p className="mt-1 text-xs font-bold text-accent tracking-widest uppercase">
                        {service.en}
                      </p>
                      <h3 className="mt-4 font-bold text-lg text-text group-hover:text-brand transition-colors">
                        {service.title}
                      </h3>
                      <p className="mt-3 text-sm text-text-muted leading-relaxed">
                        {service.description}
                      </p>
                      <span className="inline-flex items-center mt-6 text-sm text-brand font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                        詳しく見る →
                      </span>
                    </Link>
                  </FadeIn>
                ))}
              </div>
            </div>
          </section>

          {/* ====== もっと知る ====== */}
          <section className="py-24 sm:py-32 bg-white">
            <div className="mx-auto max-w-5xl px-4 lg:px-8">
              <FadeIn>
                <div className="text-center mb-14">
                  <span className="font-accent text-5xl sm:text-6xl text-brand/10 leading-none">More</span>
                  <h2 className="mt-2 text-xl sm:text-2xl font-bold text-text">もっと知る</h2>
                </div>
              </FadeIn>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <FadeIn>
                  <Link href="/cases" className="group block bg-bg-light rounded-2xl p-8 hover:bg-brand-pale transition-colors">
                    <p className="text-xs font-bold text-accent tracking-widest uppercase mb-3">Case Study</p>
                    <h3 className="text-lg font-bold text-text group-hover:text-brand transition-colors">支援事例紹介</h3>
                    <p className="mt-3 text-sm text-text-muted leading-relaxed">
                      業種や規模に合わせたコンサルティングで、
                      人材確保に成功した企業の事例をご紹介。
                    </p>
                    <span className="inline-flex items-center mt-5 text-sm text-brand font-bold">
                      事例を見る
                      <svg className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                    </span>
                  </Link>
                </FadeIn>

                <FadeIn delay={80}>
                  <Link href="/grants" className="group block bg-bg-light rounded-2xl p-8 hover:bg-brand-pale transition-colors">
                    <p className="text-xs font-bold text-accent tracking-widest uppercase mb-3">Useful Links</p>
                    <h3 className="text-lg font-bold text-text group-hover:text-brand transition-colors">助成金・関連リンク</h3>
                    <p className="mt-3 text-sm text-text-muted leading-relaxed">
                      足立区内の中小企業が活用できる補助金・助成金、
                      東京都・国の関連情報をまとめています。
                    </p>
                    <span className="inline-flex items-center mt-5 text-sm text-brand font-bold">
                      リンク集を見る
                      <svg className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                    </span>
                  </Link>
                </FadeIn>
              </div>
            </div>
          </section>

          {/* ====== CTA ====== */}
          <section className="py-28 sm:py-36 bg-gradient-to-br from-brand to-brand-dark text-white">
            <div className="mx-auto max-w-5xl px-4 lg:px-8 text-center">
              <FadeIn>
                <span className="font-accent text-5xl sm:text-6xl text-white/15 leading-none">Contact</span>
                <h2 className="mt-3 text-2xl sm:text-3xl font-bold">
                  まずは気軽に、相談してみませんか？
                </h2>
                <p className="mt-4 text-white/70 max-w-md mx-auto text-sm leading-relaxed">
                  人材確保のお悩み、助成金の活用、セミナーへの参加など、
                  どんな小さなことでもOK。すべて無料です。
                </p>
                <Link
                  href="/contact"
                  className="mt-10 inline-flex items-center bg-white text-brand hover:bg-white/90 font-bold py-4 px-12 rounded-full shadow-lg transition-colors text-sm"
                >
                  無料で相談する
                  <svg className="ml-2 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                </Link>
              </FadeIn>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
