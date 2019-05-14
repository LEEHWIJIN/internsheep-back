const express = require('express')
const bodyParser = require('body-parser')
const path = require('path');
require('./db/mongo') //connect db


const aimsLogin = require('./routes/aimsLogin')
const app = express()
app.use('/aimsLogin', aimsLogin)


module.exports = app
