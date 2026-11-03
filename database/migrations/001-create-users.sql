CREATE TYPE user_role AS ENUM (
    'user',
    'moderator',
    'admin'
);

CREATE TYPE user_status AS ENUM (
    'active',
    'deleted'
);

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(12) NOT NULL,
    email VARCHAR(255) UNIQUE,
    password TEXT,
    salt TEXT,
    role user_role NOT NULL DEFAULT 'user',
    terms_and_guidelines_accepted BOOLEAN NOT NULL,
    status user_status NOT NULL DEFAULT 'active',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    last_login_at TIMESTAMPTZ
);