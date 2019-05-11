const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
require('./db/database_config') //connect db
const std = require('./routes/std')
//const coMypage = require('./routes/coMypage')
const mypage = require('./routes/mypage')
const admin = require('./routes/admin')
const app = express()

app.use((req, res, next) =>{
    res.header("Access-Control-Allow-Origin", "*")
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type")
    next()
})

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'public')));

app.use('/std', std)
//app.use('/co/mypage', coMypage)
app.use('/std/mypage', mypage)
app.use('/admin', admin)


module.exports = app
