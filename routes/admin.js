const Router = require('express')
const router = Router()
const mysql = require('../db/database_config.js')
var conn = mysql()


router.post('/postApplyTerm', function(req, res){
    var sql = 'INSERT INTO applyTerm (applyStart, applyEnd, applySemester, applyOrder) VALUES(?,?,?,?)'
    var start = req.body.applyStart.split('.')
    var end = req.body.applyEnd.split('.')
    var endDate = new Date(end[0],end[1]-1, end[2], 32, 59,59)
    var startDate = new Date(start[0],start[1]-1, start[2], 9, 0,0)
    var params = [startDate, endDate, req.body.applySemester, req.body.applyOrder]

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
    var start = req.body.applyStart.split('.')
    var end = req.body.applyEnd.split('.')
    var endDate = new Date(end[0],end[1]-1, end[2], 32, 59,59)
    var startDate = new Date(start[0],start[1]-1, start[2], 9, 0,0)
    var params = [startDate, endDate, req.body.applySemester, Number(req.body.applyOrder), req.body.oldApplySemester, Number(req.body.oldApplyOrder)]
    console.log(params)
    conn.init().query(sql,params,function(err, rows){
        if(err) console.log(err)
        else res.send(rows)
    })
})

router.get('/recentApplyTerm', function(req, res){
    var sql = 'SELECT applyStart, applyEnd, applySemester, applyOrder FROM applyTerm'
    conn.init().query(sql, function(err, rows){
        var responseData= []
        if(err) console.log(err)
        else {
            var n = Date.now()
            var count = 0
            var today = new Date(n + 32400000)
            for (var i = 0; i < rows.length; i++) {
                var start = rows[i].applyStart
                var end = rows[i].applyEnd
                var diff1 = today - start
                var diff2 = end - today
                console.log(diff2)
                var currDay = 24 * 60 * 60 * 1000;// 시 * 분 * 초 * 밀리세컨
                if (parseInt(diff1 / currDay) >= 0 && parseInt(diff2 / currDay) >= 0) {
                    responseData[count] = rows[i]
                    count ++
                }
            }
            return res.json(responseData)
        }
    })
})
module.exports = router