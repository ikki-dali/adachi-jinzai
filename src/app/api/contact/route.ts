import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const resendApiKey = process.env.RESEND_API_KEY;
const notificationEmail = process.env.CONTACT_NOTIFICATION_EMAIL;

const EMPLOYEE_COUNT_LABELS: Record<string, string> = {
  "1-5": "1〜5名",
  "6-20": "6〜20名",
  "21-50": "21〜50名",
  "51-100": "51〜100名",
  "101-300": "101〜300名",
  "301+": "301名以上",
};

const CHALLENGE_LABELS: Record<string, string> = {
  recruitment: "採用",
  retention: "定着",
  training: "育成",
  other: "その他",
};

type InquiryPayload = {
  company: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  representative_name?: string;
  industry?: string;
  employee_count?: string;
  category?: string;
  message?: string;
  consultation_purposes?: string[];
  challenges?: string[];
  challenge_other?: string;
  preferred_date_1?: string;
  preferred_date_2?: string;
  preferred_date_3?: string;
};

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function row(label: string, value: string | undefined | null): string {
  const display = value && value.length > 0 ? escapeHtml(value) : "（未入力）";
  return `<tr><th align="left" style="padding:8px 12px;background:#f5f5f5;border:1px solid #ddd;width:160px;vertical-align:top;">${escapeHtml(label)}</th><td style="padding:8px 12px;border:1px solid #ddd;vertical-align:top;">${display}</td></tr>`;
}

function buildEmailHtml(data: InquiryPayload): string {
  const purposes = (data.consultation_purposes ?? []).join("、");
  const challenges = (data.challenges ?? [])
    .map((id) => CHALLENGE_LABELS[id] ?? id)
    .join("、");
  const employeeCount = data.employee_count
    ? EMPLOYEE_COUNT_LABELS[data.employee_count] ?? data.employee_count
    : "";

  return `<!doctype html>
<html><body style="font-family:-apple-system,BlinkMacSystemFont,'Hiragino Sans',sans-serif;color:#333;">
<h2 style="border-bottom:2px solid #0066cc;padding-bottom:8px;">新規お問い合わせ</h2>
<p>足立区 区内中小企業人材確保支援事業 のお問い合わせフォームに新規申込がありました。</p>

<h3 style="margin-top:24px;">企業基本情報</h3>
<table style="border-collapse:collapse;width:100%;font-size:14px;">
${row("企業名", data.company)}
${row("所在地", data.address)}
${row("代表者名", data.representative_name)}
${row("ご担当者名", data.name)}
${row("電話番号", data.phone)}
${row("メールアドレス", data.email)}
${row("業種", data.industry)}
${row("従業員数", employeeCount)}
</table>

<h3 style="margin-top:24px;">ご相談の目的</h3>
<table style="border-collapse:collapse;width:100%;font-size:14px;">
${row("相談目的", purposes)}
${row("人材課題", challenges)}
${row("具体的なお悩み", data.challenge_other)}
</table>

<h3 style="margin-top:24px;">初回相談の希望日時</h3>
<table style="border-collapse:collapse;width:100%;font-size:14px;">
${row("第1希望", data.preferred_date_1)}
${row("第2希望", data.preferred_date_2)}
${row("第3希望", data.preferred_date_3)}
</table>

<p style="margin-top:24px;color:#666;font-size:12px;">このメールは自動送信されています。詳細は管理画面からもご確認いただけます。</p>
</body></html>`;
}

async function sendNotification(data: InquiryPayload): Promise<void> {
  if (!resendApiKey || !notificationEmail) {
    console.warn("Resend not configured: skipping notification email");
    return;
  }

  const resend = new Resend(resendApiKey);
  const { error } = await resend.emails.send({
    from: "足立区人材確保支援事業 <noreply@formsell.jp>",
    to: notificationEmail,
    replyTo: data.email,
    subject: `【新規お問い合わせ】${data.company} ${data.name}様`,
    html: buildEmailHtml(data),
  });

  if (error) {
    console.error("Resend send error:", error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as InquiryPayload & { privacy_agreed?: boolean };

    const { company, name, email, phone } = body;

    if (!company || !name || !email) {
      return NextResponse.json(
        { error: "必須項目を入力してください" },
        { status: 400 }
      );
    }

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

    await sendNotification(body);

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json(
      { error: "送信に失敗しました" },
      { status: 500 }
    );
  }
}
