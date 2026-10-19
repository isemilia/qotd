CREATE TYPE question_suggestion_status AS ENUM (
  'pending',
  'approved',
  'rejected'
);

CREATE TABLE question_suggestions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id),
  question_id UUID UNIQUE REFERENCES questions(id),
  credit_name VARCHAR(50),
  question VARCHAR(200) NOT NULL,
  status question_suggestion_status NOT NULL DEFAULT 'pending',
  reason VARCHAR(200),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);