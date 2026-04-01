-- 既存のinquiriesテーブルを拡張
alter table inquiries add column if not exists address text;
alter table inquiries add column if not exists representative_name text;
alter table inquiries add column if not exists industry text;
alter table inquiries add column if not exists employee_count text;
alter table inquiries add column if not exists consultation_purposes jsonb default '[]'::jsonb;
alter table inquiries add column if not exists challenges jsonb default '[]'::jsonb;
alter table inquiries add column if not exists challenge_other text;
alter table inquiries add column if not exists preferred_date_1 text;
alter table inquiries add column if not exists preferred_date_2 text;
alter table inquiries add column if not exists preferred_date_3 text;
alter table inquiries add column if not exists privacy_agreed boolean default false;

-- categoryをnullable化（新フォームでは使わない）
alter table inquiries alter column category drop not null;
-- messageもnullable化
alter table inquiries alter column message drop not null;
