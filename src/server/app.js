const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const userRouter = require('./user');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const model = require('./model');
const Chat = model.getModel('chat');

io.on('connection',(socket) => {
    socket.on('sendMsg',(data) => {
        const {from,to,msg} = data;
        const chatid = [from,to].sort().join('_');
        Chat.create({chatid,from,to,content:msg},(err,result) => {
            io.emit('recMsg',Object.assign({},result._doc));
        })
    })
})

app.use(cookieParser());
app.use(bodyParser.json());
app.use('/user',userRouter);

server.listen(1234,() => {
    console.log('server success startup');
})