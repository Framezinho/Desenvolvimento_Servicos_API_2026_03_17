CREATE DATABASE IF NOT EXISTS loja_25_2;
USE loja_25_2;
CREATE TABLE IF NOT EXISTS produto (
    id    INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nome  VARCHAR(100) NOT NULL,
    preco DOUBLE
);
INSERT INTO produto (nome, preco) VALUES 
    ('Coca-Cola', 9.89),
    ('Pepsi', 7.99),
    ('Trakinas', 3.50);
