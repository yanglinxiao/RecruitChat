const express = require('express');
const model = require('./model');
const util = require('./util');
const User = model.getModel('user');
const Chat = model.getModel('chat');

const Router = express.Router();
const _filter = {
    password: 0,
    '__v': 0
}

//验证是否携带cookie
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
                // const {userName,type,avatar,desc,company,money} = result;
                // result = Object.assign({},{userName, type, avatar,desc,company,money})
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

//获取用户列表接口
Router.get('/list',(req,res) => {
    const {type} = req.query;
    User.find({type},_filter,(err,result) => {
        if(err) throw err;
        return res.json({code:0,result});
    })
})

//获取聊天内容接口
Router.get('/getMsgList',(req,res) => {
    const {userid} = req.cookies;
    User.find({},(err,userResult) => {
        const userList = {};
        userResult.forEach((user) => {
            userList[user._id] = {
                userName: user.userName,
                avatar: user.avatar
            }
        })
        Chat.find({'$or':[{from:userid},{to:userid}]},(err,result) => {
            if (err) throw err;
            return res.json({code:0,result,userList})
        })
    })
})

//更新已读消息接口
Router.post('/readMsg',(req,res) => {
    const {userid} = req.cookies;
    const {from} = req.body;
    Chat.update(
        {from,to: userid},
        {'$set':{read:true}},
        {'multi':true},
        (err,result) =>{
            if(err) res.json({code:1,errMsg:'后端出错了'});
            console.log(result);
            if(result){
                res.json({code:0,result: {modifyNum:result.nModified}})
            }
        })
})

module.exports = Router;