const Router = require('express')
const router = Router()
const mysql = require('../db/database_config.js')
var conn = mysql()

router.post('/resume', function(req, res){
    var sNum = req.body.sNum
    var sName = req.body.sName
    var sql = 'INSERT INTO resume (sName, sNum) VALUES(?,?)'
    var params = [sName, sNum]

    conn.init().query(sql,params, function(err, rows) {
        if(err) console.log(err)
        else {
            res.send(rows)
        }
    })
})

router.get('/watchResume', function(req, res){
    var sql = 'SELECT sName, sNum FROM resume'
    conn.init().query(sql, function(err, rows) {
        var responseData = []
        if(err) console.log(err)
        else {
            for(var i = 0; i<rows.length; i++) {
                if (rows[i].sName == req.params.sName)
                    responseData[0] = rows[i]
            }
            return res.json(responseData)
        }
    })
})

router.post('/modifyResume', function(req, res){
    var sql = 'UPDATE resume SET sName=?, sNum=? WHERE sName=?'
    var sNum = req.body.sNum
    var sName = req.body.sName
    var params = [sName, sNum,sName]
    conn.init().query(sql,params, function(err, rows) {
        if(err) console.log(err)
        else {
            res.send(rows)
        }
    })
})

router.post('/applyCo', function(req, res){
    var sql = 'INSERT INTO studentApplyCompany (cName, YN, sName) VALUES(?,?,?)'
    var cName = req.body.cName
    var sName = req.body.sName
    var params = [cName,0,sName]

    conn.init().query(sql,params, function(err, rows){
        if(err) console.log(err)
        else {
            res.send(rows)
        }
    })
})

router.get('/applyStatus', function(req, res){
    var sql = 'SELECT cName, sName, YN FROM studentApplyCompany'
    conn.init().query(sql,function(err, rows){
        var responseData= []
        if(err) console.log(err)
        else {
            for (var i = 0; i < rows.length; i++) {
                if(rows[i].sName == req.query.sName) {
                    responseData[0] = rows[i]
                }
            }
            if(responseData[0]==null){
                console.log('널입니다.')
                return res.send(false)
            }
            else {
                console.log(responseData[0])
                console.log('값이 있습니다.')
                return res.json(responseData)
            }
        }
    })
})

module.exports = router