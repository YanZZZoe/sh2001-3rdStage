module.exports={
    validateLogin(req){
        return req.cookies.isLogin==='ok';
    },
    validateRole(req){
        return req.cookies.role==='2'
    }
}