const Router = require('express')
const router = Router()
const mysql = require('../db/database_config.js')
var conn = mysql()

router.get('/getTag', function(req,res)
{
    var sqlQuery = 'SELECT * FROM tag WHERE tag = ?'
    var tag = req.query.tag
     
    conn.init().query(sqlQuery, tag, function(rows,err)
    {
        if(err) res.send(err)
        else
        {
            res.send(rows)
        }
    })
})

router.post('/addTag', function(req,res)
{
    var sqlQuery = 'INSERT INTO tag (tag) VALUES(?)'
    var tag = req.body.tag
  
    conn.init().query(sqlQuery, tag, function(err, rows)
    {
        if(err)
        {
            console.log(err.code)
            if(err.code =='ER_DUP_ENTRY')
                res.send('1')
            else
                res.send(err)
        }
        else
        {
            console.log(rows)
            res.send('1')
        }
    })
})

module.exports = router