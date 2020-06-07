var express = require('express');
var router = express.Router();
const xlsx = require("node-xlsx");
const uuid = require("node-uuid");
const sql = require("../sql");
const Product = require("../sql/col/Product");
var tool=require("./validateLogin")


/* GET home page. */
router.get('/', function (req, res, next) {
  if(!tool.validateLogin(req)){
    res.redirect('/login');
    return;
  }
  let { count, limitnum } = req.query
  count = count || 0
  limitnum = limitnum || 10
  sql.paging(Product, {}, { _id: 0 }, limitnum, count).then(data => {
    sql.count(Product).then(len => {
      res.render('products', {
        aindex: 2,
        data,
        total: Math.ceil(len / limitnum),
        role:req.cookies.role,
        count
      });
    })

  })
});

router.get('/add', function (req, res, next) {
  res.render('products_add', { aindex: 2 ,role:req.cookies.role})
});

router.get('/update', function (req, res, next) {
  const { proid } = req.query;
  sql.find(Product, { proid }, { _id: 0 }).then(data => {
    const { proName, proBrand, brandLogo, proImg, price, detail, storage, sales } = data[0]
    res.render('products_update', {
      aindex: 2,
      proid,
      proName, proBrand, brandLogo, proImg, price, detail, storage, sales,
      role:req.cookies.role
    })
  })

});


router.post('/addAction', (req, res, next) => {
  // get req.query
  // post req.body
  // res.send(req.body);
  let { proName, proBrand, brandLogo, proImg, price, detail, storage, sales } = req.body
  price *= 1; storage *= 1; sales *= 1;
  sql.insert(Product, {
    proid: 'pro_' + uuid.v1(),
    proName, proBrand, brandLogo, proImg, price, detail, storage, sales
  }).then(() => {
    res.redirect("/products")
  })

})

router.post('/updateAction', (req, res, next) => {
  // get req.query
  // post req.body
  // res.send(req.body);
  let { proid,proName, proBrand, brandLogo, proImg, price, detail, storage, sales } = req.body
  price *= 1; storage *= 1; sales *= 1;
  sql.update(Product, {proid},{$set:{
    proName, proBrand, brandLogo, proImg, price, detail, storage, sales
  }

  }).then(() => {
    res.redirect("/products")
  })

})

router.get("/upload", (req, res, next) => {
  // res.send(__dirname+"/pro.xlsx")
  const initData = xlsx.parse(__dirname + "/pro.xlsx");
  const data = initData[0].data
  // res.send(data)
  const arr = [];
  data.forEach((item, index) => {
    if (index > 0) {
      arr.push({
        proid: "pro_" + uuid.v1(),
        proName: item[0],
        proBrand: item[1],
        brandLogo: item[2],
        proImg: item[3],
        price: item[4],
        detail: item[5],
        storage: item[6],
        sales: item[7]
      })
    }
  })
  sql.insert(Product, arr).then(() => {
    res.redirect("/products")
  })
})


router.get('/delete', function (req, res, next) {
  const proid = req.query.proid;
  sql.delete(Product, { proid }).then(() => {
    res.redirect("/products")
  })
});

router.get('/sort', function(req, res, next) {
  const {type, num} = req.query
  let sortData = {}
  sortData[type] = num
  const limitnum = 10
  sql.sort(Product, {}, { _id: 0 }, sortData).then((data) => {
    sql.count(Product).then(len => {
      res.render('products', { 
        aindex: 2,
        data,
        role: req.cookies.role,
        total: Math.ceil(len / limitnum),
        role:req.cookies.role
      });
    })
  })
})

module.exports = router;
