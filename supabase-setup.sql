-- ============================================================
-- Team Alpha — Setup do Supabase
-- ============================================================
-- Cole TODO este script no SQL Editor do Supabase:
-- Dashboard → SQL Editor → New query → cole → Run
-- ============================================================

-- ============================================================
-- 1. Tabela: galeria_fotos
-- ============================================================
create table if not exists public.galeria_fotos (
  id          uuid primary key default gen_random_uuid(),
  titulo      text not null,
  descricao   text,
  imagem_url  text not null,
  imagem_path text,
  destaque    boolean not null default false,
  ordem       integer not null default 0,
  criado_em   timestamptz not null default now(),
  atualizado_em timestamptz not null default now()
);

-- Índice para ordenação
create index if not exists galeria_fotos_ordem_idx
  on public.galeria_fotos (ordem, criado_em desc);

-- ============================================================
-- 2. Storage bucket (público para leitura)
-- ============================================================
insert into storage.buckets (id, name, public)
values ('galeria', 'galeria', true)
on conflict (id) do nothing;

-- ============================================================
-- 3. RLS (Row Level Security)
-- ============================================================
alter table public.galeria_fotos enable row level security;

-- Política: qualquer um pode LER (visitantes do site)
drop policy if exists "galeria_fotos_read_all" on public.galeria_fotos;
create policy "galeria_fotos_read_all"
  on public.galeria_fotos
  for select
  using (true);

-- Política: só autenticados (admin) podem INSERIR
drop policy if exists "galeria_fotos_insert_auth" on public.galeria_fotos;
create policy "galeria_fotos_insert_auth"
  on public.galeria_fotos
  for insert
  to authenticated
  with check (true);

-- Política: só autenticados (admin) podem ATUALIZAR
drop policy if exists "galeria_fotos_update_auth" on public.galeria_fotos;
create policy "galeria_fotos_update_auth"
  on public.galeria_fotos
  for update
  to authenticated
  using (true)
  with check (true);

-- Política: só autenticados (admin) podem DELETAR
drop policy if exists "galeria_fotos_delete_auth" on public.galeria_fotos;
create policy "galeria_fotos_delete_auth"
  on public.galeria_fotos
  for delete
  to authenticated
  using (true);

-- ============================================================
-- 4. Storage: políticas de acesso ao bucket
-- ============================================================
-- Leitura pública
drop policy if exists "galeria_bucket_read_all" on storage.objects;
create policy "galeria_bucket_read_all"
  on storage.objects
  for select
  using (bucket_id = 'galeria');

-- Upload só para autenticados
drop policy if exists "galeria_bucket_upload_auth" on storage.objects;
create policy "galeria_bucket_upload_auth"
  on storage.objects
  for insert
  to authenticated
  with check (bucket_id = 'galeria');

-- Update só para autenticados
drop policy if exists "galeria_bucket_update_auth" on storage.objects;
create policy "galeria_bucket_update_auth"
  on storage.objects
  for update
  to authenticated
  using (bucket_id = 'galeria')
  with check (bucket_id = 'galeria');

-- Delete só para autenticados
drop policy if exists "galeria_bucket_delete_auth" on storage.objects;
create policy "galeria_bucket_delete_auth"
  on storage.objects
  for delete
  to authenticated
  using (bucket_id = 'galeria');

-- ============================================================
-- 5. Trigger para atualizar atualizado_em automaticamente
-- ============================================================
create or replace function public.handle_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.atualizado_em = now();
  return new;
end;
$$;

drop trigger if exists galeria_fotos_updated_at on public.galeria_fotos;
create trigger galeria_fotos_updated_at
  before update on public.galeria_fotos
  for each row
  execute function public.handle_updated_at();

-- ============================================================
-- ✅ Pronto!
-- Agora vá em Authentication → Users → Add user
-- Crie o usuário do Thiago (e-mail + senha)
-- ============================================================
