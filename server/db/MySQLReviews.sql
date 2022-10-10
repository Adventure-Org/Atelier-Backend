DROP DATABASE IF EXISTS reviewsdb;
CREATE DATABASE reviewsdb;

USE reviewsdb;

DROP TABLE IF EXISTS reviews;
CREATE TABLE reviews (
  review_id INT NOT NULL AUTO_INCREMENT,
  product_id INT NOT NULL,
  rating INT NOT NULL,
  date DATETIME NOT NULL,
  summary VARCHAR(1000),
  body VARCHAR(1000),
  recommend boolean,
  reported boolean,
  reviewer_name VARCHAR(50),
  reviewer_email VARCHAR(50),
  response VARCHAR(1000),
  helpfulness INT NOT NULL,
  PRIMARY KEY (review_id)
);