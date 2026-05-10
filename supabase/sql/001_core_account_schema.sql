create extension if not exists pgcrypto;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table if not exists public.profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references auth.users(id) on delete cascade,
  display_name text not null default '',
  username text not null unique,
  avatar_url text,
  bio text not null default '',
  email text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.shopping_preferences (
  user_id uuid primary key references auth.users(id) on delete cascade,
  preferred_currency text not null default 'PHP' check (preferred_currency in ('PHP', 'JPY')),
  preferred_shipping_method text not null default 'standard' check (preferred_shipping_method in ('standard', 'express')),
  preferred_scales text[] not null default array['1/7 Scale', 'Nendoroid'],
  shipping_region text not null default 'Philippines' check (shipping_region in ('Philippines', 'Japan', 'Singapore', 'United States')),
  updated_at timestamptz not null default now()
);

create table if not exists public.notification_preferences (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references auth.users(id) on delete cascade,
  push_enabled boolean not null default true,
  email_enabled boolean not null default true,
  wishlist_restock boolean not null default true,
  preorder_closing boolean not null default true,
  flash_sales boolean not null default false,
  order_updates boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.app_preferences (
  user_id uuid primary key references auth.users(id) on delete cascade,
  preferred_language text not null default 'en' check (preferred_language in ('en', 'fil', 'ja')),
  theme text not null default 'dark' check (theme in ('dark')),
  cache_size text not null default '128 MB',
  updated_at timestamptz not null default now()
);

drop trigger if exists profiles_set_updated_at on public.profiles;
create trigger profiles_set_updated_at
before update on public.profiles
for each row execute function public.set_updated_at();

drop trigger if exists shopping_preferences_set_updated_at on public.shopping_preferences;
create trigger shopping_preferences_set_updated_at
before update on public.shopping_preferences
for each row execute function public.set_updated_at();

drop trigger if exists notification_preferences_set_updated_at on public.notification_preferences;
create trigger notification_preferences_set_updated_at
before update on public.notification_preferences
for each row execute function public.set_updated_at();

drop trigger if exists app_preferences_set_updated_at on public.app_preferences;
create trigger app_preferences_set_updated_at
before update on public.app_preferences
for each row execute function public.set_updated_at();

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  base_username text;
begin
  base_username := lower(regexp_replace(split_part(new.email, '@', 1), '[^a-z0-9_]+', '_', 'g'));

  insert into public.profiles (user_id, display_name, username, email)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'display_name', split_part(new.email, '@', 1)),
    base_username || '_' || substr(new.id::text, 1, 8),
    coalesce(new.email, '')
  )
  on conflict (user_id) do nothing;

  insert into public.shopping_preferences (user_id)
  values (new.id)
  on conflict (user_id) do nothing;

  insert into public.notification_preferences (user_id)
  values (new.id)
  on conflict (user_id) do nothing;

  insert into public.app_preferences (user_id)
  values (new.id)
  on conflict (user_id) do nothing;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

alter table public.profiles enable row level security;
alter table public.shopping_preferences enable row level security;
alter table public.notification_preferences enable row level security;
alter table public.app_preferences enable row level security;

drop policy if exists "Users can read their own profile" on public.profiles;
create policy "Users can read their own profile"
on public.profiles for select
to authenticated
using (auth.uid() = user_id);

drop policy if exists "Users can update their own profile" on public.profiles;
create policy "Users can update their own profile"
on public.profiles for update
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "Users can insert their own profile" on public.profiles;
create policy "Users can insert their own profile"
on public.profiles for insert
to authenticated
with check (auth.uid() = user_id);

drop policy if exists "Users can manage their own shopping preferences" on public.shopping_preferences;
create policy "Users can manage their own shopping preferences"
on public.shopping_preferences for all
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "Users can manage their own notification preferences" on public.notification_preferences;
create policy "Users can manage their own notification preferences"
on public.notification_preferences for all
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "Users can manage their own app preferences" on public.app_preferences;
create policy "Users can manage their own app preferences"
on public.app_preferences for all
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

insert into storage.buckets (id, name, public)
values ('avatars', 'avatars', true)
on conflict (id) do nothing;

drop policy if exists "Users can read avatars" on storage.objects;
create policy "Users can read avatars"
on storage.objects for select
to public
using (bucket_id = 'avatars');

drop policy if exists "Users can upload their avatar" on storage.objects;
create policy "Users can upload their avatar"
on storage.objects for insert
to authenticated
with check (bucket_id = 'avatars' and (storage.foldername(name))[1] = auth.uid()::text);

drop policy if exists "Users can update their avatar" on storage.objects;
create policy "Users can update their avatar"
on storage.objects for update
to authenticated
using (bucket_id = 'avatars' and (storage.foldername(name))[1] = auth.uid()::text)
with check (bucket_id = 'avatars' and (storage.foldername(name))[1] = auth.uid()::text);
