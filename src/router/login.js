//引入模块
const express = require('express');
const mongodb = require('mongodb');
let Router = express.Router();
const MongoClient = mongodb.MongoClient;
const bodyParser = require('body-parser');
let urlencodedParser = bodyParser.urlencoded({ extended: false })

Router.get('/',(req,res)=>{
    res.send('分类列表')
});


Router.post('/', urlencodedParser, (req,res)=>{
        let {name,password} = req.body;
        //连接MongoDB并连接数据库laoxie，无则自动创建
        MongoClient.connect("mongodb://localhost:27017", function(err, database) {
            //链接错误
            if(err) throw err;
            //链接成功
            //链接数据库
            let db = database.db('administrator');
            // 使用集合
            let user = db.collection('user');
            // 处理password为数字的情况
            password = isNaN(password) ? password : password*1;
            
            //查询数据是否存在
            user.findOne({name,password},(err,result)=>{
                
                if(result){
                    //查到数据，登录成功
                    res.send({
                        code:1,
                        data:result,
                        msg:'ok'
                    });
                }else{
                    res.send({
                        code:0,
                        data:[],
                        msg:'fail'
                    })
                }
            });


            //关闭数据库
            database.close();
        });
    });


    
module.exports = Router;

