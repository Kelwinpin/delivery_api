-- Tabela user
CREATE TABLE "user" (
  id SERIAL PRIMARY KEY,
  name VARCHAR NOT NULL,
  cpf VARCHAR,
  address VARCHAR,
  image VARCHAR,
  company_id INT REFERENCES company(id) ON DELETE SET NULL,
  password VARCHAR
);