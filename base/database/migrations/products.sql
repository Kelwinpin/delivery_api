-- Tabela products
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR NOT NULL,
  amount INT,
  price DOUBLE PRECISION,
  company_id INT REFERENCES company(id) ON DELETE CASCADE,
  active BOOLEAN DEFAULT true
);