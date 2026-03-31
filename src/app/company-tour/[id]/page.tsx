import type { Metadata } from "next";
import Link from "next/link";
import { getExperience, getExperiences } from "@/lib/microcms";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const exp = await getExperience(id);
  if (!exp) return { title: "体験記詳細" };
  return { title: exp.title, description: `${exp.school_name}の企業見学体験記` };
}

export async function generateStaticParams() {
  const { contents } = await getExperiences({ limit: 100 });
  return contents.map((exp) => ({ id: exp.id }));
}

export default async function ExperienceDetailPage({ params }: Props) {
  const { id } = await params;
  const exp = await getExperience(id);
  if (!exp) notFound();

  return (
    <>
      <div className="bg-gradient-to-br from-brand-bg to-bg-section pt-8 pb-10">
        <div className="mx-auto max-w-3xl px-4 lg:px-8">
          <Link
            href="/company-tour"
            className="inline-flex items-center text-sm text-brand hover:underline mb-4"
          >
            <svg className="mr-1 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
            高校生企業見学に戻る
          </Link>
          <span className="text-sm text-text-muted block mb-1">{exp.school_name}</span>
          <h1 className="text-2xl sm:text-3xl font-bold text-text">
            {exp.title}
          </h1>
        </div>
      </div>

      <div className="py-12 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 lg:px-8">
          {exp.image_url && (
            <div className="aspect-video overflow-hidden rounded-lg mb-10 border border-border">
              <img
                src={exp.image_url}
                alt={exp.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="text-text-light leading-[2]">
            <p>{exp.content}</p>
          </div>
        </div>
      </div>
    </>
  );
}
