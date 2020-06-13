const sql=require('./index');
const Product=require('./col/Product');
const product = new Product({
    proid: 1112,
    proName: '香奈儿（Chanel）邂逅清新淡香水（瓶装）50ml（绿邂逅 又名：香奈儿邂逅清新淡香水）送女友 送老婆',
    proBrand: 'Chanel',
    brandLogo: 'https://img14.360buyimg.com/cms/jfs/t1/111975/18/3619/20609/5ea91d2aE7609da52/c05686a8ff9d8ede.jpg',
    proImg: ['https://img13.360buyimg.com/n5/jfs/t1/107963/36/13684/234672/5ea296efEe94904fd/19d67f3d80a597ad.jpg','https://img13.360buyimg.com/n5/jfs/t1/102668/8/17525/149336/5e870674Ebd4d7109/af655a52fb5d49b4.jpg','https://img13.360buyimg.com/n5/jfs/t1/114217/13/112/107154/5e870674E48453668/0f9a470272d81a5c.jpg'],
    price: '910',
    detail: '商品毛重：160.00g商品产地：法国适用性别：女士类别：淡香水EDT香调：花香调适用场景：日常，约会，休闲包装：独立包装规格：31-50mL产品产地：法国国产/进口：进口',
    storage: '11',
    sales: '1900'
});

sql.insert(Product,product).then(()=>{
    console.log("插入成功")
})

// sql.find(Product,{},{_id:0,proName:1,proBrand:1,detail:1}).then((data)=>{
//     console.log(data)
// })
// sql.delete(Product,{},1).then(()=>{
//     console.log("删除成功")
// })