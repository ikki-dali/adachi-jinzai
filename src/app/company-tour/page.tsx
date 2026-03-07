import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import PageHeader from "@/components/PageHeader";
import FadeIn from "@/components/FadeIn";
import { getExperiences } from "@/lib/microcms";

export const metadata: Metadata = {
  title: "高校生企業見学",
  description:
    "足立区内の高校生が区内企業を見学する取り組み。体験記や受入企業紹介を掲載。",
};

export default async function CompanyTourPage() {
  const { contents: experiences } = await getExperiences();

  return (
    <>
      <PageHeader
        title="高校生企業見学"
        description="区内高校生と地元企業をつなぐ企業見学プログラム。未来の人材との出会いの場を創ります。"
        illustration={{ src: "/images/illust/teacher-student.png", alt: "教師と学生が学ぶイラスト" }}
      />

      <div className="py-16 sm:py-24">
        <div className="mx-auto max-w-5xl px-4 lg:px-8">
          {/* プログラム概要 */}
          <FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
              <div className="bg-brand-bg border border-brand/10 rounded-lg p-6">
                <h3 className="font-bold text-text mb-2 flex items-center gap-2">
                  <svg className="w-5 h-5 text-brand shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0H5m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                  企業の方へ
                </h3>
                <p className="text-sm text-text-muted leading-relaxed">
                  見学の受入れにご興味のある企業様は、お気軽にお問い合わせください。受入れ準備のサポートも行います。
                </p>
              </div>
              <div className="bg-accent-bg border border-accent/10 rounded-lg p-6">
                <h3 className="font-bold text-text mb-2 flex items-center gap-2">
                  <svg className="w-5 h-5 text-accent shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" /></svg>
                  高校・教員の方へ
                </h3>
                <p className="text-sm text-text-muted leading-relaxed">
                  企業見学の実施についてのご相談は、事務局までお問い合わせください。プログラムのカスタマイズも可能です。
                </p>
              </div>
            </div>
          </FadeIn>

          {/* 体験記 */}
          <FadeIn>
            <h2 className="text-xl font-bold text-brand text-center mb-8">
              体験記
            </h2>
          </FadeIn>

          {experiences.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {experiences.map((exp, i) => (
                <FadeIn key={exp.id} delay={i * 80}>
                  <Link
                    href={`/company-tour/${exp.id}`}
                    className="group block bg-white border border-border rounded-lg hover:border-brand/30 overflow-hidden transition-colors"
                  >
                    {exp.image && (
                      <div className="relative aspect-[4/3] overflow-hidden bg-bg-section">
                        <Image
                          src={exp.image.url}
                          alt={exp.title}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    )}
                    <div className="p-4">
                      <span className="text-xs text-text-muted">
                        {exp.schoolName}
                      </span>
                      <h3 className="mt-1 font-bold text-sm text-text group-hover:text-brand transition-colors">
                        {exp.title}
                      </h3>
                    </div>
                  </Link>
                </FadeIn>
              ))}
            </div>
          ) : (
            <FadeIn>
              <div className="text-center py-12">
                <p className="text-xl font-bold text-text-muted">
                  体験記は近日公開予定です
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
                企業見学について問い合わせる
                <svg className="ml-2 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
              </Link>
            </div>
          </FadeIn>
        </div>
      </div>
    </>
  );
}
