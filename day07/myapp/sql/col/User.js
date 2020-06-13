const mongoose = require('../db');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  userid: { type: String },
  username: { type: String }, // 账户昵称 ***********
  nickname: { type: String }, // 默认昵称
  password: { type: String }, // *******************
  tel: { type: String }, // 手机号 // ************
  avatar: { type: String },
  gender: { type: Number }, // 性别 1 男 0 女
  email: { type: String },
  birthday: { type: Number },
  createtime: { type: String }, // moment("20111031", "YYYYMMDD").fromNow(); // 9 年前
  lasttime: { type: String }, // 最后一次登录的时间
  hobby: { type: Array }, // 兴趣爱好 --- 为用户推荐
  member: { type: Number } // 会员级别  默认 0 没有会员  1 普通会员 2 超级会员 3 plus会员
})


module.exports = mongoose.model('User', userSchema);