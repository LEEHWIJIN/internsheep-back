const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
require('./db/database_config') //connect db
const std = require('./routes/std')
const mypage = require('./routes/mypage')
const admin = require('./routes/admin')
const auth = require('./routes/auth')
const checktoken = require('./middle/checktoken')
const coMypage = require('./routes/coMypage')
const mail = require('./routes/mail')
const certification = require('./routes/certification')
const company = require('./routes/company')
const app = express()

app.use((req, res, next) =>{
    res.header("Access-Control-Allow-Origin", "*")
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, authorization")
    next()
})


app.use(checktoken.checktoken)
app.get('/', (req, res)=>{
    res.json({
        user: req.user
    })
})


app.use('/auth', auth)
app.use('/std', std)
app.use('/std/mypage', mypage)
app.use('/admin', admin)
app.use('/co/mypage', coMypage)
app.use('/mail', mail)
app.use('/certification', certification)
app.use('/co', company)

module.exports = app