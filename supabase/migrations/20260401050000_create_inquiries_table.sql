-- お問い合わせテーブル
create table if not exists inquiries (
  id uuid primary key default gen_random_uuid(),
  company text not null,
  name text not null,
  email text not null,
  phone text,
  category text not null,
  message text not null,
  status text not null default 'new',
  created_at timestamptz not null default now()
);

-- RLS有効化
alter table inquiries enable row level security;

-- anonキーからのINSERTのみ許可（フォーム送信用）
create policy "Allow anonymous insert" on inquiries
  for insert to anon with check (true);

-- service_roleはRLSバイパスするので管理画面用のポリシーは不要
