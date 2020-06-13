var express = require('express');
var router = express.Router();
var tool=require("./validateLogin")

/* GET home page. */
router.get('/', function(req, res, next) {
  if(!tool.validateLogin(req)){
    res.redirect('/login')
    return;
  }
  res.render('orders',{aindex:5,role:req.cookies.role});
});

module.exports = router;
