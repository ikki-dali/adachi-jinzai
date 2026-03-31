/** 共通型 */
export type ContentBase = {
  id: string;
  created_at: string;
  updated_at: string;
  published_at: string;
};

/** セミナー */
export type Seminar = ContentBase & {
  title: string;
  date: string;
  location: string;
  description: string;
  capacity: number;
  apply_url: string | null;
  thumbnail_url: string | null;
};

/** 成功事例 */
export type Case = ContentBase & {
  company_name: string;
  industry: string;
  challenge: string;
  approach: string;
  result: string;
  image_url: string | null;
};

/** お知らせ */
export type News = ContentBase & {
  title: string;
  body: string;
  date: string;
  category: string[];
};

/** 企業見学体験記 */
export type Experience = ContentBase & {
  title: string;
  school_name: string;
  content: string;
  image_url: string | null;
};

/** 補助金・助成金情報 */
export type Grant = ContentBase & {
  name: string;
  summary: string;
  target: string;
  amount: string;
  apply_url: string;
};
