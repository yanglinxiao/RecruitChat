const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const userRouter = require('./user');

const app = express();

app.use(cookieParser());
app.use(bodyParser.json());

// app.get('/',(req,res) => {
//     res.send('hello world');
// })

app.use('/user',userRouter);

app.listen(1234,() => {
    console.log('server success startup');
})