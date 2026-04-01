import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getAdminClient } from "@/lib/supabase-admin";
import {
  getSessionCookieName,
  validateSessionToken,
} from "@/lib/admin-session";

// 許可するテーブル名
const ALLOWED_TABLES = ["cases", "seminars", "experiences", "news", "grants", "inquiries"];

/**
 * セッション検証（共有モジュールのトークンと照合）
 */
async function verifySession(): Promise<boolean> {
  const cookieStore = await cookies();
  const session = cookieStore.get(getSessionCookieName());
  if (!session) return false;
  return validateSessionToken(session.value);
}

function validateTable(table: string): boolean {
  return ALLOWED_TABLES.includes(table);
}

/**
 * GET - 一覧取得
 */
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ table: string }> }
) {
  const { table } = await params;

  if (!validateTable(table)) {
    return NextResponse.json({ error: "無効なテーブル名です" }, { status: 400 });
  }

  const isAuthenticated = await verifySession();
  if (!isAuthenticated) {
    return NextResponse.json({ error: "認証が必要です" }, { status: 401 });
  }

  try {
    const supabase = getAdminClient();
    const { data, error } = await supabase
      .from(table)
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (e) {
    const message = e instanceof Error ? e.message : "不明なエラー";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

/**
 * POST - 新規作成
 */
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ table: string }> }
) {
  const { table } = await params;

  if (!validateTable(table)) {
    return NextResponse.json({ error: "無効なテーブル名です" }, { status: 400 });
  }

  const isAuthenticated = await verifySession();
  if (!isAuthenticated) {
    return NextResponse.json({ error: "認証が必要です" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const supabase = getAdminClient();

    // created_at, updated_at, published_atを自動設定
    const now = new Date().toISOString();
    const record = {
      ...body,
      created_at: now,
      updated_at: now,
      published_at: body.published_at || now,
    };

    const { data, error } = await supabase
      .from(table)
      .insert(record)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data, { status: 201 });
  } catch (e) {
    const message = e instanceof Error ? e.message : "不明なエラー";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

/**
 * PUT - 更新
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ table: string }> }
) {
  const { table } = await params;

  if (!validateTable(table)) {
    return NextResponse.json({ error: "無効なテーブル名です" }, { status: 400 });
  }

  const isAuthenticated = await verifySession();
  if (!isAuthenticated) {
    return NextResponse.json({ error: "認証が必要です" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { id, ...fields } = body;

    if (!id) {
      return NextResponse.json({ error: "id は必須です" }, { status: 400 });
    }

    const supabase = getAdminClient();
    const record = {
      ...fields,
      updated_at: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from(table)
      .update(record)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (e) {
    const message = e instanceof Error ? e.message : "不明なエラー";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

/**
 * DELETE - 削除
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ table: string }> }
) {
  const { table } = await params;

  if (!validateTable(table)) {
    return NextResponse.json({ error: "無効なテーブル名です" }, { status: 400 });
  }

  const isAuthenticated = await verifySession();
  if (!isAuthenticated) {
    return NextResponse.json({ error: "認証が必要です" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "id クエリパラメータは必須です" },
        { status: 400 }
      );
    }

    const supabase = getAdminClient();
    const { error } = await supabase.from(table).delete().eq("id", id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (e) {
    const message = e instanceof Error ? e.message : "不明なエラー";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
