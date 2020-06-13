const jwt=require('jsonwebtoken');

module.exports = {
    validateToken(req,res,next){
        let token = req.headers.token || req.body.token || req.query.token;
        return new Promise((resolve,reject)=>{
           if(token){
               jwt.verify(token,'masaki',(err,decode)=>{
                   if(err){
                       reject();
                   }else{
                       req.decode =decode;
                       resolve()
                   }
               })
           }else{
               reject()
           }
        })
    }
}