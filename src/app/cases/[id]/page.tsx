import type { Metadata } from "next";
import Link from "next/link";
import { getCase, getCases } from "@/lib/microcms";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const { id } = await params;
    const c = await getCase(id);
    return { title: `${c.companyName}の事例`, description: c.challenge };
  } catch {
    return { title: "支援事例詳細" };
  }
}

export async function generateStaticParams() {
  const { contents } = await getCases({ limit: 100 });
  return contents.map((c) => ({ id: c.id }));
}

export default async function CaseDetailPage({ params }: Props) {
  let caseItem;
  try {
    const { id } = await params;
    caseItem = await getCase(id);
  } catch {
    notFound();
  }

  return (
    <>
      <div className="bg-gradient-to-br from-brand-bg to-bg-section pt-8 pb-10">
        <div className="mx-auto max-w-3xl px-4 lg:px-8">
          <Link
            href="/cases"
            className="inline-flex items-center text-sm text-brand hover:underline mb-4"
          >
            <svg className="mr-1 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
            支援事例一覧に戻る
          </Link>
          <span className="inline-block text-xs font-bold text-brand bg-white px-2 py-0.5 rounded mb-3">
            {caseItem.industry}
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-text">
            {caseItem.companyName}
          </h1>
        </div>
      </div>

      <div className="py-12 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 lg:px-8">
          {caseItem.image && (
            <div className="aspect-video overflow-hidden rounded-lg mb-10 border border-border">
              <img
                src={caseItem.image.url}
                alt={caseItem.companyName}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="space-y-10">
            <section>
              <h2 className="text-lg font-bold text-text border-l-4 border-brand pl-3 mb-4">
                課題
              </h2>
              <p className="text-text-light leading-[2]">
                {caseItem.challenge}
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-text border-l-4 border-accent pl-3 mb-4">
                取り組み内容
              </h2>
              <p className="text-text-light leading-[2]">
                {caseItem.approach}
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-text border-l-4 border-brand pl-3 mb-4">
                成果
              </h2>
              <p className="text-text-light leading-[2]">
                {caseItem.result}
              </p>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
