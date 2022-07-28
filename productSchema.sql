DROP DATABASE IF EXISTS productSection;
CREATE DATABASE productSection;
\c [productsection];
-- Create database prior to running code below

DROP TABLE IF EXISTS products CASCADE;
CREATE TABLE products (
  id int NOT NULL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  slogan VARCHAR(255) NOT NULL,
  description VARCHAR(1000) NOT NULL,
  category VARCHAR(255) NOT NULL,
  default_price int NOT NULL
  );

DROP TABLE IF EXISTS styles;
CREATE TABLE styles (
  id int NOT NULL PRIMARY KEY,
  productId int NOT NULL,
  name VARCHAR(500) NOT NULL,
  sale_price VARCHAR(20),
  original_price VARCHAR(20) NOT NULL,
  default_style BOOLEAN NOT NULL,
  main_id int,
  FOREIGN KEY (main_id) REFERENCES products(id)
);

DROP TABLE IF EXISTS photos;
CREATE TABLE photos (
id int NOT NULL PRIMARY KEY,
styleId int NOT NULL,
url TEXT,
thumbnail_url TEXT,
main_id int,
FOREIGN KEY (main_id) REFERENCES products(id)
);

DROP TABLE IF EXISTS skus;
CREATE TABLE skus (
  sku_id int NOT NULL PRIMARY KEY,
  styleID int NOT NULL,
  size VARCHAR(255) NOT NULL,
  quantity int NOT NULL,
  main_id int,
  FOREIGN KEY (main_id) REFERENCES products(id)
);

DROP TABLE IF EXISTS related;
CREATE TABLE related (
  id int NOT NULL PRIMARY KEY,
  current_product_id int NOT NULL,
  related_product_id int NOT NULL,
  main_id int,
  FOREIGN KEY (main_id) REFERENCES products(id)
);

DROP TABLE IF EXISTS features;
CREATE TABLE features (
  id int NOT NULL PRIMARY KEY,
  product_id int,
  feature VARCHAR(1000) NOT NULL,
  value VARCHAR(1000) NOT NULL,
  main_id int,
  FOREIGN KEY (main_id) REFERENCES products(id)
);


/*  Execute this file from the command line by typing:
Code doesn't actually create anything at the moment - potential permissions issue
 *    psql -U postgres < /Users/hunny/Atelier-Backend/productSchema.sql
 *  to create the database and the tables.*/