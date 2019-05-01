/* If database already exisits, remove it */
DROP DATABASE IF EXISTS bamazon;

/* create database */
CREATE DATABASE bamazon;

/* Select database to use */
USE bamazon;

/* Create table */
CREATE TABLE products (
  item_id INTEGER(20) AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(100) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  stock_quantity INTEGER(20),
  PRIMARY KEY(item_id)
);

/* Seed table */
INSERT INTO products  
  (product_name, department_name, price, stock_quantity)
VALUES
  ("Redbull 4 pack", "Grocery", 9.99, 100 ),
  ("Redbull", "Grocery", 2.99, 1000),
  ("Cliff Bar - Chocolate Chip", "Grocery", 8.99, 50),
  ("Intel i7 8086k Processor", "Electronics", 359.99, 12),
  ("Nvida RTX 2080ti", "Electronics", 1199.99, 6),
  ("Apple Macbook Pro 13inch", "Electronics", 1399.99, 23),
  ("Bounty Paper Towels", "Household", 19.99, 500),
  ("Red Solo Cups", "Household", 7.99, 397);

/* Select all products from the database */
SELECT * FROM products;