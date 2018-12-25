//把路由封装成模块
const express = require('express')

// 引入单独路由模块

const userRouter = require('./user');
const goodsRouter = require('./goods');
const categoryRouter = require('./category');
const order = require('./order');
const upload = require('./upload');
const login = require('./login');
const adduser = require('./adduser');
let Router = express.Router();


//给所有路由设置允许跨域
// Router.all('*', function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
//     res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");

//     // 跨域请求CORS中的预请求
//     if(req.method=="OPTIONS") {
//       res.send(200);/*让options请求快速返回*/
//     } else{
//       next();
//     }
// });


// 关于用户的路由
Router.use('/html/user',userRouter)

// 关于商品信息的路由
Router.use('/html/goods',goodsRouter)

// 关于商品分类的路由
Router.use('/html/goodsCategory',categoryRouter)


// 关于订单列表的路由
Router.use('/html/order',order)

// 关于图片上传的路由
Router.use('/html/upload',upload)

//关于用户登录的路由
Router.use('/login',login)

Router.use('/html/adduser',adduser);


module.exports = Router