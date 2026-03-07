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
                    className="group block bg-white border border-border rounded-lg hover:border-brand/30 transition-colors"
                  >
                    <div className="flex flex-col sm:flex-row">
                      {seminar.thumbnail && (
                        <div className="relative sm:w-64 shrink-0 aspect-video sm:aspect-auto sm:min-h-[160px] overflow-hidden bg-bg-section rounded-t-lg sm:rounded-t-none sm:rounded-l-lg">
                          <Image
                            src={seminar.thumbnail.url}
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
              <div className="text-center py-16">
                <p className="text-xl font-bold text-text-muted mb-3">
                  現在予定されているセミナーはありません
                </p>
                <p className="text-sm text-text-muted">
                  新しいセミナーが企画され次第、こちらに掲載いたします。
                </p>
              </div>
            </FadeIn>
          )}

          <FadeIn>
            <div className="mt-12 text-center">
              <Link
                href="/contact"
                className="inline-flex items-center bg-brand hover:bg-brand-dark text-white font-bold py-3.5 px-8 rounded transition-colors"
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
