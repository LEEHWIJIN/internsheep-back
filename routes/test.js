const Router = require('express')
const router = Router()
var mysql = require('../db/mysql')

router.get('/', function(req,res){
    res.send('Root');
})

router.get('/persons', function(req, res){
    var conn = mysql.connection
    conn.query('SELECT * from Persons', function(err, rows){
        if(err) console.log(err)

        console.log('The solution is : ', rows)
        res.send(rows)
    })
})

module.exports = router