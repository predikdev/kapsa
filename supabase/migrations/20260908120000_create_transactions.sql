-- KATEGORIE
create table categories (
  id   bigint generated always as identity primary key,
  name text not null unique
);

-- PROJEKTY
create table projects (
  id   bigint generated always as identity primary key,
  name text not null unique
);

-- TRANSAKCE
create table transactions (
  id                    bigint generated always as identity primary key,
  date                  date not null,
  amount                numeric(12,2) not null,
  currency              text not null default 'CZK',
  counterparty          text,
  description           text,
  variable_symbol       text,
  category_id           bigint references categories(id) on delete set null,
  project_id            bigint references projects(id)   on delete set null,
  is_internal_transfer  boolean not null default false,
  source_bank           text not null,
  source_hash           text not null unique,
  created_at            timestamptz not null default now()
);

-- PRAVIDLA PRO KATEGORIZACI
create table rules (
  id          bigint generated always as identity primary key,
  pattern     text not null,
  category_id bigint references categories(id) on delete cascade,
  project_id  bigint references projects(id)   on delete set null,
  created_at  timestamptz not null default now()
);

-- INDEXY
create index on transactions (date desc);
create index on transactions (project_id);
create index on transactions (category_id);
