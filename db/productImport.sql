--below line connects you to the db
\c productsection;
\COPY products (id,name,slogan,description,category,default_price) FROM '/Users/hunny/Atelier-Backend/data/product.csv' DELIMITER ',' CSV HEADER;
\COPY styles (style_id,productId,name,sale_price,original_price,"default?") FROM '/Users/hunny/Atelier-Backend/data/styles.csv' DELIMITER ',' CSV HEADER;
\COPY features (id,product_id,feature, value) FROM '/Users/hunny/Atelier-Backend/data/features.csv' DELIMITER ',' CSV HEADER;
\COPY related (id,current_product_id,related_product_id) FROM '/Users/hunny/Atelier-Backend/data/related.csv' DELIMITER ',' CSV HEADER;
\COPY skus (sku_id, styleID, size, quantity) FROM '/Users/hunny/Atelier-Backend/data/skus.csv' DELIMITER ',' CSV HEADER;
\COPY photos (id,styleId,url,thumbnail_url) FROM '/Users/hunny/Atelier-Backend/data/photos.csv' DELIMITER ',' CSV HEADER;
-- psql postgres postgres < /Users/hunny/Atelier-Backend/db/productImport.sql;