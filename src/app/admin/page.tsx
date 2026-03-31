"use client";

import { useEffect, useState } from "react";

type TableInfo = {
  name: string;
  label: string;
  path: string;
};

const TABLES: TableInfo[] = [
  { name: "cases", label: "支援事例", path: "/admin/cases" },
  { name: "seminars", label: "セミナー", path: "/admin/seminars" },
  { name: "experiences", label: "企業見学体験記", path: "/admin/experiences" },
  { name: "news", label: "お知らせ", path: "/admin/news" },
  { name: "grants", label: "補助金・助成金", path: "/admin/grants" },
];

export default function AdminDashboard() {
  const [counts, setCounts] = useState<Record<string, number | null>>({});

  useEffect(() => {
    TABLES.forEach(async (table) => {
      try {
        const res = await fetch(`/api/admin/${table.name}`);
        if (res.ok) {
          const data = await res.json();
          setCounts((prev) => ({ ...prev, [table.name]: data.length }));
        } else {
          setCounts((prev) => ({ ...prev, [table.name]: null }));
        }
      } catch {
        setCounts((prev) => ({ ...prev, [table.name]: null }));
      }
    });
  }, []);

  return (
    <div className="mx-auto max-w-4xl">
      <h1 className="mb-6 text-xl font-bold text-gray-900">ダッシュボード</h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {TABLES.map((table) => (
          <a
            key={table.name}
            href={table.path}
            className="block rounded border border-gray-200 bg-white p-5 no-underline transition-colors hover:border-gray-300 hover:bg-gray-50"
          >
            <p className="mb-1 text-sm text-gray-500">{table.label}</p>
            <p className="text-2xl font-bold text-gray-900">
              {counts[table.name] !== undefined
                ? counts[table.name] !== null
                  ? `${counts[table.name]} 件`
                  : "取得エラー"
                : "..."}
            </p>
          </a>
        ))}
      </div>
    </div>
  );
}
