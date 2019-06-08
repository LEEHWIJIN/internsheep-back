const Router = require('express')
const router = Router()
const mysql = require('../db/database_config.js')
var conn = mysql()

router.get('/list', function(req, res){
    var sql = 'SELECT * FROM applyTerm at NATURAL JOIN applyNotice an NATURAL JOIN companyNotice cn NATURAL JOIN company co WHERE at.applySemester =? and at.applyOrder =? and cStatus = 0'
    var params = [req.query.applySemester, req.query.applyOrder]
    conn.init().query(sql,params,function(err, rows){
        var responseData= []
        if(err) console.log(err)
        else {
            for (var i = 0; i < rows.length; i++) {
                if(rows[i].internTermStart) {
                    var startYear = rows[i].internTermStart.getFullYear()
                    var startMonth = rows[i].internTermStart.getMonth() + 1
                    var startDate = rows[i].internTermStart.getDate()
                    var start = startYear + '-' + startMonth + '-' + startDate
                    rows[i].internTermStart = start
                }
                if(rows[i].internTermEnd){
                    var endYear = rows[i].internTermEnd.getFullYear()
                    var endMonth = rows[i].internTermEnd.getMonth()+1
                    var endDate = rows[i].internTermEnd.getDate()
                    var end =  endYear+'-'+endMonth+'-'+endDate
                    rows[i].internTermEnd = end
                }
                responseData[i] = rows[i]
                console.log(responseData[i].internTermStart)

            }

            return res.json(responseData)
        }
    })
})

router.get('/wantList', function(req, res){
    var sql = 'SELECT cn.cBenefit, cn.cPay, cn.internTermStart, cn.internTermEnd, cn.cOccupation, cn.cNumOfPeople, cn.cTag, co.cName, co.cManagerName, co.cManagerPhone, co.cImage, co.cLocation FROM applyTerm at NATURAL JOIN applyNotice an NATURAL JOIN companyNotice cn NATURAL JOIN company co WHERE an.applySemester =? and an.applyOrder =? and co.cName=?'
    var params = [req.body.applySemester, req.body.applyOrder, req.body.cName]
    conn.init().query(sql,params,function(err, rows){
        if(err) console.log(err)
        else {
            return res.json(rows[0])
        }
    })
})

router.get('/loadCoReview', function(req, res){
    var sql = 'SELECT cName, starScore, reviewTitle, reviewContent, internTermStart, internTermEnd FROM company NATURAL JOIN stdApplyCo NATURAL JOIN applyNotice NATURAL JOIN companyNotice NATURAL JOIN internDetail NATURAL JOIN companyReview WHERE cName = ?'
    var params = [req.query.cName]
    conn.init().query(sql,params,function(err, rows){
        if(err) console.log(err)
        else {
            if(rows[0]==null){
                res.send('0')
            }
            else {
                for (var i = 0; i < rows.length; i++) {
                    if(rows[i].internTermStart) {
                        var startYear = rows[i].internTermStart.getFullYear()
                        var startMonth = rows[i].internTermStart.getMonth() + 1
                        var startDate = rows[i].internTermStart.getDate()
                        var start = startYear + '-' + startMonth + '-' + startDate
                        rows[i].internTermStart = start
                    }
                    if(rows[i].internTermEnd){
                        var endYear = rows[i].internTermEnd.getFullYear()
                        var endMonth = rows[i].internTermEnd.getMonth()+1
                        var endDate = rows[i].internTermEnd.getDate()
                        var end =  endYear+'-'+endMonth+'-'+endDate
                        rows[i].internTermEnd = end
                    }
                }
                return res.json(rows)
            }
        }
    })
})

module.exports = router
