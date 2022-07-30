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

// optimization - figure out way to not duplicate table info and create features array from query
const getProduct = (req, res) => {
  const { product_id } = req.params;
  const query = 'SELECT p.*, json_agg(f) AS features\
                  FROM products p\
                  LEFT OUTER JOIN features f ON p.id = f.product_id\
                  WHERE p.id = $1\
                  GROUP BY p.id';
  let container;
  const features = [];
  pool
    .query(query, [product_id])
    .then((results) => {
      const data = results.rows[0]
      data.features.forEach((feature) => features.push(
        { feature: feature.feature, value: feature.value }
      ));
      container = {
        id: data.id,
        name: data.name,
        slogan: data.slogan,
        description: data.description,
        category: data.category,
        default_price: `${data.default_price}.00`,
        features: features
      };
    })
    .then(() => res.status(200).send(container))
    .catch((err) => { res.status(500).send(err); console.log(err) })
};

// 3 tables creating duplicate info
const getStyles = (req, res) => {
  const { product_id } = req.params;
  const query = 'SELECT s.*, json_agg(p) AS photos, json_agg(sk) AS skus\
                FROM styles s\
                LEFT OUTER JOIN photos p ON s.id = p.styleId\
                LEFT OUTER JOIN skus sk ON s.id = sk.styleID\
                WHERE s.id = $1\
                GROUP BY s.id';
  let container;
  const photos = [];
  const sku = [];
  pool
    .query(query, [product_id])
    .then((results) => {
      const data = results.rows[0];
      data.photos.forEach((photo) => {
        photos.push(
          { thumbnail_url: photo.thumbnail_url, url: photo.url }
        );
      })
      data.skus.forEach((thisSku) => {
        sku.push({ [thisSku.sku_id]: { quantity: thisSku.quantity, size: thisSku.size } });
      });
      container = {
        style_id: data.id,
        name: data.name,
        original_price: data.original_price,
        sale_price: data.sale_price,
        'default?': data.default_style,
        photos: photos,
        skus: sku
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
