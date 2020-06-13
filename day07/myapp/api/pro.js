var express = require('express');
var router = express.Router();
const sql = require("../sql");
const Product = require("../sql/col/Product");

/**
 * @api {GET} /api/pro 获取产品数据接口
 * @apiDescription 获取产品数据接口
 * @apiName pro
 * @apiGroup pro
 * @apiParam {number} limitnum 每页显示的个数
 * @apiParam {number} count 页码
 * @apiSuccessExample {json} Success-Response:
 * {
 *    code:"200",
 *    message:"获取产品列表数据",
 *    data:data
 * }
 * @apiSampleRequest /api/pro
 * @apiVersion 0.0.0
 */

 /**
 * @api {GET} /api/pro/detail 获取产品详情接口
 * @apiDescription 获取产品详情数据
 * @apiGroup pro
 * @apiParam {String} proid 查询产品的依据
 * @apiSuccessExample {json} Success-Response:
 * {
 *    code:"200",
 *    message:"获取产品列表数据",
 *    data:data[0]
 * }
 * * {
 *    code:"10000",
 *    message:"没有查询到该产品信息",
 * }
 * @apiSampleRequest /api/pro/detail
 * @apiVersion 0.0.0
 */

router.get('/', function(req, res, next) {
   let { limitnum,count}=req.query;
   limitnum = limitnum*1 || 10;
   count = count*1 || 0;
   sql.paging(Product,{},{_id:0},limitnum,count).then(data=>{
      res.send({
         code:'200',
         message:'获取产品列表数据',
         data
      })
   })
});

router.get('/detail', function(req, res, next) {
  let {proid}=req.query
   sql.find(Product,{proid},{_id:0}).then(data=>{
      data.length===0?
      res.send({
         code:'10000',
         message:'没有查询到该产品的信息'
      }):
      res.send({
         code:'200',
         message:'获取产品详情数据',
         data:data[0]
      })
   })
});

module.exports = router;