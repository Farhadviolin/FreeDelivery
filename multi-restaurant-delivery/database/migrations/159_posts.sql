CREATE TABLE posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  content TEXT NOT NULL,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);
CREATE TABLE post_reactions (
  post_id UUID REFERENCES posts(id),
  user_id UUID,
  type TEXT CHECK(type IN ('like','love','helpful')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  PRIMARY KEY(post_id, user_id)
);
CREATE TABLE follows (
  follower_id UUID,
  followee_id UUID,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  PRIMARY KEY(follower_id, followee_id)
);
