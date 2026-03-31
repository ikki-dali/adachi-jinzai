"use client";

import { useState, useEffect, useCallback } from "react";

/**
 * 管理画面レイアウト
 * 親layoutのHeader/Footer/ChatWidgetを覆い隠す全画面レイアウト
 */
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const checkAuth = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/auth");
      setAuthenticated(res.ok);
    } catch {
      setAuthenticated(false);
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        setAuthenticated(true);
      } else {
        const data = await res.json();
        setError(data.error || "認証に失敗しました");
      }
    } catch {
      setError("通信エラーが発生しました");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/admin/auth", { method: "DELETE" });
    setAuthenticated(false);
    setPassword("");
  };

  // 読み込み中
  if (authenticated === null) {
    return (
      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white">
        <p className="text-gray-500">読み込み中...</p>
      </div>
    );
  }

  // ログイン画面
  if (!authenticated) {
    return (
      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-gray-50">
        <div className="w-full max-w-sm rounded border border-gray-200 bg-white p-8">
          <h1 className="mb-6 text-center text-lg font-bold text-gray-900">
            管理画面ログイン
          </h1>
          <form onSubmit={handleLogin}>
            <label
              htmlFor="admin-password"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              パスワード
            </label>
            <input
              id="admin-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mb-4 block w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="パスワードを入力"
              autoFocus
            />
            {error && (
              <p className="mb-3 text-sm text-red-600">{error}</p>
            )}
            <button
              type="submit"
              disabled={loading || !password}
              className="w-full rounded bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 disabled:opacity-50"
            >
              {loading ? "認証中..." : "ログイン"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // 認証済み: 管理画面
  return (
    <div className="fixed inset-0 z-[9999] overflow-auto bg-gray-50">
      {/* ヘッダー */}
      <header className="sticky top-0 z-10 border-b border-gray-200 bg-white">
        <div className="flex items-center justify-between px-6 py-3">
          <a href="/admin" className="text-base font-bold text-gray-900 no-underline">
            管理画面
          </a>
          <button
            onClick={handleLogout}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            ログアウト
          </button>
        </div>
      </header>
      {/* コンテンツ */}
      <div className="p-6">{children}</div>
    </div>
  );
}
