// const mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost/Atelier');
// var db = mongoose.connection;

// let Atelier = mongoose.Schema({

//   id: { type: Number, unique: true },
//   name: String,
//   slogan: String,
//   description: String,
//   category: String,
//   default_price: String,
//   current_product_id: Number,
//   related_product_id: Number,
//   photos: [{
//     id: Number,
//     styleId: String,
//     url: String,
//     thumbnail_url: String
//   }],
//   skus: {
//     sku_id: Number,
//     styleID: Number,
//     size: String,
//     quantity: Number
//   },
//   related: {
//     id: Number,
//     current_product_id: Number,
//     related_product_id: Number,
//   },
//   features: {
//     id: Number,
//     product_id: Number,
//     feature: String,
//     value: String
//   }
// });
