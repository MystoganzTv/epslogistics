-- ============================================================================
-- EPS Logistics — esquema inicial
--   quote_requests : solicitudes de cotizacion enviadas desde el sitio publico
--   profiles       : usuarios internos que revisan esas solicitudes
-- El sitio es publico; solo el staff autenticado lee. RLS activo en todo.
-- ============================================================================

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------- enums ----
create type public.quote_status as enum (
  'new',
  'reviewing',
  'quoted',
  'won',
  'lost',
  'archived'
);

create type public.app_role as enum ('staff', 'admin');

-- -------------------------------------------------------------- profiles ---
create table public.profiles (
  id          uuid primary key references auth.users (id) on delete cascade,
  email       text not null,
  full_name   text,
  role        public.app_role not null default 'staff',
  created_at  timestamptz not null default now()
);

comment on table public.profiles is
  'Usuarios internos de EPS. Se crea automaticamente al registrarse en auth.users.';

-- Crea el perfil en cuanto nace el usuario de auth.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name)
  values (
    new.id,
    new.email,
    nullif(new.raw_user_meta_data ->> 'full_name', '')
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Helper: ¿el usuario actual es staff? SECURITY DEFINER evita recursion de RLS.
create or replace function public.is_staff()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles where id = auth.uid()
  );
$$;

-- -------------------------------------------------------- quote_requests ---
create table public.quote_requests (
  id              uuid primary key default gen_random_uuid(),
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now(),
  status          public.quote_status not null default 'new',

  -- Empresa que solicita
  company         text not null check (char_length(trim(company)) between 1 and 200),
  contact_name    text not null check (char_length(trim(contact_name)) between 1 and 200),
  email           text not null check (email ~* '^[^@\s]+@[^@\s]+\.[a-z]{2,}$'),
  phone           text not null check (char_length(regexp_replace(phone, '\D', '', 'g')) between 10 and 15),

  -- La lane
  pickup_city     text not null check (char_length(trim(pickup_city)) between 1 and 120),
  pickup_state    char(2) not null,
  delivery_city   text not null check (char_length(trim(delivery_city)) between 1 and 120),
  delivery_state  char(2) not null,

  -- El envio
  pickup_date     date not null,
  freight_type    text not null,
  pallets         integer check (pallets is null or (pallets >= 0 and pallets <= 100)),
  weight_lbs      integer check (weight_lbs is null or (weight_lbs >= 0 and weight_lbs <= 200000)),
  notes           text check (notes is null or char_length(notes) <= 4000),

  -- Trazabilidad interna
  source          text not null default 'website',
  internal_notes  text
);

comment on table public.quote_requests is
  'Solicitudes de cotizacion del formulario publico. Cualquiera inserta; solo staff lee.';

create index quote_requests_created_at_idx on public.quote_requests (created_at desc);
create index quote_requests_status_idx on public.quote_requests (status, created_at desc);
create index quote_requests_email_idx on public.quote_requests (lower(email));

create or replace function public.touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger quote_requests_touch_updated_at
  before update on public.quote_requests
  for each row execute function public.touch_updated_at();

-- ------------------------------------------------------------------ RLS ----
alter table public.profiles enable row level security;
alter table public.quote_requests enable row level security;

-- profiles: cada quien ve el suyo; el staff ve a todos.
create policy "profiles: leer el propio"
  on public.profiles for select
  to authenticated
  using (id = auth.uid());

-- El rol no se puede cambiar desde el cliente: el GRANT de abajo solo expone
-- full_name, asi que no hace falta comprobarlo en la policy (y se evita la
-- recursion de consultar profiles dentro de una policy sobre profiles).
create policy "profiles: actualizar el propio"
  on public.profiles for update
  to authenticated
  using (id = auth.uid())
  with check (id = auth.uid());

-- quote_requests: el formulario publico inserta, nadie anonimo lee.
create policy "quote_requests: enviar desde el sitio"
  on public.quote_requests for insert
  to anon, authenticated
  with check (
    status = 'new'
    and internal_notes is null
    and source = 'website'
  );

create policy "quote_requests: el staff lee todo"
  on public.quote_requests for select
  to authenticated
  using (public.is_staff());

create policy "quote_requests: el staff actualiza"
  on public.quote_requests for update
  to authenticated
  using (public.is_staff())
  with check (public.is_staff());

-- Sin policy de DELETE: las solicitudes se archivan (status = 'archived'), no se borran.

-- --------------------------------------------------------------- grants ----
revoke all on public.quote_requests from anon, authenticated;
grant insert on public.quote_requests to anon, authenticated;
grant select, update on public.quote_requests to authenticated;

revoke all on public.profiles from anon, authenticated;
grant select on public.profiles to authenticated;
grant update (full_name) on public.profiles to authenticated;
