CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE thoughts (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT,
  description TEXT,
  created_at TIMESTAMP default current_timestamp,
);
