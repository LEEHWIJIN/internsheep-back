const Router = require('express')
const router = Router()
const mysql = require('../db/database_config.js')
var conn = mysql()


router.post('/applyNotice', function(req, res){
    var getNoticeSql = 'SELECT*FROM companyNotice WHERE cName = ?'
    var isInItApplySql = 'SELECT*FROM applyNotice WHERE cName = ? AND applyOrder = ?'
    var applyNoticeSql = 'INSERT INTO applyNotice (cName, applyOrder) VALUES(?,?)'
    var order = req.body.applyOrder
    var cName = req.body.cName
    var params = [cName,order]
    conn.init().query(getNoticeSql, cName, function(err, rows){
        if(err) console.log(err)
        else {
            console.log(rows)
            if (rows.length == 0)
            {
                console.log('no notice')
                res.send('no notice. please enter the notice')
            }
            else
            {
                conn.init().query(isInItApplySql, params, function(err, rows){
                    if(err) console.log(err)
                    else {
                        if(rows.length==0)
                        {
                            conn.init().query(applyNoticeSql, params, function(err, rows){
                        
                                if(err) console.log(err)
                                else {
                                    console.log(rows)
                                    res.send(rows)
                                }
                            })
                        }
                        else
                        {
                        console.log('already apply!')
                        res.send('already apply!' + rows[0].cName + rows[0].applyOrder)
                        }
                    }
                })
            }
        }
    })
})


router.get('/showApplyNotice', function(req, res){
    var cName = req.query.cName
    var applyOrder = req.query.applyOrder
    var getApplyNoticeSql = 'SELECT*FROM applyNotice WHERE cName = ? AND applyOrder = ?'
    conn.init().query(getApplyNoticeSql,[cName, applyOrder],function(err,rows)
    {
        if(err) console.log(err)
        else
        {
            if(rows.length == 0)
            {
                console.log('no apply notice')
                res.send('no apply notice')
            }
            else
            {
                console.log(rows)
                res.send(rows)
            }
        }
    })
})

module.exports = router