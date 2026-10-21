CREATE TYPE answer_color AS ENUM (
    'lavender',
    'cornflower',
    'mint',
    'peach',
    'coral',
    'sand'
);

CREATE TYPE answer_status AS ENUM (
  'published',
  'hidden',
  'deleted'
);

CREATE TABLE answers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    question_id UUID NOT NULL REFERENCES questions(id),
    user_id UUID NOT NULL REFERENCES users(id),
    answer VARCHAR(200) NOT NULL,
    color answer_color DEFAULT 'cornflower',
    status answer_status NOT NULL DEFAULT 'published',
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    moderation_reason VARCHAR(200),
    moderated_at TIMESTAMPTZ,
    moderated_by UUID REFERENCES users(id),

    UNIQUE (question_id, user_id)
);

CREATE TABLE answer_likes (
    answer_id UUID NOT NULL REFERENCES answers(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    PRIMARY KEY (answer_id, user_id)
);

