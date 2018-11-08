var fs = require("fs");
var data=`'use strict'
module.exports = {
  NODE_ENV: '"production"'
}
`;

fs.writeFile('./config/prod.env.js',data,{flag:'w',encoding:'utf-8',mode:'0666'},function(err){
  if(err){
    console.log("文件写入失败");
  }else{
    console.log("文件写入成功");
  }
});
