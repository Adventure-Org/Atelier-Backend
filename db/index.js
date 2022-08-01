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
  const query = "SELECT p.*, (SELECT json_agg(json_build_object('feature', f.feature, 'value', f.value))\
                  AS features FROM features f WHERE f.product_id = p.id)\
                  FROM products p\
                  WHERE p.id = $1\
                  GROUP BY p.id";
  pool
    .query(query, [product_id])
    .then((results) => res.status(200).send(results.rows[0]))
    .catch((err) => { res.status(500).send(err); console.log(err) })
};

const getStyles = (req, res) => {
  const { product_id } = req.params;
  const query = "SELECT s.*,\
                (SELECT json_agg(json_build_object('url', p.url, 'thumbnail_url', p.thumbnail_url))\
                AS photos FROM photos p WHERE p.styleid = s.id),\
                (SELECT json_agg(json_build_object('size', sk.size, 'quantity', sk.quantity))\
                AS skus FROM skus sk WHERE sk.styleID = s.id)\
                FROM styles s\
                WHERE s.id = $1\
                GROUP BY s.id";
  // let container;
  // const photos = [];
  // const sku = [];
  pool
    .query(query, [product_id])
    .then((results) => {
      const data = results.rows[0];
      // data.photos.forEach((photo) => {
      //   photos.push(
      //     { thumbnail_url: photo.thumbnail_url, url: photo.url }
      //   );
      // })
      // data.skus.forEach((thisSku) => {
      //   sku.push({ [thisSku.sku_id]: { quantity: thisSku.quantity, size: thisSku.size } });
      // });
      // console.log(data)
      // container = {
      //   style_id: data.id,
      //   name: data.name,
      //   original_price: data.original_price,
      //   sale_price: data.sale_price,
      //   'default?': data.default_style,
      //   photos: data.photos,
      //   skus: data.skus
      // };
      res.status(200).send(data)
    })

    // .then(() => res.status(200).send(container))
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
