const Router = require('express')
const router = Router()
const mysql = require('../db/database_config.js')
var conn = mysql()


router.get('/list', function(req, res){
    var sql = 'SELECT * FROM applyNotice NATURAL JOIN applyTerm WHERE applySemester =? and applyOrder =?'
    var params = [req.body.applySemester, req.body.applyOrder]
    conn.init().query(sql,params,function(err, rows){
        var responseData= []
        if(err) console.log(err)
        else {
            console.log(rows)
            for (var i = 0; i < rows.length; i++) {
                responseData[i] = rows[i]
            }
            return res.json(responseData)
        }
    })
})

module.exports = router