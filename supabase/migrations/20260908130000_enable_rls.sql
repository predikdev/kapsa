-- RLS zapnuté na všech tabulkách ve schématu public bez policy: anon a
-- authenticated role nemají žádný přístup, appka zatím čte přes
-- service_role klíč (viz src/lib/supabase/admin.ts), který RLS obchází.
alter table categories enable row level security;
alter table projects enable row level security;
alter table transactions enable row level security;
alter table rules enable row level security;
