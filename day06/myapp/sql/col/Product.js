const mongoose = require('./../db');

const Schema = mongoose.Schema;

const productSchema = new Schema({
  proid: { type: String },
  proName: { type: String },
  proBrand: { type: String },
  brandLogo: { type: String },
  proImg: { type: String },
  price: { type: Number },
  detail: { type: String },
  storage: { type: Number },
  sales: { type: Number }
});

module.exports = mongoose.model('Product', productSchema);