const mongoose = require('./../db');

const Schema = mongoose.Schema;

const bannerSchema = new Schema({
  banid: { type: String },
  banName: { type: String },
  banImg: { type: String },
});

module.exports = mongoose.model('Banner', bannerSchema);