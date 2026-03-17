import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "プライバシーポリシー",
  description: "足立区中小企業人材確保支援事業のプライバシーポリシー。",
};

const SECTIONS = [
  {
    title: "個人情報の取得について",
    body: "本事業では、支援サービスの提供、セミナーの運営、お問い合わせ対応等の目的で、お名前、ご連絡先、企業情報等の個人情報を取得いたします。個人情報の取得は、適法かつ公正な手段により行います。",
  },
  {
    title: "個人情報の利用目的",
    body: "取得した個人情報は、以下の目的で利用いたします。",
    list: [
      "人材確保支援サービスの提供",
      "セミナー・研修の案内及び運営",
      "お問い合わせへの回答",
      "事業に関する情報の提供",
      "事業の効果検証及び改善",
    ],
  },
  {
    title: "個人情報の第三者提供について",
    body: "法令に基づく場合を除き、ご本人の同意を得ることなく個人情報を第三者に提供することはありません。ただし、足立区への事業報告に必要な範囲で、統計的に処理された情報を提供する場合があります。",
  },
  {
    title: "個人情報の管理について",
    body: "取得した個人情報は、漏洩、滅失、き損等を防止するため、適切な安全管理措置を講じます。",
  },
  {
    title: "個人情報の開示・訂正・削除について",
    body: "ご本人から個人情報の開示、訂正、削除等のご請求があった場合は、本人確認を行った上で、速やかに対応いたします。",
  },
  {
    title: "Cookieの使用について",
    body: "本サイトでは、利便性向上及びアクセス解析のためにCookieを使用する場合があります。Cookieの使用を望まない場合は、ブラウザの設定でCookieを無効にすることができます。",
  },
  {
    title: "プライバシーポリシーの変更について",
    body: "本ポリシーの内容は、法令その他本ポリシーに定めのない事項に関しては、日本の法令を適用いたします。また、本ポリシーは予告なく変更される場合があります。",
  },
  {
    title: "お問い合わせ窓口",
    body: "個人情報の取り扱いに関するお問い合わせは、お問い合わせページよりご連絡ください。",
    link: { href: "/contact", label: "お問い合わせページはこちら" },
  },
] as const;

export default function PrivacyPage() {
  return (
    <>
      <PageHeader title="プライバシーポリシー" titleEn="Privacy Policy" />

      <div className="py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 lg:px-8">
          <div className="space-y-10">
            {SECTIONS.map((section, i) => (
              <section key={section.title}>
                <h2 className="font-bold text-text mb-3">
                  <span className="text-brand mr-2">{i + 1}.</span>
                  {section.title}
                </h2>
                <p className="text-sm text-text-light leading-[2]">
                  {section.body}
                </p>
                {"list" in section && section.list && (
                  <ul className="mt-3 space-y-1 pl-4">
                    {section.list.map((item) => (
                      <li
                        key={item}
                        className="text-sm text-text-light leading-relaxed list-disc"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
                {"link" in section && section.link && (
                  <a
                    href={section.link.href}
                    className="inline-block mt-3 text-sm text-brand hover:underline font-bold"
                  >
                    {section.link.label}
                    <svg className="ml-1 w-3.5 h-3.5 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                  </a>
                )}
              </section>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
