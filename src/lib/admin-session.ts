/**
 * 管理画面セッション管理
 * サーバープロセス内でセッショントークンを共有する
 */

const SESSION_COOKIE = "admin_session";

// サーバー起動ごとにランダム生成されるセッショントークン
let sessionToken = crypto.randomUUID();

export function getSessionCookieName(): string {
  return SESSION_COOKIE;
}

export function getSessionToken(): string {
  return sessionToken;
}

export function regenerateSessionToken(): string {
  sessionToken = crypto.randomUUID();
  return sessionToken;
}

export function validateSessionToken(token: string): boolean {
  return token === sessionToken;
}
