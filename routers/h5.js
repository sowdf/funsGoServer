const express = require('express');
const router = express.Router();
const request = require('request');


/*
 * 分享页面
 *
 * */

router.get('/huodong-detail.html',(req,res,next)=>{
    let {query:{id}} = req;
    console.log(id);
    request.get(`http://app.funsgo.ltd/app/base/android/v1.0/huodong-detail.html?id=${id}`,(err,response,body)=>{
        let {code,result:{info}} = JSON.parse(body);
        let re = /\[[^\]]+\]/gi;
        let styleRe = /style\s*?=\s*?([‘"])[\s\S]*?\1/gi;
        info.content = info.content.replace(re,'').replace(styleRe,'');
        return res.render('h5/share.html',{info});
    });

});

module.exports = router;
