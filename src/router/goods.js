const express = require('express');
const mongodb = require('mongodb');
const ObjectID = mongodb.ObjectID;
const bodyParser = require('body-parser');
let urlencodedParser = bodyParser.urlencoded({ extended: false })
let Router = express.Router();

const db = require('../db');

// 获取Mongo客户端
const MongoClient = mongodb.MongoClient;

Router.get('/',(req,res)=>{
    // console.log(req.query);
    let {page,limit,key} = req.query;

    // console.log(page,limit,key);
    MongoClient.connect('mongodb://localhost:27017',{ useNewUrlParser: true },(err, database)=>{
        //连接成功后执行这个回调函数
        if(err) throw err;

        // 使用某个数据库，无则自动创建
        let db = database.db('NodeProject');

        // 使用集合
        let user = db.collection('list');

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

// RESTful风格api
Router.route('/:id')
    .get(async(req, res) => {
        let {id,state} = req.query;
        // console.log(id);
        let data
        try{
            data = await db.find('list',{_id:ObjectID(id)},{state});
        }catch(err){
            data = err;
        }

        res.send(data);
    })
    //修改商品信息
    .post(urlencodedParser,async(req, res) => {
        let {id,goods,priceOld,priceNow,stock,state,classify} = req.body;
        // console.log(id);
        let data
        try{
            data = await db.update('list',{_id:ObjectID(id)},{goods,priceOld,priceNow,stock,state,classify});
        }catch(err){
            data = err;
        }

        res.send(data);
    })
    //添加商品信息
    .put(urlencodedParser,async(req, res) => {
        let {goods,priceOld,priceNow,stock,state,classify,url} = req.body;
        // console.log(url)
        let data
        try{
            data = await db.insert('list',{goods,priceOld,priceNow,stock,state,classify,url,time:show()});
        }catch(err){
            data = err;
        }
        res.send(data);
    })

    //删除商品信息
    .delete(urlencodedParser,async(req, res) => {
        let {id} = req.body;
        console.log(id);
        let data
        try{
            data = await db.delete('list',{_id:ObjectID(id)});
        }catch(err){
            data = err;
        }

        res.send(data);
    })

function show() {
    var mydate = new Date();
    var str = mydate.getFullYear() +'-' ;
    str += (mydate.getMonth() + 1) +'-' ;
    str += mydate.getDate();
    return str;
}



module.exports = Router;