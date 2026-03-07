import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import FadeIn from "@/components/FadeIn";
import Link from "next/link";

export const metadata: Metadata = {
  title: "事業内容紹介",
  description:
    "専門コンサルタントが貴社の人材確保を伴走支援。採用戦略の策定から定着支援まで幅広くサポートします。",
};

const SUPPORT_ITEMS = [
  { id: "ア", title: "採用戦略の策定支援", description: "企業の現状分析を行い、業界・規模に合った最適な採用戦略を一緒に描きます。" },
  { id: "イ", title: "求人票・求人広告の作成支援", description: "求職者の目に留まる求人票の書き方、掲載媒体の選び方をアドバイス。" },
  { id: "ウ", title: "面接・選考プロセスの改善", description: "面接の質を高め、内定辞退を防ぐための選考フロー改善をご提案。" },
  { id: "エ", title: "職場環境の改善提案", description: "従業員の定着率を上げるための職場環境・制度の見直しをサポート。" },
  { id: "オ", title: "給与・待遇の適正化支援", description: "業界水準を踏まえた給与テーブルの見直し、福利厚生の充実を支援。" },
  { id: "カ", title: "社内研修・教育体制の構築", description: "新入社員の早期戦力化に向けた研修プログラムの設計をお手伝い。" },
  { id: "キ", title: "採用ブランディング支援", description: "企業の魅力を効果的に発信し、「選ばれる会社」づくりを支援。" },
  { id: "ク", title: "外国人材の活用支援", description: "外国人材の採用・受入れに必要な制度理解や手続きをサポート。" },
  { id: "ケ", title: "シニア・女性の活躍推進", description: "多様な人材が活躍できる制度設計・環境整備をご提案。" },
  { id: "コ", title: "ICT・DX活用による業務効率化", description: "デジタルツールで業務効率を高め、人手不足を補う方策をご提案。" },
  { id: "サ", title: "助成金・補助金の活用支援", description: "人材確保に使える各種助成金の情報提供と申請手続きを支援。" },
  { id: "シ", title: "その他人材確保に関する相談", description: "上記以外のお悩みも何でもご相談ください。" },
] as const;

const FLOW_STEPS = [
  { step: "お問い合わせ", detail: "まずはお電話またはお問い合わせフォームからご連絡ください。" },
  { step: "ヒアリング", detail: "貴社の現状と課題をじっくりとお伺いします。" },
  { step: "支援プラン策定", detail: "課題に合わせた最適な支援プランをご提案します。" },
  { step: "コンサルタントによる伴走支援", detail: "専門コンサルタントが課題解決まで伴走します。" },
  { step: "成果確認・フォローアップ", detail: "取り組みの成果を確認し、継続的にフォローします。" },
] as const;

export default function AdvisoryPage() {
  return (
    <>
      <PageHeader
        title="事業内容紹介"
        description="経験豊富なコンサルタントが、貴社の人材確保に関する課題を解決します。"
        illustration={{ src: "/images/illust/advisor-talk.png", alt: "コンサルタントが相談に乗るイラスト" }}
      />

      <div className="py-16 sm:py-24">
        <div className="mx-auto max-w-5xl px-4 lg:px-8">
          {/* 支援の流れ */}
          <FadeIn>
            <h2 className="text-xl font-bold text-brand text-center mb-10">
              支援の流れ
            </h2>
            <div className="max-w-2xl mx-auto mb-20">
              <div className="relative">
                <div className="absolute left-[22px] top-6 bottom-6 w-0.5 bg-brand/20" />
                <ol className="space-y-6">
                  {FLOW_STEPS.map((item, i) => (
                    <li key={item.step} className="flex items-start gap-5">
                      <span className="relative z-10 flex-shrink-0 w-11 h-11 rounded-full bg-brand text-white flex items-center justify-center text-sm font-bold">
                        {i + 1}
                      </span>
                      <div className="pt-2">
                        <h3 className="font-bold text-text">{item.step}</h3>
                        <p className="text-sm text-text-muted mt-1">{item.detail}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </FadeIn>

          {/* 支援内容 */}
          <FadeIn>
            <h2 className="text-xl font-bold text-brand text-center mb-10">
              支援内容
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {SUPPORT_ITEMS.map((item, i) => (
              <FadeIn key={item.id} delay={i * 40}>
                <div className="bg-bg-light border border-border-light rounded-lg p-5 h-full">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-brand text-white text-xs font-bold">
                      {item.id}
                    </span>
                    <h3 className="font-bold text-text text-sm">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-sm text-text-muted leading-relaxed pl-11">
                    {item.description}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* CTA */}
          <FadeIn>
            <div className="mt-16 text-center">
              <p className="text-text-muted mb-4">
                費用は一切かかりません。まずはお気軽にご相談ください。
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center bg-brand hover:bg-brand-dark text-white font-bold py-3.5 px-8 rounded transition-colors"
              >
                相談の申し込みはこちら
                <svg className="ml-2 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
              </Link>
            </div>
          </FadeIn>
        </div>
      </div>
    </>
  );
}
