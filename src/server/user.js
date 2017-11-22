const express = require('express');
const model = require('./model');
const util = require('./util');
const User = model.getModel('user');

const Router = express.Router();

Router.get('/list',(req,res) => {
    //User.remove({},()=>{});
    User.find({},(err,data) => {
        if(err) throw err;
        return res.json(data);
    })
})

Router.get('/info',(req,res) => {
    return res.json({code: 0});
})

//注册接口
Router.post('/register',(req,res) => {
    const {userName, password, type} = req.body;
    User.findOne({userName},(err,data) => {
        if(data){
            return res.json({code:1, errMsg: '该账号已被注册'});
        }
        User.create({userName,type,password: util.md5(password)},(err, data) => {
            if(err){
                return res.json({code:1, errMsg: '网络延迟，请重试'});
            }else{
                return res.json({code:0});
            }
        })
    })
})

//登录接口
Router.get('/login',(req,res) => {
    const {userName, password} = req.query;
    User.findOne({
            userName,
            password:util.md5(password)
        },
        {
            password: 0,
            '__v': 0,
            '_id': 0
        },
        (err, data) => {
            if(!data){
                return res.json({code:1, errMsg: '账号或密码有误'})
            }else{
                return res.json({code:0,data});
            }
        })
})

module.exports = Router;