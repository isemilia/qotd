CREATE TYPE user_role AS ENUM (
    'user',
    'moderator',
    'admin'
);

CREATE TABLE users (
   id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
   name VARCHAR(12) NOT NULL,
   email VARCHAR(255) NOT NULL UNIQUE,
   password TEXT NOT NULL,
   salt TEXT NOT NULL,
   role user_role NOT NULL DEFAULT 'user',
   terms_and_guidelines_accepted BOOLEAN NOT NULL,
   created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);