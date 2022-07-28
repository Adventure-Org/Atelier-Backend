\COPY questions(id , product_id, body, date_written, asker_name, asker_email, reported, helpful) FROM '/Users/roycechun/Desktop/RFP2205/Atelier-Backend/data/questions.csv' CSV HEADER;

\COPY answers(id, question_id, body, date_written, answerer_name, answerer_email, reported, helpful) FROM '/Users/roycechun/Desktop/RFP2205/Atelier-Backend/data/answers.csv' CSV HEADER;

\COPY answer_photos(id, answer_id, url) FROM '/Users/roycechun/Desktop/RFP2205/Atelier-Backend/data/answers_photos.csv' CSV HEADER;