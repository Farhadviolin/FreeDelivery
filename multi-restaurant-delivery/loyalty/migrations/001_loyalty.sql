CREATE TABLE loyalty_points (
  user_id UUID PRIMARY KEY,
  points INTEGER NOT NULL DEFAULT 0,
  tier TEXT NOT NULL DEFAULT 'Bronze'
);
CREATE TABLE feed_posts (
  id TEXT PRIMARY KEY,
  type TEXT,
  content JSONB,
  created_at TIMESTAMPTZ DEFAULT now()
);
