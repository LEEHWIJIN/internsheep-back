const Router = require('express')
const router = Router()
const mysql = require('../db/database_config.js')
var conn = mysql()

router.post('/writeNotice', function(req, res){
    var cName = req.body.cName
    var cManagerName = req.body.cManagerName
    var sql = 'INSERT INTO companyNotice (cName, cManagerName) VALUES(?,?)'
    var params = [cName, cManagerName]

    conn.init().query(sql, params, function(err, rows)
    {
        if(err) console.log(err)
        else
        {
            console.log(rows)
            res.send(rows)
        }
    })
})

router.get('/watchNotice', function(req, res){
    var cName = req.body.cName
    var sql = 'SELECT * FROM companyNotice where cName = ?'; 
    

    conn.init().query(sql, cName, function(err, rows)
    {
        console.log(cName)
        if(err) console.log(err)
        else
        {
            console.log(rows)
            res.send(rows)
        }
    })
})

router.put('/modifyNotice', function(req, res){
    var cName = req.body.cName

    var getSql = 'SELECT * FROM companyNotice where cName = ?'
    var moSql = 'UPDATE companyNotice SET cName=?, cManagerName=? WHERE cNoticeID = ?'


    conn.init().query(getSql, cName, function(err, rows)
    {
        if(err) console.log(err)
        else
        {
            if(!rows[0])
            {
                console.log('no result')
                res.send(rows)
            }
            else
            {
                var cNoticeID
                var cMoName = req.body.cMoName
                var cMoManagerName = req.body.cMoManagerName
                console.log(rows[0])
                cNoticeID = rows[0].cNoticeID
                console.log(cNoticeID)
                var params = [cMoName, cMoManagerName, cNoticeID]
                
                conn.init().query(moSql, params, function(err, rows)
                {
                
                    if(err) console.log(err)
                    else
                    {
                        console.log(rows)
                        res.send(rows)
                    }
                })
            }
        }
    })

router.get('/watchApplyStd', function(req, res) {

    Promise.resolve()
        .then(firstSql)
        .then(secondSql)
        .catch(function (err) {
            console.log('Error', err)
            process.exit()
        })

    function firstSql() {
        var sql = 'SELECT* FROM studentApplyCompany WHERE cName = ?'
        var cName = req.query.cName
        var sNames = []
        return new Promise(function (resolve, reject) {
            conn.init().query(sql, cName, function (err, rows) {
                if (err) reject(err)
                else {
                    for (var i = 0; i < rows.length; i++) {
                        sNames[i] = rows[i].sName
                    }
                    resolve(sNames)
                }
            })
        })
    }

    function secondSql(sNames) {
        var sql='SELECT* FROM resume WHERE sName = ?'
        var count = 0
        console.log(sNames.length)

        for (var i = 
            0; i < sNames.length; i++) {
            if (count == 0) {
                count++
                continue
            }
            else {
                sql += ' union '
                sql += 'SELECT* FROM resume WHERE sName = ?'
            }
        }

        return new Promise(function (resolve, reject) {
            console.log(sql)
            console.log(sNames)
            conn.init().query(sql, sNames, function (err, rows) {
                if(sNames.length == 0)
                    res.send('no result')
                else if (err) reject(err)
                else {
                    res.json(rows)
                    console.log(rows)
                    resolve(rows)
                }
            })
        })
    }
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