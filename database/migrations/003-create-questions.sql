CREATE TABLE questions (
   id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
   question TEXT NOT NULL,
   date DATE NOT NULL UNIQUE, -- UTC (+00:00) calendar date
   created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- to determine today's question:
-- WHERE date = (NOW() AT TIME ZONE 'UTC')::date