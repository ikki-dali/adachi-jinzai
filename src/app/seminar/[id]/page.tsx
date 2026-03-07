import type { Metadata } from "next";
import Link from "next/link";
import { getSeminar, getSeminars } from "@/lib/microcms";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const { id } = await params;
    const seminar = await getSeminar(id);
    return { title: seminar.title, description: seminar.description };
  } catch {
    return { title: "セミナー詳細" };
  }
}

export async function generateStaticParams() {
  const { contents } = await getSeminars({ limit: 100 });
  return contents.map((s) => ({ id: s.id }));
}

export default async function SeminarDetailPage({ params }: Props) {
  let seminar;
  try {
    const { id } = await params;
    seminar = await getSeminar(id);
  } catch {
    notFound();
  }

  return (
    <>
      <div className="bg-gradient-to-br from-brand-bg to-bg-section pt-8 pb-10">
        <div className="mx-auto max-w-3xl px-4 lg:px-8">
          <Link
            href="/seminar"
            className="inline-flex items-center text-sm text-brand hover:underline mb-4"
          >
            <svg className="mr-1 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
            セミナー一覧に戻る
          </Link>
          <h1 className="text-2xl sm:text-3xl font-bold text-text leading-relaxed">
            {seminar.title}
          </h1>
        </div>
      </div>

      <div className="py-12 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 lg:px-8">
          {seminar.thumbnail && (
            <div className="aspect-video overflow-hidden rounded-lg mb-10 border border-border">
              <img
                src={seminar.thumbnail.url}
                alt={seminar.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="bg-bg-section rounded-lg p-5 sm:p-6 mb-10">
            <dl className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <dt className="text-xs text-text-muted font-bold mb-1">開催日時</dt>
                <dd className="text-text font-bold">
                  {new Date(seminar.date).toLocaleDateString("ja-JP", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-text-muted font-bold mb-1">会場</dt>
                <dd className="text-text font-bold">{seminar.location}</dd>
              </div>
              <div>
                <dt className="text-xs text-text-muted font-bold mb-1">定員</dt>
                <dd className="text-text font-bold">{seminar.capacity}名</dd>
              </div>
            </dl>
          </div>

          <div className="text-text-light leading-[2]">
            <p>{seminar.description}</p>
          </div>

          {seminar.applyUrl && (
            <div className="mt-12 text-center">
              <a
                href={seminar.applyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-brand hover:bg-brand-dark text-white font-bold py-3.5 px-8 rounded transition-colors"
              >
                このセミナーに申し込む
                <svg className="ml-2 w-4 h-4 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
              </a>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
