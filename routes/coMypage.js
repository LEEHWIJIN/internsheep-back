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


})

module.exports = router