import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { company, name, email, phone } = body;

    // 最低限のバリデーション
    if (!company || !name || !email) {
      return NextResponse.json(
        { error: "必須項目を入力してください" },
        { status: 400 }
      );
    }

    // anonキーでinsert（RLSのinsertポリシーで許可済み）
    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    const { error } = await supabase.from("inquiries").insert({
      company,
      name,
      email,
      phone: phone || null,
      address: body.address || null,
      representative_name: body.representative_name || null,
      industry: body.industry || null,
      employee_count: body.employee_count || null,
      category: body.category || null,
      message: body.message || null,
      consultation_purposes: body.consultation_purposes || [],
      challenges: body.challenges || [],
      challenge_other: body.challenge_other || null,
      preferred_date_1: body.preferred_date_1 || null,
      preferred_date_2: body.preferred_date_2 || null,
      preferred_date_3: body.preferred_date_3 || null,
      privacy_agreed: body.privacy_agreed || false,
    });

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json(
        { error: "送信に失敗しました" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "送信に失敗しました" },
      { status: 500 }
    );
  }
}
