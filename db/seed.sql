create table locations (
  id bigint generated always as identity primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  name text,
  url text
);

comment on table locations is 'List of Parkrun locations';
comment on column locations.name is 'Parkrun location name';
comment on column locations.url is 'Website url of Parkrun location';

insert into locations (name, url) values
  ('Chalkwell Beach', 'https://www.parkrun.org.uk/chalkwellbeach/'),
  ('Southend', 'https://www.parkrun.org.uk/southend/');


alter table locations enable row level security;

create policy "Locations are viewable by everyone." on locations
  for select using (true);

create policy "Users cannot insert new locations." on locations
  for insert with check (false);

create policy "Users cannot update locations." on locations
  for update using (false);

create policy "Users cannot delete locations." on locations
  for delete using (false);

-- Create a table for public profiles
create table profiles (
  id uuid references auth.users on delete cascade not null primary key,
  updated_at timestamp with time zone,
  username text unique,
  email text,
  full_name text,

  constraint username_length check (char_length(username) >= 3)
);
-- Set up Row Level Security (RLS)
-- See https://supabase.com/docs/guides/auth/row-level-security for more details.
alter table profiles
  enable row level security;

create policy "Users can view their own profile." on profiles
  for select using ((select auth.uid()) = id);

create policy "Users can insert their own profile." on profiles
  for insert with check ((select auth.uid()) = id);

create policy "Users can update own profile." on profiles
  for update using ((select auth.uid()) = id);

create policy "Users can delete own profile." on profiles
  for update using ((select auth.uid()) = id);

-- This trigger automatically creates a profile entry when a new user signs up via Supabase Auth.
-- See https://supabase.com/docs/guides/auth/managing-user-data#using-triggers for more details.
create function public.handle_new_user()
returns trigger
set search_path = ''
as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, new.raw_user_meta_data->>'full_name');
  return new;
end;
$$ language plpgsql security definer;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();


create table volunteer_nodes (
  id bigint generated always as identity primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  user_id uuid references profiles on delete cascade not null,
  date date,
  finish_time numeric,
  location_id bigint references locations on delete cascade not null,

  constraint finish_time check (finish_time > 17::numeric AND finish_time < 41::numeric)
);

comment on table volunteer_nodes is 'List of declarations to volunteer';
comment on column volunteer_nodes.date is 'date the volunteer has declared for';
comment on column volunteer_nodes.finish_time is 'One of the target times for volunteers';

alter table volunteer_nodes enable row level security;

create policy "Public volunteer nodes are viewable by everyone." on volunteer_nodes
  for select using (true);

create policy "Users can insert their own volunteer nodes." on volunteer_nodes
  for insert with check ((select auth.uid()) = user_id);

create policy "Users can update own volunteer nodes." on volunteer_nodes
  for update using ((select auth.uid()) = user_id);

create policy "Users can delete own volunteer nodes." on volunteer_nodes
  for delete using ((select auth.uid()) = user_id);
