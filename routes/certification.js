const Router = require('express')
const router = Router()
const mysql = require('../db/database_config.js')
const mail = require('nodemailer') 
var conn = mysql()


router.post("/mailCertification", function(req,res)
{
    var email
})
