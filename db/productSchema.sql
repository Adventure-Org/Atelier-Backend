DROP DATABASE IF EXISTS productSection;
CREATE DATABASE productSection;
\c productsection;

DROP TABLE IF EXISTS products CASCADE;
CREATE TABLE products (
  id INT NOT NULL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  slogan VARCHAR(255) NOT NULL,
  description VARCHAR(1000) NOT NULL,
  category VARCHAR(255) NOT NULL,
  default_price INT NOT NULL
  );

DROP TABLE IF EXISTS styles;
CREATE TABLE styles (
  id INT NOT NULL PRIMARY KEY,
  productId INT NOT NULL,
  name VARCHAR(500) NOT NULL,
  sale_price VARCHAR(20),
  original_price VARCHAR(20) NOT NULL,
  default_style BOOLEAN NOT NULL,
  main_id INT REFERENCES products(id)
);

DROP TABLE IF EXISTS photos;
CREATE TABLE photos (
id INT NOT NULL PRIMARY KEY,
styleId INT NOT NULL,
url TEXT,
thumbnail_url TEXT,
main_id INT REFERENCES products(id)
);

DROP TABLE IF EXISTS skus;
CREATE TABLE skus (
  sku_id INT NOT NULL PRIMARY KEY,
  styleID INT NOT NULL,
  size VARCHAR(255) NOT NULL,
  quantity INT NOT NULL,
  main_id INT REFERENCES products(id)
);

DROP TABLE IF EXISTS related;
CREATE TABLE related (
  id INT NOT NULL PRIMARY KEY,
  current_product_id INT NOT NULL,
  related_product_id INT NOT NULL,
  main_id INT REFERENCES products(id)
);

DROP TABLE IF EXISTS features;
CREATE TABLE features (
  id INT NOT NULL PRIMARY KEY,
  product_id INT,
  feature VARCHAR(1000) NOT NULL,
  value VARCHAR(1000) NOT NULL,
  main_id INT REFERENCES products(id)
);
-- psql -U postgres < /Users/hunny/Atelier-Backend/db/productSchema.sql
