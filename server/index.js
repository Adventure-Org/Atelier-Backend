const express = require('express');
// const db = require('./db/index.js');
const router = require('./routes.js');
const cors = require('cors');
let app = express();

// app.use(express.json());
// app.use(express.static(__dirname + + '/../client'));
app.use(cors());
app.use('/', router);

// const {pool} = pg
const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});