CREATE TABLE "dashboard" (
  id SERIAL PRIMARY KEY,
  login VARCHAR NOT NULL,
  company_id INT REFERENCES companies(id) ON DELETE SET NULL,
  password VARCHAR
);