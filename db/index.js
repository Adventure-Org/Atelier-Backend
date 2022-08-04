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
  host: process.env.HOST,
  database: process.env.DB,
  password: process.env.PW,
  port: process.env.PORT
});

// obtains default 3 if no count provided. Page not yet implemented
const getProducts = (req, res) => {
  const { count, page } = req.query;
  const query = 'SELECT * FROM products LIMIT $1';
  const limit = count || 3;
  const pagenum = page || 1;
  pool
    .query(query, [limit])
    .then((results) => res.status(200).send(results.rows))
    .catch((err) => { res.status(500); console.log(err) })
}

const getProduct = (req, res) => {
  const { product_id } = req.params;
  const query = 'SELECT p.*, (SELECT json_agg(json_build_object("feature", f.feature, "value", f.value))\
                  AS features FROM features f WHERE f.product_id = p.id)\
                  FROM products p\
                  WHERE p.id = $1\
                  GROUP BY p.id';
  pool
    .query(query, [product_id])
    .then((results) => res.status(200).send(results.rows[0]))
    .catch((err) => { res.status(500).send(err); console.log(err) })
};

const getStyles = (req, res) => {
  const { product_id } = req.params;
  const query = 'SELECT s.style_id, s.name, s.original_price, s.sale_price, s."default?",\
                (SELECT json_agg(json_build_object("url", ph.url, "thumbnail_url", ph.thumbnail_url))\
                AS photos FROM photos ph WHERE ph.styleid = s.style_id),\
                (SELECT json_agg(json_build_object("size", sk.size, "quantity", sk.quantity))\
                AS skus FROM skus sk WHERE sk.styleID = s.style_id)\
                FROM styles s\
                WHERE s.productId = $1\
                GROUP BY s.style_id, s.productId';
  pool
    .query(query, [product_id])
    .then((results) => {
      const container = {
        product_id: product_id,
        results: results.rows
      };
      res.status(200).send(container)
    })
    .catch((err) => { res.status(500).send(err); console.log(err) })
}

const getRelated = (req, res) => {
  const { product_id } = req.params;
  // do arrays
  const query = 'SELECT json_agg(r.related_product_id) AS related\
                 FROM related r WHERE current_product_id = $1';
  pool
    .query(query, [product_id])
    .then((results) => {
      res.status(200).send(results.rows[0].related)
    })
    .catch((err) => { res.status(500).send(err); console.log(err) })
}

module.exports.getProducts = getProducts
module.exports.getProduct = getProduct
module.exports.getStyles = getStyles
module.exports.getRelated = getRelated
