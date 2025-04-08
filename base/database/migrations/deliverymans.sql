-- 1. Criar a tabela de entregadores
CREATE TABLE deliverymans (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    cpf VARCHAR(14) UNIQUE NOT NULL,
    image TEXT
);

-- 2. Adicionar colunas na tabela de pedidos
ALTER TABLE orders
ADD COLUMN deliveryman_id INTEGER,
ADD COLUMN fee DECIMAL(10, 2);

-- 3. Adicionar chave estrangeira para garantir integridade referencial
ALTER TABLE orders
ADD CONSTRAINT fk_orders_deliveryman
FOREIGN KEY (deliveryman_id)
REFERENCES deliverymans(id)
ON DELETE SET NULL;