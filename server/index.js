const express = require('express');
const cors = require('cors');
const db = require('../db/index.js');

app.use(express.json());
app.use(cors());

app.get('/products/:id', (req, res) => {
  const { id } = req.params;
  db.getProduct(id, (err, response) => {
    if (err) {
      res.status(400).send('error');
    } else {
      res.status(200).send(response);
    }
  });
});