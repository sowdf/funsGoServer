const express = require('express');

const bodyParser = require('body-parser');


const Sequelize = require('sequelize');


//设置COOKIES
let Cookies = require('cookies');

let path = require('path');

let app = express();

let ejs = require('ejs');

//设置模板引擎
app.engine('html',ejs.renderFile);
//设置模板路径 第一个一定要是views
app.set('views','./views');
// 第一个参数必须是engine html 第二个参数是 设置模板引擎的方法名字 ；
app.set('engine html','html');

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended:true}));

//静态文件的设置
app.use(express.static(path.join(__dirname,'public')));

//中间间
let h5 = require('./routers/h5');
app.use('/',h5);
app.listen('1819',(err)=>{
    if(err){
        throw err;
    }
    console.log('this is start port 1819');
});
