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
  // const queryString = 'SELECT reviews.*, (SELECT json_agg(reviews_photos.*) FROM reviews_photos WHERE reviews.review_id = reviews_photos.review_id) AS photos FROM reviews WHERE reviews.product_id = ' + product_id;

  const queryString = `SELECT r.review_id, r. rating, r.summary, r.recommended, r.response, r.body, r.date, r.reviewer_name, r.helpfulness, (SELECT COALESCE(json_agg(reviews_photos.*), '[]') FROM reviews_photos WHERE r.review_id = reviews_photos.review_id) AS photos FROM reviews r WHERE r.product_id = ` + product_id;
  pool.query(queryString)
    .then((result) => {
      // console.log('Final Object:', resultObj);
      resultObj.results = result.rows;
      res.status(201).send(resultObj);
    })
    .catch((err) => {
      console.log('Error in getReviews:', err);
      res.status(400).send(err);
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
      res.status(400).send(err);
    })
};

exports.addReview = (req, res) => {
  const record = req.body;
  const queryString = "INSERT INTO reviews VALUES ((SELECT nextval(pg_get_serial_sequence('reviews', 'review_id'))), $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)"
  pool.query(queryString, [record.product_id, record.rating, new Date(Date.now()), record.summary, record.body, record.recommend, false, record.name, record.email, null, 0])
    .then((result) => {
      res.status(201).send(result);
    })
    .catch((err) => {
      console.log('Error in addReview: ', err);
      res.status(400).send(err);
    })
  // console.log(req.body);
}