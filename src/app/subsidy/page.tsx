import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import FadeIn from "@/components/FadeIn";
import Link from "next/link";

export const metadata: Metadata = {
  title: "助成金情報",
  description:
    "足立区内の中小企業が活用できる人材確保関連の助成金情報（区・都・国）をご紹介します。",
};

type SubsidyItem = {
  category: string;
  name: string;
  target: string;
  amount: string;
  overview: string;
};

const SUBSIDY_GROUPS: { title: string; level: string; color: string; items: SubsidyItem[] }[] = [
  {
    title: "足立区の助成金",
    level: "区",
    color: "bg-brand",
    items: [
      { category: "採用支援", name: "足立区中小企業人材確保支援助成金", target: "区内中小企業", amount: "上限30万円", overview: "求人広告費、採用イベント出展費、採用コンサルティング費用等を助成" },
      { category: "職場環境改善", name: "足立区職場環境改善助成金", target: "区内中小企業", amount: "上限20万円", overview: "従業員の定着率向上に資する職場環境改善費用を助成" },
    ],
  },
  {
    title: "東京都の助成金",
    level: "都",
    color: "bg-accent",
    items: [
      { category: "採用支援", name: "東京都正規雇用転換促進助成金", target: "都内中小企業", amount: "1人あたり最大60万円", overview: "非正規雇用労働者を正規雇用に転換した企業に対して助成" },
      { category: "研修・育成", name: "東京都中小企業人材育成助成金", target: "都内中小企業", amount: "研修費用の2/3（上限あり）", overview: "従業員のスキルアップに資する研修費用を助成" },
    ],
  },
  {
    title: "国の助成金",
    level: "国",
    color: "bg-[#e67e22]",
    items: [
      { category: "採用支援", name: "キャリアアップ助成金", target: "全国の中小企業", amount: "1人あたり最大80万円", overview: "有期契約労働者等のキャリアアップを図る取り組みに対して助成" },
      { category: "働き方改革", name: "働き方改革推進支援助成金", target: "全国の中小企業", amount: "上限200万円", overview: "労働時間削減や年次有給休暇取得促進に向けた環境整備を助成" },
      { category: "採用支援", name: "トライアル雇用助成金", target: "全国の中小企業", amount: "月額最大4万円×3ヶ月", overview: "職業経験が不足している求職者を試行雇用する企業に対して助成" },
    ],
  },
];

export default function SubsidyPage() {
  return (
    <>
      <PageHeader
        title="助成金情報"
        titleEn="Subsidy"
        description="人材確保に活用できる区・都・国の助成金をまとめてご紹介します。"
        illustration={{ src: "/images/illust/data-analysis.png", alt: "データ分析するイラスト" }}
      />

      <div className="py-16 sm:py-24">
        <div className="mx-auto max-w-5xl px-4 lg:px-8">
          <div className="space-y-16">
            {SUBSIDY_GROUPS.map((group, gi) => (
              <FadeIn key={group.title} delay={gi * 100}>
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <span className={`inline-flex items-center justify-center w-10 h-10 ${group.color} text-white text-sm font-bold rounded-2xl`}>
                      {group.level}
                    </span>
                    <h2 className="text-xl font-bold text-text">
                      {group.title}
                    </h2>
                  </div>

                  <div className="space-y-4">
                    {group.items.map((item) => (
                      <div
                        key={item.name}
                        className="bg-white border border-border rounded-2xl p-5 sm:p-6"
                      >
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <span className="text-xs font-bold text-brand bg-brand-bg px-2 py-0.5 rounded">
                            {item.category}
                          </span>
                          <span className="text-xs text-text-muted">
                            対象：{item.target}
                          </span>
                        </div>
                        <h3 className="font-bold text-text mb-2">
                          {item.name}
                        </h3>
                        <p className="text-sm text-text-muted leading-relaxed mb-3">
                          {item.overview}
                        </p>
                        <p className="text-brand font-bold text-lg">
                          {item.amount}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn>
            <div className="mt-16 bg-bg-section rounded-2xl p-8 sm:p-10 text-center">
              <p className="text-text-muted text-sm mb-2">
                ※ 助成金の内容は変更される場合があります。最新情報は各窓口にご確認ください。
              </p>
              <p className="text-text-muted text-sm mb-6">
                助成金の活用についてのご相談も承っています。
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center bg-accent hover:bg-accent-light text-white font-bold py-3.5 px-8 rounded-full transition-colors"
              >
                助成金について相談する
                <svg className="ml-2 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
              </Link>
            </div>
          </FadeIn>
        </div>
      </div>
    </>
  );
}
