\c productsection;
CREATE INDEX IX_productId ON styles(productId);
CREATE INDEX IX_styleId ON photos(styleId);
CREATE INDEX IX_styleIDs ON skus(styleID);
CREATE INDEX IX_current_product_id ON related(current_product_id);
CREATE INDEX IX_product_id ON features(product_id);
-- psql -U postgres < /Users/hunny/Atelier-Backend/db/optimizer.sql;
