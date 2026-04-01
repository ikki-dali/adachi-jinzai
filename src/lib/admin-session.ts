/**
 * 管理画面セッション管理
 * ADMIN_PASSWORDからSHA-256ハッシュでトークンを生成（サーバーレス環境対応）
 */

import { createHash } from "crypto";

const SESSION_COOKIE = "admin_session";
const TOKEN_SALT = "adachi-jinzai-admin-v1";

function deriveToken(): string {
  const password = process.env.ADMIN_PASSWORD ?? "";
  return createHash("sha256")
    .update(`${TOKEN_SALT}:${password}`)
    .digest("hex");
}

export function getSessionCookieName(): string {
  return SESSION_COOKIE;
}

export function getSessionToken(): string {
  return deriveToken();
}

export function validateSessionToken(token: string): boolean {
  return token === deriveToken();
}
