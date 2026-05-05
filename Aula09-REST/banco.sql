-- Construção do canco até a Aula09
CREATE DATABASE loja_25_2;
USE loja_25_2;
CREATE TABLE produto (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT ,
    nome VARCHAR(100) NOT NULL ,
    preco DOUBLE 
);
INSERT INTO produto (nome, preco ) VALUES 
( "Coca-Cola" , 9.89 ) , 
( "Pepsi" , 7.99 ) , 
( "Trakinas" , 3.50 ) ;


-- --------------------------------------- --
-- Alterações no banco a partir da Aula09  --
-- --------------------------------------- --
CREATE TABLE categoria (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT ,
    nome VARCHAR(100) NOT NULL
);

ALTER TABLE produto ADD COLUMN codCategoria INT;

ALTER TABLE produto ADD CONSTRAINT 
FOREIGN KEY (codCategoria) REFERENCES categoria (id);

-- Como no meu banco de dados, os produtos que foram cadastrados como
-- bebidas são apenas os produtos 1 e 2, os demais são alimentos,
-- a atualização da categoria de cada produto ficou assim:
INSERT INTO categoria (nome) VALUES ( "Bebidas" ) , ( "Alimentos" ) ;

UPDATE produto SET codCategoria = 1 WHERE id <= 2;
UPDATE produto SET codCategoria = 2 WHERE id > 2;