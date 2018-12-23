const path = require('path');
const express = require('express');
let Router = express.Router();

const multer = require('multer');


// 定义上传临时路径
// 如果无文件夹，则会自动创建

// 定义磁盘存储
var storage = multer.diskStorage({
    destination: 'uploads/',
    filename: function (req, file, cb) {
        // console.log('file:',file)
        let ext = path.extname(file.originalname);//.jpg,.png,.xx
      cb(null, file.fieldname + '-' + Date.now()+ext);
    }
})

let upload = multer({ dest: 'temp/',storage });

// api路径：/upload/goods
// upload的方法：
//  * single(name)
Router.post('/',upload.single('goodspic'), (req,res)=>{
    // 通过req.file获取到上传文件的内容
    // console.log(req.file);
    
    //文件名
    // let name = req.file.originalname.split('.')[0];
    // console.log(name);
    // 存储到数据库

    // http://localhost:1809/img/login_bg.jpg
    res.send({
        code:1,
        msg:'文件上传成功',
        data:req.file
    })
});

module.exports = Router;