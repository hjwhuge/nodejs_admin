// 利用Express中的Router实现路由模块化
const express = require('express');
const mongodb = require('mongodb');
let Router = express.Router();
const db = require('../db/indexs');
const bodyParser = require('body-parser');
let urlencodedParser = bodyParser.urlencoded({ extended: false })
// 获取Mongo客户端
const MongoClient = mongodb.MongoClient;


Router.route('/')
    .get(urlencodedParser,async(req,res)=>{
        let {name} = req.query;
        console.log(name);
        let data;
        try{
            data = await db.find('adduser',{username:name});
        }catch(err){
            data = err;
        }
        res.send(data);
    })
    // 修改商品信息
    .post(urlencodedParser,async(req, res) => {
        let {username,password,uphone,uemail,utext} = req.body;
        console.log(req.body);
        let data
        try{
            data = await db.update('adduser',{username:username},{password,uphone,uemail,utext});
        }catch(err){
            data = err;
        }

        res.send(data);
    })

module.exports = Router;