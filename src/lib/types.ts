/** microCMS共通型 */
export type MicroCMSContent = {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
};

export type MicroCMSImage = {
  url: string;
  height: number;
  width: number;
};

export type MicroCMSListResponse<T> = {
  contents: T[];
  totalCount: number;
  offset: number;
  limit: number;
};

/** セミナー */
export type Seminar = MicroCMSContent & {
  title: string;
  date: string;
  location: string;
  description: string;
  capacity: number;
  applyUrl: string;
  thumbnail?: MicroCMSImage;
};

/** 成功事例 */
export type Case = MicroCMSContent & {
  companyName: string;
  industry: string;
  challenge: string;
  approach: string;
  result: string;
  image?: MicroCMSImage;
};

/** お知らせ */
export type News = MicroCMSContent & {
  title: string;
  body: string;
  date: string;
  category: string[];
};

/** 企業見学体験記 */
export type Experience = MicroCMSContent & {
  title: string;
  schoolName: string;
  content: string;
  image?: MicroCMSImage;
};

/** 補助金・助成金情報 */
export type Grant = MicroCMSContent & {
  name: string;
  summary: string;
  target: string;
  amount: string;
  applyUrl: string;
};
