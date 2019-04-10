const express = require('express')
const bodyParser = require('body-parser')
const path = require('path');
require('./db/mongo') //connect db

const resume = require('./routes/resume')


const aimsLogin = require('./routes/aimsLogin')
const app = express()
app.use('/aimsLogin', aimsLogin)

app.use('/resume', resume)


module.exports = app
