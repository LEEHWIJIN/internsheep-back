const Router = require('express')
const router = Router()
const mysql = require('../db/database_config.js')
var conn = mysql()

router.post('/resume', function(req, res){
    var sNum = req.body.sNum
    var sName = req.body.sName
    var sql = 'INSERT INTO Resume (sNum, sName) VALUES(?,?)'
    var params = [sNum, sName]

    conn.init().query(sql,params, function(err, rows) {
        if(err) console.log(err)
        else {
            console.log(rows)
            res.send(rows)
        }
    })
})

router.post('/applyCo', function(req, res){
    var sql = 'INSERT INTO Resume (cName, YN) VALUES(?,?)'
    var sNum = req.body.sNum
    var sName = req.body.sName
    var params = [sNum, sName]

    conn.init().query(sql,params, function(err, rows){
        if(err) console.log(err)
        else {
            console.log(rows)
            res.send(rows)
        }
    })
})

module.exports = router