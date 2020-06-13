const mongoose = require('./../db');

const Schema = mongoose.Schema;

const bannerSchema = new Schema({
  banid: { type: String },
  banDesc: { type: String },
  banHref: { type: String },
  banImg: { type: String }
});

module.exports = mongoose.model('Banner', bannerSchema);