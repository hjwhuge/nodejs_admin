const request = require('request');

const http = require('http');

http.createServer((req,res)=>{
    /*
        理解成后端的ajax请求
        类似于jquery ajax请求
    */
   
   //设置响应头，表示允许跨域
    res.writeHead(200,{'Access-Control-Allow-Origin':'*'});
    request('https://www.layui.com/demo/table/user', (error, response, body) => {
        //body：请求返回的主体
        res.end(body);
    });
}).listen(3006,()=>{
    console.log('server is running on http://localhost:3006');
});



//测试request模块是否安装成功
// request('https://m.weibo.cn/api/config/list', (error, response, body) => {
//     console.log(body);
// });
