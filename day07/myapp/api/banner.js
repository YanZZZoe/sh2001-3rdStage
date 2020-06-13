var express = require('express');
var router = express.Router();
const sql = require("../sql");
const Banner = require("../sql/col/Banner");


/**
 * @api {GET} /api/banner 获取轮播图数据接口
 * @apiDescription 获取轮播图数据接口
 * @apiName banner
 * @apiGroup banner
 * @apiSuccessExample {json} Success-Response:
 * {
 *    code:"200",
 *    message:"获取轮播图数据",
 *    data:data
 * }
 * @apiSampleRequest /api/banner
 * @apiVersion 0.0.0
 */
router.get('/', function(req, res, next) {
  sql.find(Banner,{},{_id:0}).then(data=>{
     res.send({
        code:'200',
        message:'获取轮播图数据接口',
        data
     })
  })
});

module.exports = router;