CREATE TABLE questions (
  product_id INT NOT NULL,
  question_id INT PRIMARY KEY NOT NULL,
  question_body VARCHAR(1000),
  question_date TIMESTAMP NOT NULL,
  asker_name VARCHAR(255) NOT NULL,
  question_helpfulness INT NOT NULL,
  reported BOOLEAN NOT NULL,
);

CREATE TABLE answers (
  answer_id INT PRIMARY KEY NOT NULL,
  body VARCHAR(1000),
  answer_date TIMESTAMP NOT NULL,
  answerer_name VARCHAR(255) NOT NULL,
  helpfulness INT NOT NULL,
  reported BOOLEAN NOT NULL,
  FOREIGN KEY (question_id)
    REFERENCES questions (product_id)
)

CREATE TABLE answer_photos (
  photo_id INT PRIMARY KEY NOT NULL,
  photo_url VARCHAR(1000) NOT NULL,
  FOREIGN KEY (answer_id)
    REFERENCES answers (answer_id)
)