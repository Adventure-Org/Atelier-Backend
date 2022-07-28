DROP DATABASE IF EXISTS QASection;
CREATE DATABASE QASection;

\c qasection;

DROP TABLE IF EXISTS questions CASCADE;
CREATE TABLE questions (
  product_id INT NOT NULL,
  id INT PRIMARY KEY NOT NULL,
  body VARCHAR(1000),
  date_written VARCHAR(50) NOT NULL,
  asker_name VARCHAR(255) NOT NULL,
  asker_email VARCHAR(255) NOT NULL,
  helpful INT NOT NULL,
  reported BOOLEAN NOT NULL
);

DROP TABLE IF EXISTS answers CASCADE;
CREATE TABLE answers (
  id INT PRIMARY KEY NOT NULL,
  body VARCHAR(1000) NOT NULL,
  date_written VARCHAR(50) NOT NULL,
  answerer_name VARCHAR(255) NOT NULL,
  answerer_email VARCHAR(255) NOT NULL,
  helpful INT NOT NULL,
  reported BOOLEAN NOT NULL,
  question_id INT NOT NULL,
  FOREIGN KEY (question_id)
    REFERENCES questions(id)
);

DROP TABLE IF EXISTS answer_photos;
CREATE TABLE answer_photos (
  id INT PRIMARY KEY NOT NULL,
  "url" VARCHAR(1000) NOT NULL,
  answer_id INT NOT NULL,
  FOREIGN KEY (answer_id)
    REFERENCES answers(id)
);


\COPY questions(id , product_id, body, date_written, asker_name, asker_email, reported, helpful) FROM '/Users/roycechun/Desktop/RFP2205/Atelier-Backend/data/questions.csv' CSV HEADER;

\COPY answers(id, question_id, body, date_written, answerer_name, answerer_email, reported, helpful) FROM '/Users/roycechun/Desktop/RFP2205/Atelier-Backend/data/answers.csv' CSV HEADER;

\COPY answer_photos(id, answer_id, url) FROM '/Users/roycechun/Desktop/RFP2205/Atelier-Backend/data/answers_photos.csv' CSV HEADER;