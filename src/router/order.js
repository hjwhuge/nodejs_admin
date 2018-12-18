const express = require('express');


let Router = express.Router();

const bodyParser = require('body-parser');
let urlencodedParser = bodyParser.urlencoded({ extended: false })

const db = require('../db');

//获取所有订单
Router.get('/',async(req,res)=>{
    //获取所有分类
    // console.log(req.query);
    let data
    try{
        data = await db.find('order',{});
    }catch(err){
        data = err;
    }

    res.send(data);
});

//删除订单信息
Router.delete('/del',urlencodedParser,async(req,res)=>{
    let {id} = req.body;
    console.log(req.body);
    let data
    try{
        data = await db.delete('order',{id:id*1});
    }catch(err){
        data = err;
    }

    res.send(data);
});



module.exports = Router;