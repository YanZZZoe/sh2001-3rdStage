var express = require('express');
var router = express.Router();
const crypto = require('crypto');
const sql = require('./../sql')
const User = require('./../sql/col/User');
const uuid = require('node-uuid');
const jwt = require('jsonwebtoken');
const utils = require('./../utils');


router.get('/', function (req, res, next) {
   res.send('用户')
});

/** 
 *  @api {POST} /api/users/register 注册 
 *  @apiDescription 注册 
 *  @apiGroup users 
 *  @apiParam { string } username 账户信息 
 *  @apiParam { string } tel 手机号 
 *  @apiParam { string } password 密码 
 *  @apiSuccessExample {json} Success-Response: 
 *  res.send({ code: '10001', message: '用户名已存在' }) 
 *  res.send({ code: '10002', message: '手机号已被注册' }) 
 *  res.send({ code: '200', message: '注册成功' }) 
 *  @apiSampleRequest /api/users/register 
 *  @apiVersion 0.0.0 
 */
router.post('/register', (req, res, next) => {
   // 获取数据
   let { username, tel, password } = req.body
   // 验证用户名和手机号是否可用 
   sql.find(User, { username }, { _id: 0 }).then(data1 => {
      if (data1.length > 0) {
         res.send({ code: '10001', message: '用户名已存在' })
      } else {
         sql.find(User, { tel }, { _id: 0 }).then(data2 => {
            if (data2.length > 0) { res.send({ code: '10002', message: '手机号已被注册' }) } else {
               // 加密密码
               password = crypto.createHmac('sha256', password)
                  .update('I love you')
                  .digest('hex');
               const time = Date.now()
               // 插入数据 
               sql.insert(User, {
                  userid: 'user_' + uuid.v1(),
                  username: username,
                  tel: tel,
                  password: password,
                  nickname: '嗨购_' + time,
                  avatar: 'https://dss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=290165340,171888139&fm=26&gp=0.jpg',
                  sex: -1,
                  email: '',
                  birthday: 1,
                  createtime: time,
                  lasttime: '',
                  hobby: [],
                  member: 0
               }).then(() => { res.send({ code: '200', message: '注册成功' }) })
            }
         })
      }
   })
})

/**
 *  @api {POST} /api/users/login 登录（以手机号或者账号选择其一登录即可）
 *  @apiDescription 登录 
 *  @apiGroup users 
 *  @apiParam { string } username 账户信息 
 *  @apiParam { string } tel 手机号 
 *  @apiParam { string } password 密码 
 *  @apiSuccessExample {json} Success-Response: 
 *  res.send({ code: '10003', message: '该账号或手机号还未注册' }) 
 *  res.send({ code: '10004', message: '密码错误' }) 
 *  res.send({ code: '200', message: '注册成功' }) 
 *  @apiSampleRequest /api/users/login 
 *  @apiVersion 0.0.0 
 */


router.post("/login", (req, res, next) => {
   let { username, tel, password } = req.body;
   sql.find(User, { $or: [{ username }, { tel }] }, { _id: 0 }).then(data1 => {
      if (data1.length === 0) {
         res.send({
            code: '10003',
            message: '该账号或者手机号还未注册'
         })
      } else {
         password = crypto.createHmac('sha256', password)
            .update('I love you')
            .digest('hex');
         sql.find(User, { $or: [{ username, password }, { tel, password }] }, { _id: 0 }).then(data2 => {
            if (data2.length === 0) {
               res.send({
                  code: '10004',
                  message: '密码错误'
               })
            } else {
               const token = jwt.sign({ userid: data2[0].userid }, 'masaki', { expiresIn: 24 * 60 * 60 });
               let time = Date.now()
               sql.update(User, { userid: data2[0].userid }, { $set: { lasttime: time } }).then(() => {
                  res.send({
                     code: '200',
                     message: '登录成功',
                     lasttime: time,
                     data: {
                        userid: data2[0].userid,
                        nickname: data2[0].nickname,
                        token
                     }
                  })
               })
            }
         })
      }
   })
});

/**
 * @api {POST} /api/users/updateavatar 更新头像
 * @apiDescription 更新头像
 * @apiGroup users
 * @apiParam { string } token token
 * @apiParam { string } userid 账户id
 * @apiParam { string } avatar  头像的地址
 * @apiSuccessExample {json} Success-Response:
 *  res.send({
      code: '10119',
      message: 'token验证失败，请重新登录'
    })
  res.send({
      code: '200',
      message: '上传头像成功'
    })
 * @apiSampleRequest /api/users/updateavatar
 * @apiVersion 0.0.0
 */
router.post('/updateavatar', (req, res, next) => {
   utils.validateToken(req).then(() => {
      const { userid, avatar } = req.body
      sql.update(User, { userid }, { $set: { avatar } }).then(() => {
         res.send({
            code: '200',
            message: '上传头像成功'
         })
      })
   }).catch(() => {
      res.send({
         code: '10119',
         message: 'token验证失败，请重新登录'
      })
   })
})

/**
 * @api {POST} /api/users/updateUserInfo 修改个人信息
 * @apiDescription 修改个人信息
 * @apiGroup users
 * @apiParam { string } token token
 * @apiParam { string } userid 用户id
 * @apiParam { string } nickname 昵称（非必须）
 * @apiParam { number } gender  性别（非必须）
 * @apiParam { number } birthday  生日（非必须）
 * @apiParam { string } email  邮箱（非必须）
 * @apiSuccessExample {json} Success-Response:
 *  res.send({
      code: '10119',
      message: 'token验证失败，请重新登录'
    })
  res.send({
      code: '200',
      message: '修改信息成功'
    })
 * @apiSampleRequest /api/users/updateUserInfo
 * @apiVersion 0.0.0
 */

router.post('/updateUserInfo', (req, res, next) => {
   utils.validateToken(req).then(() => {
      let { userid, nickname, gender, birthday, email } = req.body
      gender = gender*1
      nickname = nickname || ''
      birthday = birthday*1 || 1
      email = email || ''
      // 为了获取用户的信息，可以验证不能为空之后再操作
      sql.update(User, { userid }, { $set: {
        nickname, gender, birthday, email
      }}).then(() => {
        res.send({
          code: '200',
          message: '修改信息成功'
      })
    }).catch(() => {
      res.send({
        code: '10119',
        message: 'token验证失败，请重新登录'
      })
    })
  })
})

module.exports = router;