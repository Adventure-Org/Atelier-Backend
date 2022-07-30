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
  // console.log('req.query', req.query);
  // console.log('Check count:', req.query.count || 5);
  const product_id = req.query.product_id;
  const count = req.query.count || 5;
  const page = req.query.page || 0;
  let resultObj = {
    product: product_id,
    page: page,
    count: count,
    results: [],
  };
  const queryString = 'SELECT reviews.*, (SELECT json_agg(reviews_photos.*) FROM reviews_photos WHERE reviews.review_id = reviews_photos.review_id) AS photos FROM reviews WHERE reviews.product_id = ' + product_id;
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
  const product_id = req.query.product_id;
  let resultObj = {
    product: product_id,
    ratings: {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
    },
    recommended: {
      true: 0,
      false: 0,
    },
    characteristics: {},
  };
  // const queryString = 'SELECT r.rating, r.recommended FROM reviews r INNER JOIN characteristics_reviews cr on r.review_id = cr.review_id INNER JOIN characteristics c on cr.characteristic_id = c.characteristics_id WHERE r.product_id = '+product_id;
  //'SELECT r.rating, r.recommended FROM reviews r INNER JOIN characteristics_reviews cr on r.review_id = cr.review_id INNER JOIN characteristics c on cr.characteristic_id = c.characteristics_id WHERE r.product_id = '+product_id;
  // const queryString = '(SELECT json_agg(cr.characteristics_reviews_id) FROM characteristics_reviews cr INNER JOIN characteristics c INNER JOIN ON cr.characteristic_id = c.characteristics_id) AS id'

  //Below are good to go
  // const queryString = 'SELECT json_agg(c.name) as characteristics FROM characteristics c WHERE c.product_id = '+product_id;
  // const queryString = 'SELECT r.rating, r.recommended FROM reviews r where r.product_id = '+ product_id;

  const queryFirstString = 'SELECT r.rating, r.recommended, (SELECT json_agg(c.name) as characteristics FROM characteristics c WHERE c.product_id = '+product_id+') FROM reviews r where r.product_id = '+ product_id;
  const querySecondString = 'SELECT cr.characteristic_id, cr.value, c.name FROM characteristics_reviews cr INNER JOIN characteristics c on c.characteristics_id = cr.characteristic_id WHERE c.product_id = '+product_id;

  // const queryString = 'SELECT json_agg(cr) as characteristics FROM characteristics_reviews cr LEFT JOIN characteristics c on c.characteristics_id = cr.characteristic_id WHERE c.product_id = '+product_id;
  pool.query(queryFirstString)
    .then((result) => {
      // console.log('Result in getMetadata:', result.rows);
      let trueCount = 0;
      let falseCount = 0;
      for (let i = 0; i < result.rows.length; i += 1) {
        resultObj.ratings[result.rows[i].rating] += 1;
        resultObj.recommended[result.rows[i].recommended] += 1;
      }
      // console.log(resultObj);
      return pool.query(querySecondString);
    })
    .then((result) => {
      // console.log('Second Query:', result.rows);
      let uniqueCount = 0;
      let totalCount = 0;
      for (let i = 0; i < result.rows.length; i += 1) {
        if(resultObj.characteristics[result.rows[i].name] === undefined) {
          resultObj.characteristics[result.rows[i].name] = {
            id: result.rows[i].characteristic_id,
            value: result.rows[i].value,
          };
          // Keep track of how many different characteristics
          uniqueCount += 1;
          totalCount += 1;
        } else {
          resultObj.characteristics[result.rows[i].name].value += result.rows[i].value;
          // Keep track of how many ratings we added
          totalCount += 1;
        }
      }
      totalCount /= uniqueCount;
      for (var key in resultObj.characteristics) {
        // Calculate the average rating - assuming each characteristic has same amount of ratings
        resultObj.characteristics[key].value /= totalCount;
      }
      // console.log('Second result obj:', resultObj);
      res.status(201).send(resultObj);
    })
    .catch((err) => {
      console.log('Error in getMetadata:', err);
    })
}
