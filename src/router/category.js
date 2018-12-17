const express = require('express');
let Router = express.Router();

const bodyParser = require('body-parser');
let urlencodedParser = bodyParser.urlencoded({ extended: false })

const db = require('../db');

//查询商品分类所有数据
Router.get('/',async(req,res)=>{
    //获取所有分类
    // console.log(req.query);
    let data
    try{
        data = await db.find('goodsCategory',{});
    }catch(err){
        data = err;
    }

    res.send(data);
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
Router.delete('/del',urlencodedParser,async(req,res)=>{
    let {id} = req.body;
    console.log(id);
    let data
    try{
        data = await db.delete('goodsCategory',{id:id*1});
    }catch(err){
        data = err;
    }

    res.send(data);
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