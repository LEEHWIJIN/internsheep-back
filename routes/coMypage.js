const Router = require('express')
const router = Router()
const mysql = require('../db/database_config.js')
var conn = mysql()

var sql = 'INSERT INTO Resume VALUES(?,?)'
router.get('/resume', function(req, res){
    conn.init().query(sql,[res.sName, res.sNum], function(err, rows){
        if(err) console.log(err)
        else {
            console.log(res.insertId)
            res.send(rows)
        }
    })
})

module.exports = router