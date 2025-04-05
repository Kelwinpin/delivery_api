-- Tabela order_item
CREATE TABLE order_item (
  id SERIAL PRIMARY KEY,
  order_id INT REFERENCES "order"(id) ON DELETE CASCADE,
  product_id INT REFERENCES products(id) ON DELETE SET NULL,
  amount INT,
  observation VARCHAR,
  price DOUBLE PRECISION,
  company_id INT REFERENCES company(id) ON DELETE SET NULL
);
