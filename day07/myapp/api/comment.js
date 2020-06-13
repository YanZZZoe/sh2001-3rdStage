var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
   res.send('评论相关')
});

module.exports = router;