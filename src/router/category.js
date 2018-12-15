const express = require('express');
let Router = express.Router();

const mongodb = require('mongodb');


// 获取Mongo客户端
const MongoClient = mongodb.MongoClient;

//查询商品分类所有数据
Router.get('/', (req, res) => {
    let { page, limit } = req.query;

    // console.log(page,limit);
    MongoClient.connect('mongodb://localhost:27017', { useNewUrlParser: true }, (err, database) => {
        //连接成功后执行这个回调函数
        if (err) throw err;

        // 使用某个数据库，无则自动创建
        let db = database.db('NodeProject');

        // 使用集合
        let user = db.collection('goodsCategory');

        // 查询数据

        // console.log(page,limit);
        user.find().toArray((err, result) => {
            // console.log(result);
            let data;
            if (err) {
                // console.log(666);
                data = {
                    'code': 1,
                    'data': [],
                    'msg': err
                }
            } else {
                data = {
                    'code': 0,
                    'data': result,
                    'msg': 'hello word'
                }

            }

            res.send(data);
        });


        // 关闭数据库，避免资源浪费
        database.close();

    });
});

//插入商品信息
Router.get('/inster', (req, res) => {
    let { classify, remark } = req.query;

    // console.log(classify,remark);
    MongoClient.connect('mongodb://localhost:27017', { useNewUrlParser: true }, (err, database) => {
        //连接成功后执行这个回调函数
        if (err) throw err;

        // 使用某个数据库，无则自动创建
        let db = database.db('NodeProject');

        // 使用集合
        let user = db.collection('goodsCategory');

        // function pages() {
        //     let pages;
        //     user.find().count((err, result) => {
        //         console.log(result);
        //         return result+1;
        //     })
        // }

        // 插入数据
        user.insertOne({
            classify,
            remark,
            id: 11,
            time:show()
        }, (err, result) => {
            // result:插入数据成功的信息
            //  * ops  插入的所有数据（带id）
            //  * insertedCount  插入的数量
            // console.log(result)
        });


        // 关闭数据库，避免资源浪费
        database.close();

    });
});

//删除商品信息
Router.get('/del', (req, res) => {
    let {id} = req.query;
    // console.log(id);
    MongoClient.connect('mongodb://localhost:27017', { useNewUrlParser: true }, (err, database) => {
        //连接成功后执行这个回调函数
        if (err) throw err;

        // 使用某个数据库，无则自动创建
        let db = database.db('NodeProject');

        // 使用集合
        let user = db.collection('goodsCategory');

        // 删除数据
        user.deleteOne({id:id*1},(err,result)=>{
            console.log(result)
        });

        // 关闭数据库，避免资源浪费
        database.close();

    });
});

// RESTful风格api
Router.route('/:id')
    .get((req, res) => {
        res.send({
            path: '获取商品信息',
            username: req.params.id
        })
    })

    .post((req, res) => {
        res.send({
            path: '修改商品信息',
            username: req.params.id
        })
    })

    .put((req, res) => {
        res.send({
            path: '添加商品',
            username: req.params.id
        })
    })

    .delete((req, res) => {
        res.send({
            path: '删除商品',
            username: req.params.id
        })
    })

function show() {
    var mydate = new Date();
    var str = mydate.getFullYear() +'-' ;
    str += (mydate.getMonth() + 1) +'-' ;
    str += mydate.getDate();
    return str;
}


module.exports = Router;