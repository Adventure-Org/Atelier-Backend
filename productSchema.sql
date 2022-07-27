DROP DATABASE IF EXISTS productSection;
CREATE DATABASE productSection;

DROP TABLE IF EXISTS products CASCADE;
CREATE TABLE products (
  id int NOT NULL PRIMARY KEY,
  product_name VARCHAR(255),
  slogan VARCHAR(255),
  product_description VARCHAR(255),
  category VARCHAR(255),
  default_price int,
  created_at DATE DEFAULT NULL,
  updated_at DATE DEFAULT NULL
  -- below to be optimized
  -- features text[]
  );

DROP TABLE IF EXISTS styles;
CREATE TABLE styles (
  style_id int NOT NULL PRIMARY KEY,
  color VARCHAR(255),
  style_name VARCHAR(500),
  original_price VARCHAR(20),
  sale_price VARCHAR(20),
  default_style BOOLEAN,
  id int,
  FOREIGN KEY (id) REFERENCES products(id),
  -- below to be optimized
  skus text[],
  photos text[]
);

DROP TABLE IF EXISTS skus;
CREATE TABLE skus (

)

DROP TABLE IF EXISTS related;
CREATE TABLE related (
  product_id int NOT NULL PRIMARY KEY,
  related integer[],
  id int,
  FOREIGN KEY (id) REFERENCES products(id)
);

DROP TABLE IF EXISTS features;
CREATE TABLE features (
  product_id int NOT NULL PRIMARY KEY,
  feature_feature VARCHAR(255),
  feature_value VARCHAR(255),
  id int,
  FOREIGN KEY (id) REFERENCES products(id)
);

//run command to connect to database

/*  Execute this file from the command line by typing:
Code doesn't actually create anything at the moment - potential permissions issue
 *    psql -U postgres < /Users/hunny/Atelier-Backend/productSchema.sql
  *   psql postgres -h 127.0.0.1 -d qa -f/Users/hunny/Atelier-Backend/productSchema.sql
 *  to create the database and the tables.*/