const { Pool, Client} = require('pg');

const pool = new Pool({
  user: 'andychow',
  host: 'localhost',
  database: 'reviewsdb',
  password: '',
  port: 5432,
});

exports.getReviews = (req, res) => {
  // console.log('Req:', req);
  pool.query('SELECT * FROM reviews LIMIT 1')
    .then((result) => {
      console.log('Result from Reviews: ', result.rows);
    })
    .then(() => {
      return pool.query('SELECT * FROM reviews_photos LIMIT 1')
    })
    .then((result) => {
      console.log('Result from reviews_photos: ', result.rows);
    })
    .then(() => {
      return pool.query('SELECT * FROM characteristics LIMIT 1')
    })
    .then((result) => {
      console.log('Result from characteristics: ', result.rows);
    })
    .then(() => {
      return pool.query('SELECT * FROM characteristics_reviews LIMIT 1')
    })
    .then((result) => {
      console.log('Result from characteristics_reviews: ', result.rows);
    })
    .catch((err) => {
      console.log('Error in getReviews:', err);
    })
};

exports.getMetadata = (req, res) => {
  // pool.query('SELECT * FROM reviews_photos LIMIT 5')
  //   .then((result) => {
  //     console.log('Result in getReviewsPhotos:', result.rows);
  //   })
  //   .catch((err) => {
  //     console.log('Error in getReviewsPhotos:', err);
  //   })
}
