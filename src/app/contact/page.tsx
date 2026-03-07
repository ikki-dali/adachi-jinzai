import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import FadeIn from "@/components/FadeIn";

export const metadata: Metadata = {
  title: "お問い合わせ",
  description:
    "足立区中小企業人材確保支援事業に関するお問い合わせはこちらから。",
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        title="お問い合わせ"
        description="人材確保に関するご相談、セミナーへの参加など、お気軽にご連絡ください。費用は一切かかりません。"
        illustration={{ src: "/images/illust/worried-male.png", alt: "電話で相談するイラスト" }}
      />

      <div className="py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 lg:px-8">
          <FadeIn>
            <div className="bg-white border border-border rounded-lg p-6 sm:p-10">
              <form className="space-y-6">
                <div>
                  <label
                    htmlFor="company"
                    className="block text-sm font-bold text-text mb-2"
                  >
                    企業名・団体名 <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    required
                    className="w-full border border-border rounded px-4 py-3 text-base text-text focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-colors"
                  />
                </div>
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-bold text-text mb-2"
                  >
                    お名前 <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full border border-border rounded px-4 py-3 text-base text-text focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-colors"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-bold text-text mb-2"
                  >
                    メールアドレス <span className="text-danger">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full border border-border rounded px-4 py-3 text-base text-text focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-colors"
                  />
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-bold text-text mb-2"
                  >
                    電話番号
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="w-full border border-border rounded px-4 py-3 text-base text-text focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-colors"
                  />
                </div>
                <div>
                  <label
                    htmlFor="category"
                    className="block text-sm font-bold text-text mb-2"
                  >
                    お問い合わせ種別 <span className="text-danger">*</span>
                  </label>
                  <select
                    id="category"
                    name="category"
                    required
                    className="w-full border border-border rounded px-4 py-3 text-base text-text focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-colors"
                  >
                    <option value="">選択してください</option>
                    <option value="consulting">コンサルティング支援について</option>
                    <option value="subsidy">助成金について</option>
                    <option value="seminar">セミナーについて</option>
                    <option value="tour">企業見学について</option>
                    <option value="other">その他</option>
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-bold text-text mb-2"
                  >
                    お問い合わせ内容 <span className="text-danger">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    required
                    className="w-full border border-border rounded px-4 py-3 text-base text-text focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-colors resize-y"
                  />
                </div>
                <div className="pt-2 text-center">
                  <button
                    type="submit"
                    className="w-full sm:w-auto bg-brand hover:bg-brand-dark text-white font-bold py-4 px-12 rounded transition-colors"
                  >
                    送信する
                  </button>
                </div>
              </form>
            </div>
          </FadeIn>

          <FadeIn delay={100}>
            <div className="mt-10 bg-bg-section rounded-lg p-6 sm:p-8">
              <h3 className="font-bold text-text mb-4">お電話でのお問い合わせ</h3>
              <div className="space-y-2 text-sm text-text-light">
                <p>
                  <span className="font-bold">TEL：</span>
                  <a href="tel:03-XXXX-XXXX" className="text-brand hover:underline">
                    03-XXXX-XXXX
                  </a>
                </p>
                <p>受付時間：平日 10:00〜17:30（土日祝日・年末年始を除く）</p>
                <p className="text-text-muted text-xs mt-2">
                  ※ 足立区 区内中小企業人材確保支援事業 事務局
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </>
  );
}
