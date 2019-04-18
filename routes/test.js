const Router = require('express')
const router = Router()
var mysql = require('../db/mysql')


router.get('/', function(req,res){
    res.send('Root');
})

router.get('/persons', function(req, res){
    var conn = mysql.connection
    conn.query('SELECT * FROM Persons', function(err, rows, fields) {
        if (!err)
            console.log('The solution is: ', rows);
        else
            console.log('Error while performing Query.', err);
        res.send(rows);
    });
});
module.exports = router