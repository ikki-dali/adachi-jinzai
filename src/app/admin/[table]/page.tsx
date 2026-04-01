"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";

// --- テーブル設定 ---

type FieldConfig = {
  key: string;
  label: string;
  type: "text" | "textarea" | "number" | "url" | "date" | "tags";
  required?: boolean;
  /** 一覧テーブルに表示するか */
  showInList?: boolean;
};

type TableConfig = {
  label: string;
  /** 一覧のタイトル列に使うフィールド */
  titleField: string;
  fields: FieldConfig[];
};

const TABLE_CONFIGS: Record<string, TableConfig> = {
  cases: {
    label: "支援事例",
    titleField: "company_name",
    fields: [
      { key: "company_name", label: "企業名", type: "text", required: true, showInList: true },
      { key: "industry", label: "業種", type: "text", required: true, showInList: true },
      { key: "challenge", label: "課題", type: "textarea", required: true },
      { key: "approach", label: "アプローチ", type: "textarea", required: true },
      { key: "result", label: "成果", type: "textarea", required: true },
      { key: "image_url", label: "画像URL", type: "url" },
    ],
  },
  seminars: {
    label: "セミナー",
    titleField: "title",
    fields: [
      { key: "title", label: "タイトル", type: "text", required: true, showInList: true },
      { key: "date", label: "開催日", type: "date", required: true, showInList: true },
      { key: "location", label: "会場", type: "text", required: true, showInList: true },
      { key: "description", label: "説明", type: "textarea", required: true },
      { key: "capacity", label: "定員", type: "number", required: true },
      { key: "apply_url", label: "申込URL", type: "url" },
      { key: "thumbnail_url", label: "サムネイルURL", type: "url" },
    ],
  },
  experiences: {
    label: "企業見学体験記",
    titleField: "title",
    fields: [
      { key: "title", label: "タイトル", type: "text", required: true, showInList: true },
      { key: "school_name", label: "学校名", type: "text", required: true, showInList: true },
      { key: "content", label: "内容", type: "textarea", required: true },
      { key: "image_url", label: "画像URL", type: "url" },
    ],
  },
  news: {
    label: "お知らせ",
    titleField: "title",
    fields: [
      { key: "title", label: "タイトル", type: "text", required: true, showInList: true },
      { key: "date", label: "日付", type: "date", required: true, showInList: true },
      { key: "category", label: "カテゴリ（カンマ区切り）", type: "tags", showInList: true },
      { key: "body", label: "本文", type: "textarea", required: true },
    ],
  },
  grants: {
    label: "補助金・助成金",
    titleField: "name",
    fields: [
      { key: "name", label: "名称", type: "text", required: true, showInList: true },
      { key: "summary", label: "概要", type: "textarea", required: true },
      { key: "target", label: "対象", type: "text", required: true, showInList: true },
      { key: "amount", label: "金額", type: "text", required: true, showInList: true },
      { key: "apply_url", label: "申込URL", type: "url", required: true },
    ],
  },
  inquiries: {
    label: "お問い合わせ",
    titleField: "company",
    fields: [
      { key: "company", label: "企業名", type: "text", required: true, showInList: true },
      { key: "name", label: "担当者名", type: "text", required: true, showInList: true },
      { key: "email", label: "メール", type: "text", required: true, showInList: true },
      { key: "phone", label: "電話番号", type: "text" },
      { key: "address", label: "所在地", type: "text" },
      { key: "industry", label: "業種", type: "text", showInList: true },
      { key: "employee_count", label: "従業員数", type: "text" },
      { key: "category", label: "種別", type: "text" },
      { key: "message", label: "内容", type: "textarea" },
      { key: "challenge_other", label: "その他の課題", type: "textarea" },
      { key: "preferred_date_1", label: "希望日時（第1）", type: "text" },
      { key: "preferred_date_2", label: "希望日時（第2）", type: "text" },
      { key: "preferred_date_3", label: "希望日時（第3）", type: "text" },
      { key: "status", label: "ステータス", type: "text", showInList: true },
    ],
  },
};

// --- 型定義 ---

type ContentRecord = {
  id: string;
  created_at: string;
  updated_at: string;
  published_at: string;
  [key: string]: unknown;
};

// --- コンポーネント ---

export default function AdminTablePage() {
  const params = useParams();
  const table = params.table as string;
  const config = TABLE_CONFIGS[table];

  const [records, setRecords] = useState<ContentRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // モーダル状態
  const [modalOpen, setModalOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState<ContentRecord | null>(null);
  const [formData, setFormData] = useState<{ [key: string]: string | number }>({});
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState("");

  // 削除確認
  const [deleteTarget, setDeleteTarget] = useState<ContentRecord | null>(null);
  const [deleting, setDeleting] = useState(false);

  const fetchRecords = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/admin/${table}`);
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "データの取得に失敗しました");
      }
      const data = await res.json();
      setRecords(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "不明なエラー");
    } finally {
      setLoading(false);
    }
  }, [table]);

  useEffect(() => {
    if (config) fetchRecords();
  }, [config, fetchRecords]);

  if (!config) {
    return (
      <div className="mx-auto max-w-4xl">
        <p className="text-red-600">無効なテーブル: {table}</p>
        <a href="/admin" className="text-sm text-blue-600 underline">
          ダッシュボードに戻る
        </a>
      </div>
    );
  }

  const listFields = config.fields.filter((f) => f.showInList);

  // --- フォーム操作 ---

  const openCreateModal = () => {
    setEditingRecord(null);
    const initial: { [key: string]: string | number } = {};
    config.fields.forEach((f) => {
      initial[f.key] = f.type === "number" ? 0 : "";
    });
    setFormData(initial);
    setSaveError("");
    setModalOpen(true);
  };

  const openEditModal = (record: ContentRecord) => {
    setEditingRecord(record);
    const initial: { [key: string]: string | number } = {};
    config.fields.forEach((f) => {
      const val = record[f.key];
      if (f.type === "tags" && Array.isArray(val)) {
        initial[f.key] = (val as string[]).join(", ");
      } else {
        initial[f.key] = (val as string | number) ?? "";
      }
    });
    setFormData(initial);
    setSaveError("");
    setModalOpen(true);
  };

  const handleSave = async () => {
    setSaving(true);
    setSaveError("");

    try {
      // バリデーション
      for (const field of config.fields) {
        if (field.required && !formData[field.key] && formData[field.key] !== 0) {
          setSaveError(`${field.label} は必須です`);
          setSaving(false);
          return;
        }
      }

      // tagsフィールドを配列に変換
      const body: { [key: string]: unknown } = { ...formData };
      config.fields.forEach((f) => {
        if (f.type === "tags") {
          const val = formData[f.key];
          body[f.key] =
            typeof val === "string" && val.trim()
              ? val.split(",").map((s) => s.trim()).filter(Boolean)
              : [];
        }
        if (f.type === "number") {
          body[f.key] = Number(formData[f.key]) || 0;
        }
        // nullableフィールド: 空文字はnullに
        if (f.type === "url" && !f.required && formData[f.key] === "") {
          body[f.key] = null;
        }
      });

      const isEdit = !!editingRecord;
      const method = isEdit ? "PUT" : "POST";
      if (isEdit) {
        body.id = editingRecord!.id;
      }

      const res = await fetch(`/api/admin/${table}`, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "保存に失敗しました");
      }

      setModalOpen(false);
      fetchRecords();
    } catch (e) {
      setSaveError(e instanceof Error ? e.message : "不明なエラー");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/${table}?id=${deleteTarget.id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "削除に失敗しました");
      }
      setDeleteTarget(null);
      fetchRecords();
    } catch (e) {
      alert(e instanceof Error ? e.message : "削除に失敗しました");
    } finally {
      setDeleting(false);
    }
  };

  const formatCellValue = (field: FieldConfig, value: unknown): string => {
    if (value === null || value === undefined) return "—";
    if (field.type === "tags" && Array.isArray(value)) {
      return (value as string[]).join(", ");
    }
    const str = String(value);
    if (str.length > 50) return str.slice(0, 50) + "...";
    return str;
  };

  return (
    <div className="mx-auto max-w-6xl">
      {/* パンくず */}
      <div className="mb-4 text-sm text-gray-500">
        <a href="/admin" className="text-blue-600 hover:underline">
          ダッシュボード
        </a>
        <span className="mx-2">/</span>
        <span>{config.label}</span>
      </div>

      {/* ヘッダー */}
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-900">{config.label}</h1>
        <button
          onClick={openCreateModal}
          className="rounded bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
        >
          新規追加
        </button>
      </div>

      {/* エラー */}
      {error && (
        <div className="mb-4 rounded border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* 読み込み中 */}
      {loading && <p className="text-sm text-gray-500">読み込み中...</p>}

      {/* テーブル */}
      {!loading && records.length === 0 && (
        <p className="text-sm text-gray-500">データがありません</p>
      )}

      {!loading && records.length > 0 && (
        <div className="overflow-x-auto rounded border border-gray-200 bg-white">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-gray-200 bg-gray-50">
              <tr>
                {listFields.map((f) => (
                  <th
                    key={f.key}
                    className="px-4 py-2 text-xs font-medium uppercase text-gray-500"
                  >
                    {f.label}
                  </th>
                ))}
                <th className="px-4 py-2 text-xs font-medium uppercase text-gray-500">
                  操作
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {records.map((record) => (
                <tr key={record.id} className="hover:bg-gray-50">
                  {listFields.map((f) => (
                    <td key={f.key} className="px-4 py-2 text-gray-700">
                      {formatCellValue(f, record[f.key])}
                    </td>
                  ))}
                  <td className="px-4 py-2">
                    <button
                      onClick={() => openEditModal(record)}
                      className="mr-3 text-blue-600 hover:underline"
                    >
                      編集
                    </button>
                    <button
                      onClick={() => setDeleteTarget(record)}
                      className="text-red-600 hover:underline"
                    >
                      削除
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* 追加・編集モーダル */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="max-h-[80vh] w-full max-w-lg overflow-y-auto rounded bg-white p-6 shadow-lg">
            <h2 className="mb-4 text-lg font-bold text-gray-900">
              {editingRecord ? `${config.label} を編集` : `${config.label} を追加`}
            </h2>

            {config.fields.map((field) => (
              <div key={field.key} className="mb-3">
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  {field.label}
                  {field.required && <span className="ml-1 text-red-500">*</span>}
                </label>
                {field.type === "textarea" ? (
                  <textarea
                    value={String(formData[field.key] ?? "")}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        [field.key]: e.target.value,
                      }))
                    }
                    rows={4}
                    className="block w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                ) : (
                  <input
                    type={
                      field.type === "number"
                        ? "number"
                        : field.type === "url"
                          ? "url"
                          : field.type === "date"
                            ? "date"
                            : "text"
                    }
                    value={String(formData[field.key] ?? "")}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        [field.key]:
                          field.type === "number"
                            ? e.target.value
                            : e.target.value,
                      }))
                    }
                    className="block w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                )}
              </div>
            ))}

            {saveError && (
              <p className="mb-3 text-sm text-red-600">{saveError}</p>
            )}

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setModalOpen(false)}
                className="rounded border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
              >
                キャンセル
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="rounded bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 disabled:opacity-50"
              >
                {saving ? "保存中..." : "保存"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 削除確認ダイアログ */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="w-full max-w-sm rounded bg-white p-6 shadow-lg">
            <h2 className="mb-2 text-base font-bold text-gray-900">
              削除の確認
            </h2>
            <p className="mb-4 text-sm text-gray-600">
              「{String(deleteTarget[config.titleField] || deleteTarget.id)}」を削除しますか？この操作は取り消せません。
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDeleteTarget(null)}
                className="rounded border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
              >
                キャンセル
              </button>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="rounded bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-50"
              >
                {deleting ? "削除中..." : "削除する"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
