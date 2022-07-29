/* eslint-disable no-console */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
const express = require('express');
const cors = require('cors');
const db = require('../db/index.js');

const app = express();
const PORT = 8080 || process.env.PORT;

const router = express.Router();
router.use(cors());

app.use(express.json());
app.use('/', router);

router.get('/products/', db.getProducts);
router.get('/products/:product_id', db.getProduct);
router.get('/products/:product_id/styles', db.getStyles);
router.get('/products/:product_id/related', db.getRelated);

app.listen(PORT, () => {
  console.log('Server listening on port:', `${PORT}`);
});
