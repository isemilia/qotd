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

-- reset suggestion back to pending if associated question is deleted
CREATE OR REPLACE FUNCTION reset_suggestion_on_question_delete()
RETURNS TRIGGER AS $$
BEGIN
UPDATE question_suggestions
SET question_id = NULL,
    status = 'pending',
    reason = NULL
WHERE question_id = OLD.id;

RETURN OLD;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS question_deleted_reset_suggestions
ON questions;

CREATE TRIGGER question_deleted_reset_suggestions
    BEFORE DELETE ON questions
    FOR EACH ROW
    EXECUTE FUNCTION reset_suggestion_on_question_delete();