const Router = require('express')
const router = Router()
const mysql = require('../db/database_config.js')
var conn = mysql()


router.get('/list', function(req, res){
    var sql = 'SELECT * FROM companyNotice'
    conn.init().query(sql,function(err, rows){
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

module.exports = router