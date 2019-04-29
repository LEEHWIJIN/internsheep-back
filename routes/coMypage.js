const Router = require('express')
const router = Router()
const mysql = require('../db/database_config.js')
var conn = mysql()

router.post('/writeNotice', function(req, res){
    var cName = req.body.cName
    var cManagerName = req.body.cManagerName
    var sql = 'INSERT INTO CompanyNotice (cName, cManagerName) VALUES(?,?)'
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
router.post('/modifyNotice', function(req, res){
    var cName = req.body.cName
    var cManagerName = req.body.cManagerName
    var sql = 'INSERT INTO CompanyAnnouncement (cName, cManagerName) VALUES(?,?)'
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

module.exports = router