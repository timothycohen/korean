CREATE TABLE users (
  id varchar PRIMARY KEY,
  identifier_token varchar UNIQUE NOT NULL,
  hashed_password varchar,
  email varchar UNIQUE NOT NULL
);

CREATE TABLE refresh_tokens (
  id int8 PRIMARY KEY generated always AS identity,
  refresh_token varchar UNIQUE NOT NULL,
  user_id varchar NOT NULL,
  CONSTRAINT fk_users FOREIGN KEY(user_id) REFERENCES users(id)
);