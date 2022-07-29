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
  //'SELECT * FROM reviews LIMIT 1'
  console.log('req.query', req.query);
  console.log('Check count:', req.query.count || 5);
  const product_id = req.query.product_id;
  const count = req.query.count || 5;
  const page = req.query.page || 0;
  let resultObj = {
    product: product_id,
    page: page,
    count: count,
    results: [],
  };
  const queryString = 'SELECT reviews.*, (SELECT json_agg(reviews_photos.*) FROM reviews_photos WHERE reviews.review_id = reviews_photos.review_id) as photos FROM reviews WHERE reviews.product_id = ' + product_id;
  // pool.query('SELECT reviews.*, (SELECT json_agg(reviews_photos.*) FROM reviews_photos WHERE reviews.review_id = reviews_photos.review_id) as photos FROM reviews WHERE reviews.product_id = 1')
  // pool.query('SELECT * FROM reviews LEFT JOIN reviews_photos ON reviews.review_id = reviews_photos.review_id WHERE reviews.product_id = 5')
  // pool.query('SELECT * FROM reviews r LEFT JOIN reviews_photos p ON r.review_id = p.review_id WHERE r.product_id = 5')
  pool.query(queryString)
    .then((result) => {
      // console.log('Result from Reviews: ', result.rows);
      let records = result.rows;
      for (let i = 0; i < records.length; i += 1) {
        let container = {
          review_id: records[i].review_id,
          rating: records[i].rating,
          summary: records[i].summary,
          recommend: records[i].recommended,
          response: records[i].response,
          body: records[i].body,
          date: records[i].date,
          review_name: records[i].reviewer_name,
          helpfulness: records[i].helpfulness,
          photos: records[i].photos,
        };
        resultObj.results.push(container);
      }
      // console.log('Final Object:', resultObj);
      res.status(201).send(resultObj);
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
