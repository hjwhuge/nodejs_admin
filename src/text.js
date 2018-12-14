const express = require('express');
const mongodb = require('mongodb');

// 获取Mongo客户端
const MongoClient = mongodb.MongoClient;

let app = express();

// 静态资源服务器
app.use(express.static('./'));


// 路由

app.get('/list' ,(req,res)=>{
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






app.listen(1809,()=>{
    console.log('server is running on http://localhost:1809');
})