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

      <div className="py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 lg:px-8">
          {grants.length > 0 ? (
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
          ) : (
            <FadeIn>
              <div className="text-center py-16">
                <p className="text-xl font-bold text-text-muted">
                  関連リンク情報は近日公開予定です
                </p>
              </div>
            </FadeIn>
          )}

        </div>
      </div>
    </>
  );
}
