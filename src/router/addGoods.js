const express = require('express');
const mongodb = require('mongodb');

let Router = express.Router();



// 获取Mongo客户端
const MongoClient = mongodb.MongoClient;

Router.get('/',(req,res)=>{
    // console.log(req.query);
    let {page,limit} = req.query;

    // console.log(page,limit);
    MongoClient.connect('mongodb://localhost:27017',{ useNewUrlParser: true },(err, database)=>{
        //连接成功后执行这个回调函数
        if(err) throw err;

        // 使用某个数据库，无则自动创建
        let db = database.db('NodeProject');

        // 使用集合
        let user = db.collection('list');

        let data='';

        user.insertOne(data,(err, result)=>{
            // result:插入数据成功的信息
            //  * ops  插入的所有数据（带id）
            //  * insertedCount  插入的数量
            console.log(result)
        });


       

        // 关闭数据库，避免资源浪费
        database.close();

});


// RESTful风格api
Router.route('/:id')
    .get((req,res)=>{
        res.send({
            path:'获取商品信息',
            username:req.params.id
        })
    })

    .post((req,res)=>{
        res.send({
            path:'修改商品信息',
            username:req.params.id
        })
    })

    .put((req,res)=>{
        res.send({
            path:'添加商品',
            username:req.params.id
        })
    })

    .delete((req,res)=>{
        res.send({
            path:'删除商品',
            username:req.params.id
        })
    })


module.exports = Router;