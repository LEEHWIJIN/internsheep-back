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
    var sql2 = 'SELECT * FROM companyNotice'
    var wantID
    conn.init().query(sql2,function(err, rows){
        if(err) console.log(err)
        else {
            for (var i = 0; i < rows.length; i++) {
                console.log(rows[i].cName)
                if(rows[i].cName == req.body.cName) {
                    wantID = rows[i].cNoticeID
                }
            }

            var sql1 = 'INSERT INTO studentApplyCompany (cNoticeID, cName, YN) VALUES(?,?,?)'
            var cNoticeID = wantID
            var cName = req.body.cName
            var params = [cNoticeID,cName,0]

            conn.init().query(sql1,params, function(err, rows){
                if(err) console.log(err)
                else {
                    console.log(rows)
                    res.send(rows)
                }
            })
        }
    })
})

module.exports = router