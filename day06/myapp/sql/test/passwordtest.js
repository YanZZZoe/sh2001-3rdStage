const crypto=require("crypto");
const secret="abcdef"
const hash = crypto.createHmac('sha256', secret)
                   .update('I love u')
                   .digest('hex');
console.log(hash);