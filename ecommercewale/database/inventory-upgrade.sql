-- Run for existing and new databases before deploying the inventory upgrade.
alter table public.ew_products add column if not exists stock integer not null default 0 check (stock between 0 and 10000);
alter table public.ew_products add column if not exists sku text not null default '';
alter table public.ew_products add column if not exists warranty text not null default '';
alter table public.ew_products add column if not exists accessories text not null default '';
alter table public.ew_products add column if not exists inspection text not null default '';
