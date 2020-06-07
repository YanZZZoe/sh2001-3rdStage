var express = require('express');
var router = express.Router();
const crypto = require("crypto");
const sql = require("../sql/")
const tool = require("./validateLogin")
const Admin = require("../sql/col/Admin");

/* GET home page. */
router.get('/', function (req, res, next) {
  if (!tool.validateLogin(req)) {
    res.redirect('/login')
  }
  res.render('index', { aindex: 0, role: req.cookies.role });
});

router.get('/login', function (req, res, next) {
  res.render('login', { msg: '' });
});

router.get('/admin', function (req, res, next) {
  if (!tool.validateLogin(req)) {
    res.redirect('/login');
    return;
  } else {
    if (!tool.validateRole(req)) {
      res.render('noRole', { aindex: 8, role: req.cookies.role })
    } else {
      res.render('admin', { aindex: 8, role: req.cookies.role })
    }
  }
})

router.get('/logout', function (req, res, next) {
  res.cookie('role', '1111');
  res.cookie('isLogin', false);
  res.redirect('/login')
})

router.post('/loginAction', function (req, res, next) {
  let { admin, password } = req.body
  password = crypto.createHmac('sha256', password)
    .update('I love u')
    .digest('hex');
  sql.find(Admin, { admin, password }).then(data => {
    if (data.length === 0) {
      res.render('login', { msg: '登录信息不符' })
    } else {
      res.cookie('role', data[0].role);
      res.cookie('isLogin', 'ok');
      res.redirect('/')
    }
  })
})


module.exports = router;
