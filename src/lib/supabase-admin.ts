import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

/**
 * service_role keyを使ったSupabaseクライアント（サーバーサイド専用）
 * RLSをバイパスして管理操作を行う
 */
export function getAdminClient() {
  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error(
      "SUPABASE_SERVICE_ROLE_KEY または NEXT_PUBLIC_SUPABASE_URL が設定されていません"
    );
  }

  if (serviceRoleKey === "placeholder") {
    throw new Error(
      "SUPABASE_SERVICE_ROLE_KEY が placeholder のままです。実際のキーを設定してください"
    );
  }

  return createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
