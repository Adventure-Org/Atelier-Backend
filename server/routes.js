const express = require('express');
const router = express.Router();
const db = require('./models/reviews.js');

router.get('/reviews', db.getReviews);
router.get('/reviewsPhotos', db.getMetadata);

module.exports = router;