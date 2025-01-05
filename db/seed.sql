create table public.locations (
  id bigint generated always as identity primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  name text,
  url text
);

comment on table public.locations is 'List of Parkrun locations';
comment on column public.locations.name is 'Parkrun location name';
comment on column public.locations.url is 'Website url of Parkrun location';

insert into public.locations (name, url) values
  ('Chalkwell Beach', 'https://www.parkrun.org.uk/chalkwellbeach/'),
  ('Southend', 'https://www.parkrun.org.uk/southend/');


alter table public.locations enable row level security;

create policy "Locations are viewable by everyone." on public.locations
  for select using (true);

create policy "Users cannot insert new locations." on public.locations
  for insert with check (false);

create policy "Users cannot update locations." on public.locations
  for update using (false);

create policy "Users cannot delete locations." on public.locations
  for delete using (false);

-- Create a table for public profiles
create table public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  updated_at timestamp with time zone,
  default_location_id bigint references public.locations,
  full_name text,
  personal_best time
);
-- Set up Row Level Security (RLS)
-- See https://supabase.com/docs/guides/auth/row-level-security for more details.
alter table public.profiles
  enable row level security;

create policy "Users can view their own profile." on public.profiles
  for select using ((select auth.uid()) = id);

create policy "Users can insert their own profile." on public.profiles
  for insert with check ((select auth.uid()) = id);

create policy "Users can update own profile." on public.profiles
  for update using ((select auth.uid()) = id);

create policy "Users can delete own profile." on public.profiles
  for update using ((select auth.uid()) = id);

-- This trigger automatically creates a profile entry when a new user signs up via Supabase Auth.
-- See https://supabase.com/docs/guides/auth/managing-user-data#using-triggers for more details.
create function public.handle_new_user()
returns trigger
set search_path = ''
as $$
begin
  insert into public.profiles (id, updated_at, full_name)
  values (
    new.id,
    timezone('utc'::text, now()),
    new.raw_user_meta_data->>'full_name'
    );
  return new;
end;
$$ language plpgsql security definer;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();


create table public.volunteer_nodes (
  id bigint generated always as identity primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  user_id uuid references public.profiles on delete cascade not null,
  date date,
  finish_time numeric,
  location_id bigint references public.locations on delete cascade not null,

  constraint finish_time check (finish_time > 17::numeric AND finish_time < 41::numeric)
);

comment on table public.volunteer_nodes is 'List of declarations to volunteer';
comment on column public.volunteer_nodes.date is 'date the volunteer has declared for';
comment on column public.volunteer_nodes.finish_time is 'One of the target times for volunteers';

alter table public.volunteer_nodes enable row level security;
alter table public.volunteer_nodes replica identity full;

create policy "Public volunteer nodes are viewable by everyone." on public.volunteer_nodes
  for select using (true);

create policy "Users can insert their own volunteer nodes." on public.volunteer_nodes
  for insert with check ((select auth.uid()) = user_id);

create policy "Users can update own volunteer nodes." on public.volunteer_nodes
  for update using ((select auth.uid()) = user_id);

create policy "Users can delete own volunteer nodes." on public.volunteer_nodes
  for delete using ((select auth.uid()) = user_id);

/**
 * REALTIME SUBSCRIPTIONS
 * Only allow realtime listening on public tables.
 */

begin;
  -- remove the realtime publication
  drop publication if exists supabase_realtime;

  -- re-create the publication but don't enable it for any tables
  create publication supabase_realtime;
commit;

-- add tables to the publication
alter publication supabase_realtime add table public.volunteer_nodes;
