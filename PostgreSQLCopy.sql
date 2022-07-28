\COPY reviews FROM '/Users/andychow/Hackreactor/Atelier-Backend/data/reviews.csv' DELIMITER ',' CSV HEADER;

\COPY reviews_photos FROM '/Users/andychow/Hackreactor/Atelier-Backend/data/reviews_photos.csv' DELIMITER ',' CSV HEADER;

\COPY characteristics FROM '/Users/andychow/Hackreactor/Atelier-Backend/data/characteristics.csv' DELIMITER ',' CSV HEADER;

\COPY characteristics_reviews FROM '/Users/andychow/Hackreactor/Atelier-Backend/data/characteristic_reviews.csv' DELIMITER ',' CSV HEADER;

--psql postgres postgres

--psql -U postgres < /directory

--psql -U postgres < /Users/andychow/Hackreactor/Atelier-Backend/PostgreSQLReviews.sql

--psql postgres < /Users/andychow/Hackreactor/Atelier-Backend/PostgreSQLCopy.sql