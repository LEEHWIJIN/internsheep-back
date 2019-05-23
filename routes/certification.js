const Router = require('express')
const router = Router()
const mysql = require('../db/database_config.js')
const nodemail = require('../certification/eamil_config')
const mailInfo = require('../certification/email').test
var mailing = nodemail()
var conn = mysql()


router.get("/confirm", function(req,res)
{
    Promise.resolve()
        .then(confirm1)
        .then(confirm2)
        .catch(function (err) {
            console.log('Error', err)
            process.exit()
        })

    function confirm1()
    {
        var sql = 'SELECT * FROM student WHERE sLoginID = ? AND certificationKey = ?'
        var key = req.query.certificationKey
        var ID = req.query.sLoginID
        var sqlParams = [ID, key]
        console.log(sqlParams)
        return new Promise(function (resolve, reject) {
            conn.init().query(sql, sqlParams, function (err, rows) {
                if (err) reject(err)
                else {
                    console.log(rows)
                    resolve(rows[0].cLoginID)
                }
            })
        })
    }
    function confirm2(cLoginID)
    {
        var sql = 'UPDATE student SET certification = 1 WHERE sLoginID = ?'
        var ID = req.query.sLoginID

        return new Promise(function (resolve, reject) {
            conn.init().query(sql, ID, function (err, rows) {
                if (err) reject(err)
                else {
                    console.log(rows)
                    res.send('인증완료')
                }
            })
        })
    }


})

module.exports = router