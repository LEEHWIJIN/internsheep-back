const Router = require('Express')
const router = Router()
//const connection = require('../db/mysql')
var mysql = require('mysql');
var conf = require('../constants')
var connection = mysql.createConnection(conf)

router.get('/', function(req,res){
    res.send('Root');
})

router.get('/persons', function(req, res){

    connection.query('SELECT * from Persons', function(err, rows){
        if(err) throw err

        console.log('The solution is : ', rows)
        res.send(rows)
    })
})

module.exports = router