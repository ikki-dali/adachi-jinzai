import type {
  MicroCMSListResponse,
  Seminar,
  Case,
  News,
  Experience,
  Grant,
} from "./types";

const SERVICE_DOMAIN = process.env.MICROCMS_SERVICE_DOMAIN;
const API_KEY = process.env.MICROCMS_API_KEY;

type FetchOptions = {
  limit?: number;
  offset?: number;
  orders?: string;
  filters?: string;
};

async function fetchList<T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<MicroCMSListResponse<T>> {
  if (!SERVICE_DOMAIN || !API_KEY) {
    // 開発時はダミーデータを返す
    return { contents: [], totalCount: 0, offset: 0, limit: 10 };
  }

  const params = new URLSearchParams();
  if (options.limit) params.set("limit", String(options.limit));
  if (options.offset) params.set("offset", String(options.offset));
  if (options.orders) params.set("orders", options.orders);
  if (options.filters) params.set("filters", options.filters);

  const query = params.toString() ? `?${params.toString()}` : "";
  const res = await fetch(
    `https://${SERVICE_DOMAIN}.microcms.io/api/v1/${endpoint}${query}`,
    {
      headers: { "X-MICROCMS-API-KEY": API_KEY },
      next: { revalidate: 60 },
    }
  );

  if (!res.ok) {
    throw new Error(`microCMS API error: ${res.status} ${res.statusText}`);
  }

  return res.json();
}

async function fetchDetail<T>(endpoint: string, id: string): Promise<T> {
  if (!SERVICE_DOMAIN || !API_KEY) {
    throw new Error("microCMS credentials not configured");
  }

  const res = await fetch(
    `https://${SERVICE_DOMAIN}.microcms.io/api/v1/${endpoint}/${id}`,
    {
      headers: { "X-MICROCMS-API-KEY": API_KEY },
      next: { revalidate: 60 },
    }
  );

  if (!res.ok) {
    throw new Error(`microCMS API error: ${res.status} ${res.statusText}`);
  }

  return res.json();
}

/** セミナー一覧 */
export function getSeminars(options?: FetchOptions) {
  return fetchList<Seminar>("seminars", { orders: "-date", ...options });
}

/** セミナー詳細 */
export function getSeminar(id: string) {
  return fetchDetail<Seminar>("seminars", id);
}

/** 成功事例一覧 */
export function getCases(options?: FetchOptions) {
  return fetchList<Case>("cases", { orders: "-publishedAt", ...options });
}

/** 成功事例詳細 */
export function getCase(id: string) {
  return fetchDetail<Case>("cases", id);
}

/** お知らせ一覧 */
export function getNews(options?: FetchOptions) {
  return fetchList<News>("news", { orders: "-date", ...options });
}

/** 企業見学体験記一覧 */
export function getExperiences(options?: FetchOptions) {
  return fetchList<Experience>("experiences", {
    orders: "-publishedAt",
    ...options,
  });
}

/** 企業見学体験記詳細 */
export function getExperience(id: string) {
  return fetchDetail<Experience>("experiences", id);
}

/** 補助金情報一覧 */
export function getGrants(options?: FetchOptions) {
  return fetchList<Grant>("grants", { orders: "-publishedAt", ...options });
}
