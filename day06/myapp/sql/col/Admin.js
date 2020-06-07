const mongoose = require('./../db');

const Schema = mongoose.Schema;

const adminSchema = new Schema({
  adminid:{type:String},
  admin:{type:String},
  password:{type:String},
  role:{type:String}
});

module.exports = mongoose.model('Admin', adminSchema);