const Router = require('express')
const router = Router()
const mysql = require('../db/database_config.js')
var conn = mysql()

router.post('/resume', function(req, res){
    var sNum = req.body.sNum
    var sName = req.body.sName
    var sql = 'INSERT INTO Resume (sNum, sName) VALUES(?,?)'
    var params = [sNum, sName]

    conn.init().query(sql,params, function(err, rows){
        if(err) console.log(err)
        else {
            console.log(res.insertId)
            res.send(rows)
        }
    })
})

module.exports = router