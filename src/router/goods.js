const express = require('express');
let Router = express.Router();


Router.get('/',(req,res)=>{
    console.log(req.query);
    let {page,limit,key} = req.query;

    console.log(page,limit,key);
    MongoClient.connect('mongodb://localhost:27017',(err, database)=>{
        //连接成功后执行这个回调函数
        if(err) throw err;

        // 使用某个数据库，无则自动创建
        let db = database.db('NodeProject');

        // 使用集合
        let user = db.collection('list');

        // 查询数据
        if(key){
            user.find({id:(key.id)*1}).toArray((err,result)=>{
                // console.log(key.id,result);
                let data;
                if(err){
                    data={
                        'code':1,
                        'data':[],
                        'msg':err
                    }
                }else{
                    data = {
                        'code':0,
                        'data':result,
                        'msg':'hello word'
                    }
                    
                }

                res.send(data);
            });
        }else{
            user.find().toArray((err,result)=>{
                // console.log(result);
                let data;
                if(err){
                    data={
                        'code':1,
                        'data':[],
                        'msg':err
                    }
                }else{
                    data = {
                        'code':0,
                        'data':result,
                        'msg':'hello word'
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