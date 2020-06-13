var express = require('express');
var router = express.Router();
var tool=require("./validateLogin");
const xlsx = require("node-xlsx");
const uuid = require("node-uuid");
const sql = require("../sql");
const Banner = require("../sql/col/Banner");


/* GET home page. */
router.get('/', function(req, res, next) {
  if(!tool.validateLogin(req)){
    res.redirect('/login');
    return
  }
  sql.find(Banner, {}, { _id: 0 }).then(data => {  
      res.render('banner', {
        aindex: 1,
        data,
        role:req.cookies.role
      });
    })
});

router.get("/upload", (req, res, next) => {
  // res.send(__dirname+"/pro.xlsx")
  const initData = xlsx.parse(__dirname + "/banner.xlsx");
  const data = initData[0].data
  //res.send(data)
  const arr = [];
  data.forEach((item, index) => {
    if (index > 0) {
      arr.push({
        banid: "ban_" + uuid.v1(),
        banDesc: item[0],
        banHref: item[1],
        banImg: item[2],
      })
    }
  })
  sql.insert(Banner, arr).then(() => {
    res.redirect("/banner")
  })
})

router.get('/add', function (req, res, next) {
  res.render('banner_add', { aindex: 1 ,role:req.cookies.role})
});

router.post('/addAction', (req, res, next) => {
  let {banDesc, banHref,banImg} = req.body
  sql.insert(Banner, {
    banid: 'ban_' + uuid.v1(),
    banDesc, banHref,banImg
  }).then(() => {
    res.send({
      code:'200',
      mesage:'上传轮播图'
    })
  })

})

router.get('/update', function (req, res, next) {
  const { banid } = req.query;
  sql.find(Banner, { banid }, { _id: 0 }).then(data => {
    const { banDesc, banHref,banImg} = data[0]
    res.render('banner_update', {
      aindex: 1,
      banid,
      banDesc, banHref,banImg,
      role:req.cookies.role
    })
  })

});

router.post('/updateAction', (req, res, next) => {
  // get req.query
  // post req.body
  // res.send(req.body);
   let { banid,banName, banImg} = req.body
  sql.update(Banner, {banid},{$set:{
    banName, banImg}
  }).then(() => {
  res.redirect("/banner")
 })
})


router.get('/delete', function (req, res, next) {
  const banid = req.query.banid;
  sql.delete(Banner, { banid }).then(() => {
    res.redirect("/banner")
  })
});


module.exports = router;
