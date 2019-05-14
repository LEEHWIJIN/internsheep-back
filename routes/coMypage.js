const Router = require('express')
const router = Router()
const mysql = require('../db/database_config.js')
var conn = mysql()


router.get('/watchApplyStd', function(req, res) {

    Promise.resolve()
        .then(firstSql)
        .then(secondSql)
        .catch(function (err) {
            console.log('Error', err)
            process.exit()
        })

    function firstSql() {
        var sql = 'SELECT * FROM company, companyNotice WHERE comapany.cID = companyNotice.cID AND cName = ?'
        var cName = req.query.cName
        return new Promise(function (resolve, reject) {
            conn.init().query(sql, cName, function (err, rows) {
                if (err) reject(err)
                else {
                    if(rows.length == 0)
                        res.send('공고가 없음')
                    else
                        resolve(rows[0].cNoticeID)
                }
            })
        })
    }

    function secondSql(cNoticeID) {
        var sql='SELECT* FROM applyNotice WHERE cNoticeId = ? '

        return new Promise(function (resolve, reject) {
            conn.init().query(sql, cNoticeID, function (err, rows) {
                if (err) reject(err)
                else {
                    if(rows.length == 0)
                        res.send('공고 신청을 하지 않았음')
                    else
                    {
                        console.log(rows)
                        resolve(rows[0].applyNoticeID)    
                    }
                }
            })
        })
    }

    function getApplyStd(applyNoticeID)
    {
        var sql = 'SELECT * FROM studentApplyCo WHERE applyNoticeID = ?'
        return new Promise(function (resolve, reject) {
            conn.init().query(sql, applyNoticeID, function (err, rows) {
                if (err) reject(err)
                else {
                    if(rows.length == 0)
                        res.send('신청한 학생이 없음')
                    else
                    {
                        console.log(rows[0].sID)
                        resolve(rows[0].sID)    
                    }
                }
            })
        })
    }
})



router.post('/postApplyStd', function(req, res){
    var sql = 'UPDATE studentApplyCompany SET YN = ? WHERE sName = ?'
    var sName = req.body.sName
    var YN = req.body.YN
    var params = [YN, sName]
    conn.init().query(sql, params, function(err, rows){
        if(err) console.log(err)
        else {
            console.log(rows)
            res.send(rows)
        }
    })
})

module.exports = router