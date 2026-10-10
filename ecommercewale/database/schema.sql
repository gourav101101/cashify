-- Run in your Supabase SQL Editor. No public-table access is granted.
create table if not exists public.ew_products (
  id text primary key check (id ~ '^[a-z0-9-]{3,100}$'),
  brand text not null, name text not null, storage text not null,
  price integer not null check (price > 0 and price <= 500000),
  original_price integer not null default 0 check (original_price >= 0),
  buyback integer not null default 0 check (buyback >= 0),
  colour text not null default '', tone text not null default 'midnight',
  grade text not null check (grade in ('Fair','Good','Superb')),
  tag text not null default '', battery text not null default 'Inspection required',
  description text not null default '', is_demo boolean not null default true,
  active boolean not null default true, created_at timestamptz not null default now()
);
create table if not exists public.ew_enquiries (
  id uuid primary key default gen_random_uuid(), reference text unique not null,
  type text not null check (type in ('sell','buy','support')),
  name text not null, phone text not null check (phone ~ '^[6-9][0-9]{9}$'),
  city text not null check (city in ('Indore','Ujjain','Dewas')),
  pin text not null check (pin ~ '^[0-9]{6}$'), address text not null default '',
  message text not null default '', consent boolean not null check (consent),
  product_id text, product_ids jsonb not null default '[]', product_name text,
  condition jsonb, estimate integer, date date, slot text,
  status text not null default 'received' check (status in ('received','reviewing','contacted','scheduled','completed','cancelled')),
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table if not exists public.ew_service_areas (
  city text primary key check (city in ('Indore','Ujjain','Dewas')),
  pins jsonb not null default '[]', active boolean not null default false
);
create table if not exists public.ew_rate_limits (
  key text primary key, count integer not null default 1, expires_at timestamptz not null
);
create or replace function public.ew_consume_limit(p_key text, p_expires timestamptz)
returns integer language plpgsql security definer set search_path = public as $$
declare result integer;
begin
  delete from public.ew_rate_limits where expires_at < now();
  insert into public.ew_rate_limits(key,count,expires_at) values(p_key,1,p_expires)
  on conflict(key) do update set count = public.ew_rate_limits.count + 1
  returning count into result;
  return result;
end;
$$;
alter table public.ew_products enable row level security;
alter table public.ew_enquiries enable row level security;
alter table public.ew_service_areas enable row level security;
alter table public.ew_rate_limits enable row level security;
revoke all on public.ew_products, public.ew_enquiries, public.ew_service_areas, public.ew_rate_limits from anon, authenticated;
grant all on public.ew_products, public.ew_enquiries, public.ew_service_areas, public.ew_rate_limits to service_role;
revoke all on function public.ew_consume_limit(text,timestamptz) from public, anon, authenticated;
grant execute on function public.ew_consume_limit(text,timestamptz) to service_role;
insert into public.ew_service_areas(city,pins,active) values
  ('Indore','[]',false),('Ujjain','[]',false),('Dewas','[]',false)
on conflict(city) do nothing;
create index if not exists ew_enquiries_created on public.ew_enquiries(created_at desc);

-- Run for existing and new databases before deploying the inventory upgrade.
alter table public.ew_products add column if not exists stock integer not null default 0 check (stock between 0 and 10000);
alter table public.ew_products add column if not exists sku text not null default '';
alter table public.ew_products add column if not exists warranty text not null default '';
alter table public.ew_products add column if not exists accessories text not null default '';
alter table public.ew_products add column if not exists inspection text not null default '';
