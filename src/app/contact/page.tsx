"use client";

import { useState, type FormEvent } from "react";
import PageHeader from "@/components/PageHeader";
import FadeIn from "@/components/FadeIn";

const CONSULTATION_PURPOSES = [
  "採用支援（求人票の書き方、求人方法の見直し 等）",
  "定着支援（労働環境の改善、就業規則の整備 等）",
  "育成支援（社員教育の仕組みづくり、メンター制度 等）",
  "助成金の活用相談",
  "その他",
] as const;

const CHALLENGES = [
  { id: "recruitment", label: "採用", description: "求人を出しても応募が来ない、求人票の書き方がわからない 等" },
  { id: "retention", label: "定着", description: "労働環境や就業規則を見直したい、社員のコミュニケーションに課題がある 等" },
  { id: "training", label: "育成", description: "社員の育成方針が決まっていない、指導できるメンターがいない 等" },
  { id: "other", label: "その他", description: "" },
] as const;

type FormStatus = "idle" | "sending" | "sent" | "error";

export default function ContactPage() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [selectedPurposes, setSelectedPurposes] = useState<string[]>([]);
  const [selectedChallenges, setSelectedChallenges] = useState<string[]>([]);
  const [privacyAgreed, setPrivacyAgreed] = useState(false);

  function togglePurpose(purpose: string) {
    setSelectedPurposes((prev) =>
      prev.includes(purpose) ? prev.filter((p) => p !== purpose) : [...prev, purpose]
    );
  }

  function toggleChallenge(id: string) {
    setSelectedChallenges((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!privacyAgreed) return;
    setStatus("sending");

    const form = e.currentTarget;
    const getValue = (name: string) =>
      (form.elements.namedItem(name) as HTMLInputElement | HTMLTextAreaElement | null)?.value ?? "";

    const data = {
      company: getValue("company"),
      address: getValue("address"),
      representative_name: getValue("representative_name"),
      name: getValue("contact_name"),
      phone: getValue("phone"),
      email: getValue("email"),
      industry: getValue("industry"),
      employee_count: getValue("employee_count"),
      consultation_purposes: selectedPurposes,
      challenges: selectedChallenges,
      challenge_other: getValue("challenge_other"),
      preferred_date_1: getValue("preferred_date_1"),
      preferred_date_2: getValue("preferred_date_2"),
      preferred_date_3: getValue("preferred_date_3"),
      privacy_agreed: privacyAgreed,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setStatus("sent");
        form.reset();
        setSelectedPurposes([]);
        setSelectedChallenges([]);
        setPrivacyAgreed(false);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  const inputClass =
    "w-full border border-border rounded px-4 py-3 text-base text-text focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-colors";

  return (
    <>
      <PageHeader
        title="ご相談・お申込み"
        titleEn="Contact"
        description="人材の確保・定着に関するご相談を無料で承ります。以下のフォームよりお気軽にお申込みください。"
        illustration={{ src: "/images/illust/worried-male.png", alt: "電話で相談するイラスト" }}
      />

      <div className="py-20 sm:py-32">
        <div className="mx-auto max-w-3xl px-4 lg:px-8">
          <FadeIn>
            <div className="bg-white border border-border rounded-2xl p-8 sm:p-12">
              {status === "sent" ? (
                <div className="text-center py-12">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 text-accent text-2xl font-bold mb-4">✓</div>
                  <h2 className="text-xl font-bold text-text mb-2">お申込みを受け付けました</h2>
                  <p className="text-text-muted leading-relaxed">
                    ご相談ありがとうございます。<br />
                    事務局より2営業日以内にご連絡いたします。
                  </p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="mt-6 text-sm text-brand hover:underline"
                  >
                    新しいお申込みを送る
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-12">
                  {/* セクション1: 企業基本情報 */}
                  <section>
                    <h2 className="text-lg font-bold text-text mb-1">企業基本情報</h2>
                    <p className="text-sm text-text-muted mb-6">対象要件の確認のためご入力ください。</p>
                    <div className="space-y-6">
                      <div>
                        <label htmlFor="company" className="block text-sm font-bold text-text mb-2">
                          企業名 <span className="text-danger">*</span>
                        </label>
                        <input type="text" id="company" name="company" required className={inputClass} />
                      </div>
                      <div>
                        <label htmlFor="address" className="block text-sm font-bold text-text mb-2">
                          所在地 <span className="text-danger">*</span>
                        </label>
                        <input type="text" id="address" name="address" required className={inputClass} placeholder="例：東京都足立区千住1-4-1" />
                        <p className="mt-1 text-xs text-text-muted">※足立区内に本社または主たる事業所がある中小企業が対象です</p>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="representative_name" className="block text-sm font-bold text-text mb-2">
                            代表者名
                          </label>
                          <input type="text" id="representative_name" name="representative_name" className={inputClass} />
                        </div>
                        <div>
                          <label htmlFor="contact_name" className="block text-sm font-bold text-text mb-2">
                            ご担当者名 <span className="text-danger">*</span>
                          </label>
                          <input type="text" id="contact_name" name="contact_name" required className={inputClass} />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="phone" className="block text-sm font-bold text-text mb-2">
                            電話番号 <span className="text-danger">*</span>
                          </label>
                          <input type="tel" id="phone" name="phone" required className={inputClass} />
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-sm font-bold text-text mb-2">
                            メールアドレス <span className="text-danger">*</span>
                          </label>
                          <input type="email" id="email" name="email" required className={inputClass} />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="industry" className="block text-sm font-bold text-text mb-2">
                            業種 <span className="text-danger">*</span>
                          </label>
                          <input type="text" id="industry" name="industry" required className={inputClass} placeholder="例：製造業、小売業" />
                        </div>
                        <div>
                          <label htmlFor="employee_count" className="block text-sm font-bold text-text mb-2">
                            従業員数 <span className="text-danger">*</span>
                          </label>
                          <select id="employee_count" name="employee_count" required className={inputClass}>
                            <option value="">選択してください</option>
                            <option value="1-5">1〜5名</option>
                            <option value="6-20">6〜20名</option>
                            <option value="21-50">21〜50名</option>
                            <option value="51-100">51〜100名</option>
                            <option value="101-300">101〜300名</option>
                            <option value="301+">301名以上</option>
                          </select>
                          <p className="mt-1 text-xs text-text-muted">※中小企業基本法に定める中小企業者が対象です</p>
                        </div>
                      </div>
                    </div>
                  </section>

                  <hr className="border-border-light" />

                  {/* セクション2: ご相談の目的 */}
                  <section>
                    <h2 className="text-lg font-bold text-text mb-1">ご相談の目的</h2>
                    <p className="text-sm text-text-muted mb-6">該当するものを全て選択してください。適切な専門家のアサインに活用します。</p>
                    <div className="space-y-3">
                      {CONSULTATION_PURPOSES.map((purpose) => (
                        <label
                          key={purpose}
                          className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-colors ${
                            selectedPurposes.includes(purpose)
                              ? "border-brand bg-brand-bg"
                              : "border-border hover:border-brand/30"
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={selectedPurposes.includes(purpose)}
                            onChange={() => togglePurpose(purpose)}
                            className="w-4 h-4 accent-brand shrink-0"
                          />
                          <span className="text-sm text-text">{purpose}</span>
                        </label>
                      ))}
                    </div>
                  </section>

                  <hr className="border-border-light" />

                  {/* セクション3: 現在抱えている人材課題 */}
                  <section>
                    <h2 className="text-lg font-bold text-text mb-1">現在抱えている人材課題</h2>
                    <p className="text-sm text-text-muted mb-6">該当するものを全て選択してください。専門家が事前に状況を把握するために活用します。</p>
                    <div className="space-y-3">
                      {CHALLENGES.map((challenge) => (
                        <label
                          key={challenge.id}
                          className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-colors ${
                            selectedChallenges.includes(challenge.id)
                              ? "border-brand bg-brand-bg"
                              : "border-border hover:border-brand/30"
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={selectedChallenges.includes(challenge.id)}
                            onChange={() => toggleChallenge(challenge.id)}
                            className="w-4 h-4 accent-brand shrink-0 mt-0.5"
                          />
                          <div>
                            <span className="text-sm font-bold text-text">{challenge.label}</span>
                            {challenge.description && (
                              <p className="text-xs text-text-muted mt-0.5">{challenge.description}</p>
                            )}
                          </div>
                        </label>
                      ))}
                    </div>
                    {selectedChallenges.includes("other") && (
                      <div className="mt-4">
                        <label htmlFor="challenge_other" className="block text-sm font-bold text-text mb-2">
                          具体的なお悩みをご記入ください
                        </label>
                        <textarea
                          id="challenge_other"
                          name="challenge_other"
                          rows={3}
                          className={`${inputClass} resize-y`}
                        />
                      </div>
                    )}
                  </section>

                  <hr className="border-border-light" />

                  {/* セクション4: 初回相談の希望日時 */}
                  <section>
                    <h2 className="text-lg font-bold text-text mb-1">初回相談の希望日時</h2>
                    <p className="text-sm text-text-muted mb-6">ご都合の良い日時をご記入ください。</p>
                    <div className="space-y-4">
                      {[1, 2, 3].map((n) => (
                        <div key={n}>
                          <label htmlFor={`preferred_date_${n}`} className="block text-sm font-bold text-text mb-2">
                            第{n}希望
                          </label>
                          <input
                            type="text"
                            id={`preferred_date_${n}`}
                            name={`preferred_date_${n}`}
                            className={inputClass}
                            placeholder="例：4月15日（火）14:00〜"
                          />
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 bg-bg-section rounded-xl p-4">
                      <p className="text-xs text-text-muted leading-relaxed">
                        ※専門家は原則として貴社へお伺いして対応いたします。ご訪問先の住所は上記ご所在地となりますので、異なる場合はその旨をお知らせください。
                      </p>
                    </div>
                  </section>

                  <hr className="border-border-light" />

                  {/* セクション5: 個人情報の取り扱い */}
                  <section>
                    <h2 className="text-lg font-bold text-text mb-1">個人情報の取り扱いへの同意</h2>
                    <p className="text-sm text-text-muted mb-6">
                      お申込みにあたり、以下の同意が必要です。
                    </p>
                    <div className="bg-bg-section rounded-xl p-5">
                      <p className="text-xs text-text-muted leading-relaxed mb-4">
                        ご入力いただいた個人情報は、足立区 区内中小企業人材確保支援事業の運営目的にのみ使用し、
                        適切に管理いたします。個人情報の取り扱いについては
                        <a
                          href="https://www.sigma-staff.co.jp/corp/privacy.shtml"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-brand hover:underline font-bold"
                        >
                          プライバシーポリシー
                        </a>
                        をご確認ください。
                      </p>
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={privacyAgreed}
                          onChange={(e) => setPrivacyAgreed(e.target.checked)}
                          className="w-4 h-4 accent-brand shrink-0"
                        />
                        <span className="text-sm font-bold text-text">
                          プライバシーポリシーに同意する <span className="text-danger">*</span>
                        </span>
                      </label>
                    </div>
                  </section>

                  {status === "error" && (
                    <p className="text-danger text-sm">
                      送信に失敗しました。時間をおいて再度お試しください。
                    </p>
                  )}

                  <div className="pt-4 text-center">
                    <button
                      type="submit"
                      disabled={status === "sending" || !privacyAgreed}
                      className="w-full sm:w-auto bg-accent hover:bg-accent-light disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-4 px-12 rounded-full transition-colors"
                    >
                      {status === "sending" ? "送信中..." : "相談を申し込む"}
                    </button>
                    {!privacyAgreed && (
                      <p className="mt-2 text-xs text-text-muted">
                        プライバシーポリシーへの同意が必要です
                      </p>
                    )}
                  </div>
                </form>
              )}
            </div>
          </FadeIn>

          <FadeIn delay={100}>
            <div className="mt-12 bg-bg-section rounded-2xl p-8 sm:p-10">
              <h3 className="font-bold text-text mb-4">お電話でのお問い合わせ</h3>
              <div className="space-y-2 text-sm text-text-light">
                <p>
                  <span className="font-bold">TEL：</span>
                  <a href="tel:03-6806-1211" className="text-brand hover:underline">
                    03-6806-1211
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
