/* eslint-disable no-multi-str */
/* eslint-disable object-shorthand */
/* eslint-disable camelcase */
/* eslint-disable arrow-body-style */
/* eslint-disable semi */
/* eslint-disable comma-dangle */
/* eslint-disable no-console */
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: 'postgres',
  host: '127.0.0.1',
  database: 'productsection',
  password: '1234',
  port: 5432
});

// obtains default 3 if no count provided. Count currently not working
const getProducts = (req, res) => {
  const { count } = req.query;
  const query = 'SELECT * FROM products LIMIT $1';
  const limit = count || 3;
  console.log(limit)
  pool
    .query(query, [limit])
    .then((results) => res.status(200).send(results.rows))
    .catch((err) => { res.status(500); console.log(err) })
}

// optimization - figure out way to not duplicate table info and create features array from query
const getProduct = (req, res) => {
  const { product_id } = req.params;
  const query = 'SELECT * FROM products LEFT OUTER JOIN features ON products.id = $1 WHERE features.product_id = $1';
  let container;
  const features = [];
  pool
    .query(query, [product_id])
    .then((results) => {
      results.rows.forEach((feature) => features.push(
        { feature: feature.feature, value: feature.value }
      ));
      container = {
        id: results.rows[0].id,
        name: results.rows[0].name,
        slogan: results.rows[0].slogan,
        description: results.rows[0].description,
        category: results.rows[0].category,
        default_price: `${results.rows[0].default_price}.00`,
        features: features
      };
    })
    .then(() => res.status(200).send(container))
    .catch((err) => { res.status(500).send(err); console.log(err) })
};

// add photos and sku with a join - issue joining 3 tables
const getStyles = (req, res) => {
  const { product_id } = req.params;
  const query = 'SELECT * FROM styles\
                  LEFT OUTER JOIN photos ON styles.id = photos.styleId\
                  LEFT OUTER JOIN skus ON styles.id = skus.styleID\
                  WHERE styles.id = $1';
  let container;
  const photos = [];
  const sku = [];
  pool
    .query(query, [product_id])
    .then((results) => {
      results.rows.forEach((row) => {
        photos.push(
          { thumbnail_url: row.thumbnail_url, url: row.url }
        );
        sku.push({ [row.sku_id]: { quantity: row.quantity, size: row.size } });
      });
      container = {
        style_id: results.rows[0].id,
        name: results.rows[0].name,
        original_price: results.rows[0].original_price,
        sale_price: results.rows[0].sale_price,
        'default?': results.rows[0].default_style,
        photos: photos,
        sku: sku
      };
    })

    .then(() => res.status(200).send(container))
    .catch((err) => { res.status(500).send(err); console.log(err) })
}

const getRelated = (req, res) => {
  const { product_id } = req.params;
  const query = 'SELECT * FROM related WHERE current_product_id = $1';
  const relatedProducts = [];
  pool
    .query(query, [product_id])
    .then((results) => {
      results.rows.forEach((related) => relatedProducts.push(related.related_product_id));
      res.status(200).send(relatedProducts)
    })
    .catch((err) => { res.status(500).send(err); console.log(err) })
}

module.exports.getProducts = getProducts
module.exports.getProduct = getProduct
module.exports.getStyles = getStyles
module.exports.getRelated = getRelated
