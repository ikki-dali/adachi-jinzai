import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  getSessionCookieName,
  getSessionToken,
  validateSessionToken,
} from "@/lib/admin-session";

/**
 * パスワード認証 & セッション管理
 */
export async function POST(request: NextRequest) {
  const body = await request.json();
  const { password } = body;

  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) {
    return NextResponse.json(
      { error: "ADMIN_PASSWORD が環境変数に設定されていません" },
      { status: 500 }
    );
  }

  if (password !== adminPassword) {
    return NextResponse.json(
      { error: "パスワードが正しくありません" },
      { status: 401 }
    );
  }

  // セッションcookieを設定
  const cookieStore = await cookies();
  cookieStore.set(getSessionCookieName(), getSessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24, // 24時間
  });

  return NextResponse.json({ success: true });
}

/**
 * セッション検証（GET）
 */
export async function GET() {
  const cookieStore = await cookies();
  const session = cookieStore.get(getSessionCookieName());

  if (!session || !validateSessionToken(session.value)) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  return NextResponse.json({ authenticated: true });
}

/**
 * ログアウト（DELETE）
 */
export async function DELETE() {
  const cookieStore = await cookies();
  cookieStore.delete(getSessionCookieName());
  return NextResponse.json({ success: true });
}
