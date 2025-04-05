-- Tabela company
CREATE TABLE company (
  id SERIAL PRIMARY KEY,
  name VARCHAR NOT NULL,
  cnpj VARCHAR,
  logo VARCHAR,
  active BOOLEAN DEFAULT true,
  created_at VARCHAR
);
