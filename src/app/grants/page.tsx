import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import FadeIn from "@/components/FadeIn";
import { getGrants } from "@/lib/microcms";

export const metadata: Metadata = {
  title: "関連リンク",
  description:
    "人材確保・定着に活用できる各種補助金・支援制度の最新情報をご案内します。",
};

export default async function GrantsPage() {
  const { contents: grants } = await getGrants();

  return (
    <>
      <PageHeader
        title="関連リンク・補助金情報"
        titleEn="Useful Links"
        description="人材確保・定着に活用できる各種補助金・支援制度をご案内します。"
        illustration={{ src: "/images/illust/fill-documents.png", alt: "書類を記入するイラスト" }}
      />

      {grants.length > 0 && (
        <div className="py-16 sm:py-24">
          <div className="mx-auto max-w-4xl px-4 lg:px-8">
            <div className="space-y-4">
              {grants.map((grant, i) => (
                <FadeIn key={grant.id} delay={i * 80}>
                  <div className="bg-white border border-border rounded-2xl p-5 sm:p-6">
                    <h3 className="font-bold text-text">
                      {grant.name}
                    </h3>
                    <p className="mt-2 text-sm text-text-muted leading-relaxed">
                      {grant.summary}
                    </p>
                    <div className="mt-3 flex flex-wrap items-center gap-4 text-sm">
                      <div>
                        <span className="text-text-muted">対象：</span>
                        <span className="text-text-light">{grant.target}</span>
                      </div>
                      <div>
                        <span className="text-text-muted">金額：</span>
                        <span className="text-brand font-bold">
                          {grant.amount}
                        </span>
                      </div>
                    </div>
                    {grant.apply_url && (
                      <a
                        href={grant.apply_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center mt-3 text-sm text-brand hover:underline font-bold"
                      >
                        詳細・申請はこちら
                        <svg className="ml-1 w-3.5 h-3.5 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                      </a>
                    )}
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 関連サイト */}
      <div className="py-16 sm:py-24 bg-bg-light">
        <div className="mx-auto max-w-4xl px-4 lg:px-8">
          <FadeIn>
            <h2 className="text-2xl font-bold text-text mb-8">関連サイト</h2>
          </FadeIn>
          <div className="space-y-4">
            {[
              {
                name: "東京しごと財団　雇用環境整備事業 DX・GX時代を担う専門・中核人材戦略センター事業",
                url: "https://www.koyokankyo.shigotozaidan.or.jp/jigyo/senmon-chukaku/index.html",
              },
              {
                name: "TOKYOはたらくネット",
                url: "https://www.hataraku.metro.tokyo.lg.jp/",
              },
              {
                name: "ミラサポplus 補助金・助成金 中小企業支援サイト",
                url: "https://mirasapo-plus.go.jp/",
              },
            ].map((link, i) => (
              <FadeIn key={link.url} delay={i * 80}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block bg-white border border-border rounded-2xl p-5 sm:p-6 hover:border-brand transition-colors"
                >
                  <h3 className="font-bold text-text group-hover:text-brand transition-colors">
                    {link.name}
                  </h3>
                  <span className="inline-flex items-center mt-2 text-sm text-brand font-bold">
                    サイトを見る
                    <svg className="ml-1 w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </span>
                </a>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>

      {/* 令和8年度 助成金・支援事業 */}
      <div className="py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 lg:px-8">
          <FadeIn>
            <h2 className="text-2xl font-bold text-text mb-8">令和8年度 助成金・支援事業</h2>
          </FadeIn>
          <div className="space-y-4">
            {[
              {
                name: "事業内スキルアップ助成金",
                url: "https://www.koyokankyo.shigotozaidan.or.jp/jigyo/skillup/skill-R8jigyonai.html",
              },
              {
                name: "中小企業人材確保のための奨学金返還支援事業",
                urls: [
                  { label: "特設サイト", url: "https://tokyo-scholarship-support.jp/" },
                  { label: "募集要項（PDF）", url: "https://www.koyokankyo.shigotozaidan.or.jp/jigyo/scholarship/boshu/scholarship-support.files/r8_kigyou_bosyuuyoukou_080401.pdf" },
                ],
              },
              {
                name: "専門・中核人材確保助成金",
                url: "https://www.koyokankyo.shigotozaidan.or.jp/jigyo/senmon-chukaku/boshu/senmon-chukaku.files/R8senmon_bosyuyoukou.pdf",
                urlLabel: "募集要項（PDF）",
              },
            ].map((item, i) => (
              <FadeIn key={item.name} delay={i * 80}>
                <div className="bg-white border border-border rounded-2xl p-5 sm:p-6">
                  <h3 className="font-bold text-text">{item.name}</h3>
                  <div className="mt-3 flex flex-wrap gap-4">
                    {"urls" in item && item.urls ? (
                      item.urls.map((link) => (
                        <a
                          key={link.url}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-sm text-brand hover:underline font-bold"
                        >
                          {link.label}
                          <svg className="ml-1 w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                      ))
                    ) : (
                      <a
                        href={"url" in item ? item.url : ""}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-sm text-brand hover:underline font-bold"
                      >
                        {"urlLabel" in item && item.urlLabel ? item.urlLabel : "詳細はこちら"}
                        <svg className="ml-1 w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
