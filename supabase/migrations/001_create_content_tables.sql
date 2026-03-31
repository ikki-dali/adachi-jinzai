-- 支援事例
create table if not exists cases (
  id uuid primary key default gen_random_uuid(),
  company_name text not null,
  industry text not null,
  challenge text not null,
  approach text not null,
  result text not null,
  image_url text,
  published_at timestamptz default now(),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- セミナー
create table if not exists seminars (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  date timestamptz not null,
  location text not null,
  description text not null,
  capacity int not null default 0,
  apply_url text,
  thumbnail_url text,
  published_at timestamptz default now(),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 企業見学体験記
create table if not exists experiences (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  school_name text not null,
  content text not null,
  image_url text,
  published_at timestamptz default now(),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- お知らせ
create table if not exists news (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  body text not null,
  date timestamptz not null,
  category text[] default '{}',
  published_at timestamptz default now(),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 補助金情報
create table if not exists grants (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  summary text not null,
  target text not null,
  amount text not null,
  apply_url text not null,
  published_at timestamptz default now(),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- updated_at自動更新トリガー
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger cases_updated_at before update on cases for each row execute function update_updated_at();
create trigger seminars_updated_at before update on seminars for each row execute function update_updated_at();
create trigger experiences_updated_at before update on experiences for each row execute function update_updated_at();
create trigger news_updated_at before update on news for each row execute function update_updated_at();
create trigger grants_updated_at before update on grants for each row execute function update_updated_at();

-- RLS: anonで読み取り可能
alter table cases enable row level security;
alter table seminars enable row level security;
alter table experiences enable row level security;
alter table news enable row level security;
alter table grants enable row level security;

create policy "Public read cases" on cases for select using (true);
create policy "Public read seminars" on seminars for select using (true);
create policy "Public read experiences" on experiences for select using (true);
create policy "Public read news" on news for select using (true);
create policy "Public read grants" on grants for select using (true);
