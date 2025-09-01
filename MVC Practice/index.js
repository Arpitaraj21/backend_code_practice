const express = require('express');
const {connectMongoDB} = require('./connection')

const {logReqRes} = require("./middlewares");

const userRouter = require('./routes/user');

const app = express();
const PORT = 8000;


connectMongoDB('mongodb://localhost:27017/userSchemaPractice');
// middleware

app.use(express.urlencoded({ extended: false }));

app.use(logReqRes('log.txt'));
 
app.use('/user', userRouter);

app.listen(PORT, (req, res) => {
    console.log(`Server started at ${PORT}`)
})