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

DROP TABLE IF EXISTS styles CASCADE;
CREATE TABLE styles (
  id INT NOT NULL PRIMARY KEY,
  productId INT NOT NULL,
  name VARCHAR(500) NOT NULL,
  sale_price VARCHAR(20),
  original_price VARCHAR(20) DEFAULT NULL,
  default_style BOOLEAN NOT NULL,
  FOREIGN KEY (productId) REFERENCES products(id)
);

DROP TABLE IF EXISTS photos CASCADE;
CREATE TABLE photos (
id INT NOT NULL PRIMARY KEY,
styleId INT NOT NULL,
url TEXT,
thumbnail_url TEXT,
FOREIGN KEY (styleId) REFERENCES styles(id)
);

DROP TABLE IF EXISTS skus CASCADE;
CREATE TABLE skus (
  sku_id INT NOT NULL PRIMARY KEY,
  styleID INT NOT NULL,
  size VARCHAR(255) NOT NULL,
  quantity INT DEFAULT NULL,
  FOREIGN KEY (styleID) REFERENCES styles(id)
);

DROP TABLE IF EXISTS related CASCADE;
CREATE TABLE related (
  id INT NOT NULL PRIMARY KEY,
  current_product_id INT NOT NULL,
  related_product_id INT NOT NULL,
  FOREIGN KEY (current_product_id) REFERENCES products(id)
);

DROP TABLE IF EXISTS features CASCADE;
CREATE TABLE features (
  id INT NOT NULL PRIMARY KEY,
  product_id INT NOT NULL,
  feature VARCHAR(1000) NOT NULL,
  value VARCHAR(1000) NOT NULL,
  FOREIGN KEY (product_id) REFERENCES products(id)
);
-- psql -U postgres < /Users/hunny/Atelier-Backend/db/productSchema.sql
