const Router = require('express')
const router = Router()
const mysql = require('../db/database_config.js')
var conn = mysql()


router.post('/postApplyTerm', function(req, res){
    var sql = 'INSERT INTO applyTerm (applyStart, applyEnd, applySemester, applyOrder) VALUES(?,?,?,?)'
    var params = [req.body.applyStart, req.body.applyEnd, req.body.applySemester, req.body.applyOrder]
    conn.init().query(sql,params,function(err, rows){
        if(err) console.log(err)
        else res.send(rows)
    })
})

router.get('/listApplyTerm', function(req, res){
    var sql = 'SELECT applyStart, applyEnd, applySemester, applyOrder FROM applyTerm'
    conn.init().query(sql, function(err, rows){
        var responseData= []
        if(err) console.log(err)
        else {
            for (var i = 0; i < rows.length; i++) {
                responseData[i] = rows[i]
            }
            return res.json(responseData)
        }
    })
})

router.post('/updateApplyTerm', function(req, res){
    var sql = 'UPDATE applyTerm SET applyStart = ?, applyEnd = ?, applySemester =?, applyOrder =? WHERE applySemester =? AND applyOrder = ?'
    var params = [req.body.applyStart, req.body.applyEnd, req.body.applySemester, Number(req.body.applyOrder), req.body.oldApplySemester, Number(req.body.oldApplyOrder)]
    console.log(params)
    conn.init().query(sql,params,function(err, rows){
        if(err) console.log(err)
        else res.send(rows)
    })
})

router.get('/recentApplyTerm', function(req, res){
    var sql = 'SELECT applyStart, applyEnd, applySemester, applyOrder FROM applyTerm'
    conn.init().query(sql, function(err, rows){
        if(err) console.log(err)
        else {
            var listLength = rows.length
            res.json(rows[listLength-1])
        }

    })
})
module.exports = router