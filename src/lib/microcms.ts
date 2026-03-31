import { supabase } from "./supabase";
import type { Seminar, Case, News, Experience, Grant } from "./types";

type ListResponse<T> = {
  contents: T[];
  totalCount: number;
};

type FetchOptions = {
  limit?: number;
  offset?: number;
};

async function fetchList<T>(
  table: string,
  orderBy: string,
  options: FetchOptions = {}
): Promise<ListResponse<T>> {
  const { limit = 100, offset = 0 } = options;

  // まず総件数を取得
  const { count } = await supabase
    .from(table)
    .select("*", { count: "exact", head: true });

  const { data, error } = await supabase
    .from(table)
    .select("*")
    .order(orderBy, { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) {
    console.error(`Supabase error fetching ${table}:`, error.message);
    return { contents: [], totalCount: 0 };
  }

  return {
    contents: (data ?? []) as T[],
    totalCount: count ?? 0,
  };
}

async function fetchDetail<T>(table: string, id: string): Promise<T | null> {
  const { data, error } = await supabase
    .from(table)
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error(`Supabase error fetching ${table}/${id}:`, error.message);
    return null;
  }

  return data as T;
}

/** セミナー一覧 */
export function getSeminars(options?: FetchOptions) {
  return fetchList<Seminar>("seminars", "date", options);
}

/** セミナー詳細 */
export function getSeminar(id: string) {
  return fetchDetail<Seminar>("seminars", id);
}

/** 成功事例一覧 */
export function getCases(options?: FetchOptions) {
  return fetchList<Case>("cases", "published_at", options);
}

/** 成功事例詳細 */
export function getCase(id: string) {
  return fetchDetail<Case>("cases", id);
}

/** お知らせ一覧 */
export function getNews(options?: FetchOptions) {
  return fetchList<News>("news", "date", options);
}

/** 企業見学体験記一覧 */
export function getExperiences(options?: FetchOptions) {
  return fetchList<Experience>("experiences", "published_at", options);
}

/** 企業見学体験記詳細 */
export function getExperience(id: string) {
  return fetchDetail<Experience>("experiences", id);
}

/** 補助金情報一覧 */
export function getGrants(options?: FetchOptions) {
  return fetchList<Grant>("grants", "published_at", options);
}
