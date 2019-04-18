const Router = require('express')
const router = Router()
const mysql = require('../db/database_config.js')
var conn = mysql()

router.get('/persons', function(req, res){
    conn.init().query('SELECT * from Persons', function(err, rows){
        if(err) console.log(err)

        console.log('The solution is : ', rows)
        res.send(rows)
    })
})

module.exports = router