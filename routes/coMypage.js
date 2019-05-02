const Router = require('express')
const router = Router()
const mysql = require('../db/database_config.js')
var conn = mysql()


router.get('/watchApplyStd', function(req, res){
    var sql = 'SELECT*FROM studentApplyCompany WHERE cName = ?'
    var cName = req.body.cName
    conn.init().query(sql, cName, function(err, rows){
        if(err) console.log(err)
        else {
            console.log(rows)
            res.send(rows)
        }
    })
})

router.post('/postApplyStd', function(req, res){
    var sql = 'UPDATE studentApplyCompany SET YN = ? WHERE sName = ?'
    var sName = req.body.sName
    var YN = req.body.YN
    var params = [YN, sName]
    conn.init().query(sql, params, function(err, rows){
        if(err) console.log(err)
        else {
            console.log(rows)
            res.send(rows)
        }
    })
})

module.exports = router