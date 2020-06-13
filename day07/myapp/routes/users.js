var express = require('express');
var router = express.Router();
var tool=require("./validateLogin")

/* GET users listing. */
router.get('/', function(req, res, next) {
  if(!tool.validateLogin(req)){
    res.redirect('/login')
    return;
  }
  res.render('users',{aindex:3,role:req.cookies.role});
});

module.exports = router;
