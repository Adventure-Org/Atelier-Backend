const {Pool} = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: process.env.user,
  host: '13.57.15.90',
  database: process.env.database,
  password: process.env.password,
  port: 5432
});

module.exports.getProduct = (id, callback) => {
  let queryList = `SELECT * FROM products WHERE id = ${id}`
  pool.query(queryList, (err, productData) => {
    if (err) {
      callback(err);
    } else {
     let results = {
        id: id,
        name: productData.name,
        slogan: productData.slogan,
        description: productData.description,
        category: productData.category,
        default_price: `${productData.default_price}.00`,
        features: []
      };
      let queryList2 = `SELECT * FROM FEATURES WHERE product_id = ${id}`
      pool.query(queryList, (error, featureData) => {
        if (error) {
          callback(error);
        } else {
          featureData.rows.forEach((feature) => {
            results.features.push({ feature: feature.feature, value: feature.value });
          });
        }
        callback(null, results);
      });
    }
  });
};