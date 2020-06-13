var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
   res.send('订单')
});

module.exports = router;