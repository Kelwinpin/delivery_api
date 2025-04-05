-- Tabela order
CREATE TABLE "order" (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES "user"(id) ON DELETE SET NULL,
  created_at DATE,
  delivery_at DATE
);