import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import PageHeader from "@/components/PageHeader";
import FadeIn from "@/components/FadeIn";
import { getCases } from "@/lib/microcms";

export const metadata: Metadata = {
  title: "支援事例紹介",
  description: "人材確保に成功した足立区内の中小企業の取り組みをご紹介します。",
};

export default async function CasesPage() {
  const { contents: cases } = await getCases();

  return (
    <>
      <PageHeader
        title="支援事例紹介"
        description="人材確保に成功した区内企業のリアルな取り組みと、その成果をご紹介します。"
        illustration={{ src: "/images/illust/contract-signing.png", alt: "契約を交わすビジネスパーソンのイラスト" }}
      />

      <div className="py-16 sm:py-24">
        <div className="mx-auto max-w-5xl px-4 lg:px-8">
          {cases.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {cases.map((caseItem, i) => (
                <FadeIn key={caseItem.id} delay={i * 100}>
                  <Link
                    href={`/cases/${caseItem.id}`}
                    className="group block bg-white border border-border rounded-lg hover:border-brand/30 overflow-hidden transition-colors"
                  >
                    {caseItem.image && (
                      <div className="relative aspect-[16/9] overflow-hidden bg-bg-section">
                        <Image
                          src={caseItem.image.url}
                          alt={caseItem.companyName}
                          fill
                          sizes="(max-width: 768px) 100vw, 50vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    )}
                    <div className="p-5 sm:p-6">
                      <span className="text-xs font-bold text-brand bg-brand-bg px-2 py-0.5 rounded">
                        {caseItem.industry}
                      </span>
                      <h3 className="mt-3 font-bold text-lg text-text group-hover:text-brand transition-colors">
                        {caseItem.companyName}
                      </h3>
                      <p className="mt-2 text-sm text-text-muted leading-relaxed line-clamp-2">
                        {caseItem.challenge}
                      </p>
                    </div>
                  </Link>
                </FadeIn>
              ))}
            </div>
          ) : (
            <FadeIn>
              <div className="text-center py-16">
                <p className="text-xl font-bold text-text-muted">
                  支援事例は近日公開予定です
                </p>
              </div>
            </FadeIn>
          )}
        </div>
      </div>
    </>
  );
}
