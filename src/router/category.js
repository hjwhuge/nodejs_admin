const express = require('express');
let Router = express.Router();
const ObjectID = require('mongodb').ObjectID;
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



//删除商品信息
// Router.delete('/del',urlencodedParser,async(req,res)=>{
//     let {id} = req.body;
//     console.log(id);
//     let data
//     try{
//         data = await db.delete('goodsCategory',{id:id*1});
//     }catch(err){
//         data = err;
//     }

//     res.send(data);
// });


// RESTful风格api
Router.route('/:id')
    .get((req, res) => {
        res.send({
            path: '获取商品信息',
            username: req.params.id
        })
    })
    //修改商品分类信息
    .post(urlencodedParser,async(req, res) => {
        let {id,value} = req.body;
        console.log(id);
        let data
        try{
            data = await db.update('goodsCategory',{_id:ObjectID(id)},{classify:value});
        }catch(err){
            data = err;
        }

        res.send(data);
    })
    //添加商品分类信息
    .put(urlencodedParser,async(req, res) => {
        let {classify,remark} = req.body;
        let data
        try{
            data = await db.insert('goodsCategory',{classify,remark,time:show()});
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
            data = await db.delete('goodsCategory',{_id:ObjectID(id)});
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