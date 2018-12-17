//把路由封装成模块
const express = require('express');

// 引入单独路由模块
const userRouter = require('./user');
const goodsRouter = require('./goods');
const categoryRouter = require('./category');
// const addGoods = require('./addGoods');
const order = require('./order');
const login = require('./login');
let Router = express.Router();

// 关于用户的路由
Router.use('/html/user',userRouter);

// 关于商品信息的路由
Router.use('/html/goods',goodsRouter);

// 关于商品分类的路由
Router.use('/html/goodsCategory',categoryRouter)

// 关于添加商品的路由
// Router.use('/html/addGoods',addGoods)

// 关于订单列表的路由
Router.use('/html/order',order)

//关于用户登录的路由

Router.use('/login',login)


module.exports = Router;