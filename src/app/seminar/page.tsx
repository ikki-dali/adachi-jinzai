import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import PageHeader from "@/components/PageHeader";
import FadeIn from "@/components/FadeIn";
import { getSeminars } from "@/lib/microcms";

export const metadata: Metadata = {
  title: "セミナー",
  description:
    "人材確保・採用力向上に役立つセミナー・研修情報。足立区内の中小企業を対象に定期開催。",
};

export default async function SeminarPage() {
  const { contents: seminars } = await getSeminars();

  return (
    <>
      <PageHeader
        title="セミナー・研修"
        titleEn="Seminar"
        description="人材の確保、定着、育成に関するテーマでセミナーを定期開催しています。"
        illustration={{ src: "/images/illust/meeting-large.png", alt: "セミナーの様子のイラスト" }}
      />

      <div className="py-16 sm:py-24">
        <div className="mx-auto max-w-5xl px-4 lg:px-8">
          {seminars.length > 0 ? (
            <div className="space-y-5">
              {seminars.map((seminar, i) => (
                <FadeIn key={seminar.id} delay={i * 80}>
                  <Link
                    href={`/seminar/${seminar.id}`}
                    className="group block bg-white border border-border rounded-2xl hover:border-brand/30 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex flex-col sm:flex-row">
                      {seminar.thumbnail_url && (
                        <div className="relative sm:w-64 shrink-0 aspect-video sm:aspect-auto sm:min-h-[160px] overflow-hidden bg-bg-section rounded-t-2xl sm:rounded-t-none sm:rounded-l-2xl">
                          <Image
                            src={seminar.thumbnail_url}
                            alt={seminar.title}
                            fill
                            sizes="(max-width: 640px) 100vw, 256px"
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                      )}
                      <div className="flex-1 p-5 sm:p-6 flex flex-col justify-center">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <time className="text-xs text-text-muted tabular-nums">
                            {new Date(seminar.date).toLocaleDateString("ja-JP", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </time>
                          <span className="text-xs text-brand bg-brand-bg px-2 py-0.5 rounded font-bold">
                            セミナー
                          </span>
                        </div>
                        <h3 className="font-bold text-text group-hover:text-brand transition-colors">
                          {seminar.title}
                        </h3>
                        <p className="mt-2 text-sm text-text-muted line-clamp-2">
                          {seminar.description}
                        </p>
                        <div className="mt-3 flex items-center gap-4 text-xs text-text-muted">
                          <span className="flex items-center gap-1">
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                            {seminar.location}
                          </span>
                          <span>定員 {seminar.capacity}名</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </FadeIn>
              ))}
            </div>
          ) : (
            <FadeIn>
              <div className="bg-white border border-border rounded-2xl p-8 sm:p-12 text-center">
                <div className="inline-flex items-center gap-2 bg-brand-bg text-brand text-xs font-bold px-3 py-1.5 rounded-full mb-5">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Coming Soon
                </div>
                <p className="text-xl sm:text-2xl font-bold text-text mb-3">
                  令和8年度は<span className="text-brand">7月より毎月</span>セミナーを開催します
                </p>
                <p className="text-sm text-text-muted mb-6">
                  ※開催月：令和8年7月〜令和9年3月（全9回予定）
                </p>
                <div className="max-w-2xl mx-auto space-y-3 text-sm sm:text-base text-text-muted leading-relaxed">
                  <p>
                    人材の確保・定着・育成に関するノウハウやスキルを習得いただける、
                    <br className="hidden sm:block" />
                    区内中小企業向けの実践的なセミナーを毎月開催いたします。
                  </p>
                  <p>外国人材の雇用に関するセミナーも年2回以上実施予定です。</p>
                  <p>各回の詳細（テーマ・日程・会場・申込方法）は、決まり次第こちらのページでご案内いたします。</p>
                  <p className="font-bold text-text pt-2">皆様のご参加を心よりお待ちしております。</p>
                </div>
              </div>
            </FadeIn>
          )}

          <FadeIn>
            <div className="mt-12 text-center">
              <Link
                href="/contact"
                className="inline-flex items-center bg-accent hover:bg-accent-light text-white font-bold py-3.5 px-8 rounded-full transition-colors"
              >
                セミナーについて問い合わせる
                <svg className="ml-2 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
              </Link>
            </div>
          </FadeIn>
        </div>
      </div>
    </>
  );
}
