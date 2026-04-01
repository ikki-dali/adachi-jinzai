"use client";

import { useEffect, useState, useCallback } from "react";

type Inquiry = {
  id: string;
  company: string;
  name: string;
  email: string;
  phone: string | null;
  address: string | null;
  representative_name: string | null;
  industry: string | null;
  employee_count: string | null;
  category: string | null;
  message: string | null;
  consultation_purposes: string[] | null;
  challenges: string[] | null;
  challenge_other: string | null;
  preferred_date_1: string | null;
  preferred_date_2: string | null;
  preferred_date_3: string | null;
  privacy_agreed: boolean;
  status: string;
  created_at: string;
};

const STATUS_OPTIONS = [
  { value: "new", label: "新規", color: "bg-blue-100 text-blue-800" },
  { value: "in_progress", label: "対応中", color: "bg-yellow-100 text-yellow-800" },
  { value: "done", label: "完了", color: "bg-green-100 text-green-800" },
] as const;

const CHALLENGE_LABELS: Record<string, string> = {
  recruitment: "採用",
  retention: "定着",
  training: "育成",
  other: "その他",
};

function StatusBadge({ status }: { status: string }) {
  const opt = STATUS_OPTIONS.find((o) => o.value === status) ?? STATUS_OPTIONS[0];
  return (
    <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-bold ${opt.color}`}>
      {opt.label}
    </span>
  );
}

function formatDate(iso: string) {
  const d = new Date(iso);
  return `${d.getFullYear()}/${String(d.getMonth() + 1).padStart(2, "0")}/${String(d.getDate()).padStart(2, "0")} ${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
}

function InfoRow({ label, value }: { label: string; value: string | null | undefined }) {
  if (!value) return null;
  return (
    <div className="flex gap-3 py-2 border-b border-gray-100 last:border-0">
      <dt className="w-28 shrink-0 text-xs font-bold text-gray-500 pt-0.5">{label}</dt>
      <dd className="text-sm text-gray-800 whitespace-pre-wrap">{value}</dd>
    </div>
  );
}

export default function InquiriesAdminPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [updatingStatus, setUpdatingStatus] = useState(false);

  const fetchInquiries = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/inquiries");
      if (!res.ok) throw new Error("取得に失敗しました");
      const data = await res.json();
      setInquiries(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "不明なエラー");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchInquiries();
  }, [fetchInquiries]);

  const selected = inquiries.find((i) => i.id === selectedId) ?? null;

  async function updateStatus(id: string, newStatus: string) {
    setUpdatingStatus(true);
    try {
      const res = await fetch("/api/admin/inquiries", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });
      if (!res.ok) throw new Error("更新に失敗しました");
      setInquiries((prev) =>
        prev.map((i) => (i.id === id ? { ...i, status: newStatus } : i))
      );
    } catch (e) {
      alert(e instanceof Error ? e.message : "更新に失敗しました");
    } finally {
      setUpdatingStatus(false);
    }
  }

  return (
    <div className="mx-auto max-w-6xl">
      {/* パンくず */}
      <div className="mb-4 text-sm text-gray-500">
        <a href="/admin" className="text-blue-600 hover:underline">ダッシュボード</a>
        <span className="mx-2">/</span>
        <span>お問い合わせ</span>
      </div>

      <h1 className="mb-6 text-xl font-bold text-gray-900">
        お問い合わせ一覧
        {!loading && <span className="ml-2 text-sm font-normal text-gray-500">({inquiries.length}件)</span>}
      </h1>

      {error && (
        <div className="mb-4 rounded border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</div>
      )}

      {loading && <p className="text-sm text-gray-500">読み込み中...</p>}

      {!loading && inquiries.length === 0 && (
        <p className="text-sm text-gray-500">お問い合わせはまだありません</p>
      )}

      {!loading && inquiries.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* 左: リスト */}
          <div className="lg:col-span-2 space-y-2 max-h-[80vh] overflow-y-auto">
            {inquiries.map((inq) => (
              <button
                key={inq.id}
                onClick={() => setSelectedId(inq.id)}
                className={`w-full text-left p-4 rounded-xl border transition-colors ${
                  selectedId === inq.id
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 bg-white hover:border-gray-300"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-sm text-gray-900 truncate">{inq.company}</span>
                  <StatusBadge status={inq.status} />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">{inq.name}</span>
                  <span className="text-xs text-gray-400">{formatDate(inq.created_at)}</span>
                </div>
                {inq.industry && (
                  <span className="inline-block mt-1.5 text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded">
                    {inq.industry}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* 右: 詳細 */}
          <div className="lg:col-span-3">
            {selected ? (
              <div className="rounded-xl border border-gray-200 bg-white p-6 sticky top-4">
                {/* ヘッダー */}
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="text-lg font-bold text-gray-900">{selected.company}</h2>
                    <p className="text-sm text-gray-500 mt-0.5">{formatDate(selected.created_at)} 受付</p>
                  </div>
                  <select
                    value={selected.status}
                    disabled={updatingStatus}
                    onChange={(e) => updateStatus(selected.id, e.target.value)}
                    className="text-sm border border-gray-300 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {STATUS_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>

                {/* 企業情報 */}
                <div className="mb-6">
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">企業情報</h3>
                  <dl>
                    <InfoRow label="企業名" value={selected.company} />
                    <InfoRow label="所在地" value={selected.address} />
                    <InfoRow label="代表者名" value={selected.representative_name} />
                    <InfoRow label="業種" value={selected.industry} />
                    <InfoRow label="従業員数" value={selected.employee_count} />
                  </dl>
                </div>

                {/* 連絡先 */}
                <div className="mb-6">
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">連絡先</h3>
                  <dl>
                    <InfoRow label="担当者名" value={selected.name} />
                    <InfoRow label="メール" value={selected.email} />
                    <InfoRow label="電話番号" value={selected.phone} />
                  </dl>
                </div>

                {/* 相談内容 */}
                <div className="mb-6">
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">相談内容</h3>
                  {selected.consultation_purposes && selected.consultation_purposes.length > 0 && (
                    <div className="mb-3">
                      <p className="text-xs font-bold text-gray-500 mb-1.5">相談の目的</p>
                      <div className="flex flex-wrap gap-1.5">
                        {selected.consultation_purposes.map((p) => (
                          <span key={p} className="text-xs bg-blue-50 text-blue-700 px-2.5 py-1 rounded-lg">
                            {p}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  {selected.challenges && selected.challenges.length > 0 && (
                    <div className="mb-3">
                      <p className="text-xs font-bold text-gray-500 mb-1.5">人材課題</p>
                      <div className="flex flex-wrap gap-1.5">
                        {selected.challenges.map((c) => (
                          <span key={c} className="text-xs bg-orange-50 text-orange-700 px-2.5 py-1 rounded-lg">
                            {CHALLENGE_LABELS[c] ?? c}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  <InfoRow label="その他の課題" value={selected.challenge_other} />
                  {/* 旧フォームのcategory/message対応 */}
                  <InfoRow label="種別" value={selected.category} />
                  <InfoRow label="メッセージ" value={selected.message} />
                </div>

                {/* 希望日時 */}
                {(selected.preferred_date_1 || selected.preferred_date_2 || selected.preferred_date_3) && (
                  <div className="mb-6">
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">希望日時</h3>
                    <dl>
                      <InfoRow label="第1希望" value={selected.preferred_date_1} />
                      <InfoRow label="第2希望" value={selected.preferred_date_2} />
                      <InfoRow label="第3希望" value={selected.preferred_date_3} />
                    </dl>
                  </div>
                )}

                {/* メールリンク */}
                <div className="pt-4 border-t border-gray-100">
                  <a
                    href={`mailto:${selected.email}?subject=${encodeURIComponent(`【足立区人材確保支援】${selected.company}様 ご相談について`)}`}
                    className="inline-flex items-center text-sm font-bold text-blue-600 hover:underline"
                  >
                    メールで返信する
                    <svg className="ml-1 w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>
            ) : (
              <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 p-12 text-center">
                <p className="text-sm text-gray-400">左のリストからお問い合わせを選択してください</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
