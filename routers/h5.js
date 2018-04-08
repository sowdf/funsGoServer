const express = require('express');
const router = express.Router();
const request = require('request');


/*
 * 分享页面
 *
 * */

function formatTime(sj)
{
    let now = new Date(sj*1000);
    let   year=now.getFullYear();
    let   month=now.getMonth()+1;
    let   date=now.getDate();
    let   hour=now.getHours();
    let   minute=now.getMinutes();
    let   second=now.getSeconds();
    return   year+"-"+month+"-"+date;
    
}

router.get('/huodong-detail.html',(req,res,next)=>{
    let {query:{id}} = req;
    console.log(id);
    request.get(`http://app.funsgo.ltd/app/base/android/v1.0/huodong-detail.html?id=${id}`,(err,response,body)=>{
        let {code,result:{info}} = JSON.parse(body);
        let re = /\[[^\]]+\]/gi;
        let styleRe = /style\s*?=\s*?([‘"])[\s\S]*?\1/gi;
        info.content = info.content.replace(re,'').replace(styleRe,'');
        info.s_time = formatTime(info.s_time);
        info.e_time = formatTime(info.e_time);
        console.log(info);
        console.log(info.content_ext.place.value);
        return res.render('h5/share.html',{info});
    });

});

module.exports = router;
