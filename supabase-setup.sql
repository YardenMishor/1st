-- Run once in the Supabase SQL editor. Never put a service-role key in the app.
create table if not exists public.board_state (
  user_id uuid primary key references auth.users(id) on delete cascade,
  tasks jsonb not null default '[]'::jsonb,
  done_count integer not null default 0,
  updated_at timestamptz not null default now()
);
alter table public.board_state enable row level security;
revoke all on public.board_state from anon;
grant select, insert, update, delete on public.board_state to authenticated;
create policy "Read own board" on public.board_state for select to authenticated using ((select auth.uid()) = user_id);
create policy "Insert own board" on public.board_state for insert to authenticated with check ((select auth.uid()) = user_id);
create policy "Update own board" on public.board_state for update to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
create policy "Delete own board" on public.board_state for delete to authenticated using ((select auth.uid()) = user_id);
