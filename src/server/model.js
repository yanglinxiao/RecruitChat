const mongoose = require('mongoose');
const DB_URL = 'mongodb://localhost:27017/RecruitChat';
mongoose.connect(DB_URL);

const models = {
    user:{
        userName: {type: String, require: true},
        password: {type: String, require: true},
        type: {type: String, require: true},
        avatar: {type: String},
        desc: {type: String},
        title: {type: String},
        company: {type: String},
        money: {type: String}
    },
    chat:{
        chatid: {type: String,reuqire: true},
        from: {type: String, require: true},
        to: {type: String, require: true},
        content: {type: String, require: true, default:''},
        read: {type: Boolean, require: true},
        create_time:{type: Number, require: true, default:new Date().getTime()}
    }
}

for(let key of Object.keys(models)){
    mongoose.model(key,new mongoose.Schema(models[key]));
}

module.exports = {
    getModel(name){
        return mongoose.model(name);
    }
}