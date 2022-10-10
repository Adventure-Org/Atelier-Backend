LOAD DATA LOCAL INFILE '/Users/andychow/Hackreactor/Atelier-Backend/data/reviews.csv'
INTO TABLE reviews
FIELDS TERMINATED BY ',' ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;