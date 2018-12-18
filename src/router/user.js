// 利用Express中的Router实现路由模块化
const express = require('express');
const mongodb = require('mongodb');
const url = require('url');
let Router = express.Router();

// 获取Mongo客户端
const MongoClient = mongodb.MongoClient;


Router.get('/',(req,res)=>{
    // console.log(req.query);查看请求参数，如果没有默认为{}
    let {page,limit,key} = req.query;

    // console.log(page,limit,key);
    MongoClient.connect('mongodb://localhost:27017',{ useNewUrlParser: true },(err, database)=>{
        //连接成功后执行这个回调函数
        if(err) throw err;

        // 使用某个数据库，无则自动创建
        let db = database.db('administrator');

        // 使用集合
        let user = db.collection('adminer');

        //查询数据总条数
        let pages;
        user.find().count((err,result)=>{
            // console.log(result);
            pages = result;
        })
        // user.find().toArray((err,result)=>{
            
        //     pages = result.length;
        //     console.log(pages);
        // })

        // 查询数据
        if(key){
            user.find({id:(key.id)*1}).toArray((err,result)=>{
                // console.log(key.id,result);
                let data;
                if(err){
                    data={
                        'code':1,
                        'data':[],
                        'msg':err,
                        'count':pages
                    }
                }else{
                    data = {
                        'code':0,
                        'data':result,
                        'msg':'hello word',
                        'count':pages
                    }
                    
                }

                res.send(data);
            });
            // db.myCollection.find().sort({"ID":1}).skip(10).limit(10)
            // 将其根据ID排序后，跳过10，查询10条，结果为10-19条的数据
        }else{

            // console.log(page,limit);
            user.find().skip((page-1)*limit*1).limit(limit*1).toArray((err,result)=>{
                // console.log(result);
                let data;
                if(err){
                    // console.log(666);
                    data={
                        'code':1,
                        'data':[],
                        'msg':err,
                        'count':pages
                    }
                }else{
                    data = {
                        'code':0,
                        'data':result,
                        'msg':'hello word',
                        'count':pages
                    }
                    
                }

                res.send(data);
            });



        }

        // 关闭数据库，避免资源浪费
        database.close();

    });
   
});

Router.get('/:id',(req,res)=>{
    let {id} = req.params;
    if(id){
        MongoClient.connect('mongodb://localhost:27017',{ useNewUrlParser: true },(err, database)=>{
            //连接成功后执行这个回调函数
            if(err) throw err;

            // 使用某个数据库，无则自动创建
            let db = database.db('administrator');

            // 使用集合
            let user = db.collection('adminer');

            
            // 删除数据 deleteOne()
            user.remove({id:id*1},(err,result)=>{
                if(err){
                    res.send(err);
                }else{
                    res.send({
                        code:1
                    })
                }

            })

            // 关闭数据库，避免资源浪费
            database.close();

        });
    }
    

});


Router.get('/:username',(req,res)=>{
    res.send({
        path:req.url,
        username:req.params.username
    });

});


module.exports = Router;