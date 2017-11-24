const express = require('express');
const model = require('./model');
const util = require('./util');
const User = model.getModel('user');

const Router = express.Router();
const _filter = {
    password: 0,
    '__v': 0,
    '_id': 0
}

Router.get('/list',(req,res) => {
    const {type} = req.query;
    User.find({type},_filter,(err,result) => {
        if(err) throw err;
        return res.json({code:0,result});
    })
})

Router.get('/info',(req,res) => {
    const {userid} = req.cookies;
    if(userid){
        User.findOne({_id: userid},_filter,(err,result) => {
            if(err){
                return res.json({code:1, errMsg: '后端出错了'});
            }
            if(result){
                return res.json({code:0, result})
            }
        })
    }else{
        return res.json({code: 1});
    }
})

//注册接口
Router.post('/register',(req,res) => {
    const {userName, password, type} = req.body;
    User.findOne({userName},(err,result) => {
        if(result){
            return res.json({code:1, errMsg: '该账号已被注册'});
        }
        const userModel = new User({userName,type,password: util.md5(password)});
        userModel.save((err,result) => {
            if(err){
                return res.json({code:1, errMsg: '后端出错了'});
            }
            if(result){
                const {userName,type,_id} = result;
                res.cookie('userid',_id);
                return res.json({code:0,result:{userName,type}});
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
        },
        (err, result) => {
            if(!result){
                return res.json({code:1, errMsg: '账号或密码有误'})
            }else{
                res.cookie('userid',result._id);
                result = Object.assign({},{
                    userName: result.userName,
                    type: result.type
                })
                return res.json({code:0,result});
            }
        })
})

//完善个人信息接口
Router.post('/update',(req,res) => {
    const {userid} = req.cookies;
    if(!userid){
        return res.json({code:1});
    }
    const body = req.body;
    User.findByIdAndUpdate(userid,body,(err,result) => {
        if(err){
            return res.json({code:1,errMsg:'后端出错了'})
        }
        if(result){
            result = Object.assign({},{
                userName: result.userName,
                type: result.type
            },body)
            return res.json({code:0,result})
        }
    })
})

module.exports = Router;