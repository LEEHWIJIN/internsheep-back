const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
require('./db/database_config') //connect db

const std = require('./routes/std')
const co = require('./routes/co')
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
app.use('/co', co)

module.exports = app
