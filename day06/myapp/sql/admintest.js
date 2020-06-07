const sql = require("./index");
const Admin = require("./col/Admin");
const insertData = [
    {
        admin:"admin",//abcdef
        password: 'cb5572db6e6ac40d6bf5f9329b6cbc92daced2855161ecb769475d9e4510d13e',
        role: 2
    },
    {
        admin:"aiba",//123456
        password:"a65ed8b019d729a39bbd325296fb3ebde229b58581c32139e4a346c67f77ec1a",
        role:1
    }
]

sql.insert(Admin, insertData).then(() => {
    console.log("插入成功")
})