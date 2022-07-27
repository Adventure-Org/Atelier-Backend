COPY features FROM './data/features.csv' DELIMITER ',' CSV HEADER;
COPY products FROM './data/product.csv' DELIMITER ',' CSV HEADER;
COPY related FROM './data/related.csv' DELIMITER ',' CSV HEADER;
COPY skus FROM './data/skus.csv' DELIMITER ',' CSV HEADER;
COPY styles FROM './data/styles.csv' DELIMITER ',' CSV HEADER;