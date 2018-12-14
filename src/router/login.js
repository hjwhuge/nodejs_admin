//引入模块
const express = require('express');
const mongodb = require('mongodb');
const bodyParser = require('body-parser');
const MongoClient = mongodb.MongoClient;

//POST请求需要用到中间件
let urlencodedParser = bodyParser.urlencoded({ extended: false })

let Router = express.Router();
//连接MongoDB并连接数据库laoxie，无则自动创建
MongoClient.connect("mongodb://localhost:27017", function(err, database) {
    if(err) throw err;
    let db = database.db('administrator');
    
});
// Router.post('/login',urlencodedParser,(req,res){
    
// });