const Router = require('express')
const router = Router()
const mysql = require('../db/database_config.js')
var conn = mysql()


router.get('/list', function(req, res){
    var sql = 'SELECT * FROM applyTerm at NATURAL JOIN applyNotice an NATURAL JOIN companyNotice cn NATURAL JOIN company co WHERE at.applySemester =? and at.applyOrder =?'
    var params = [req.query.applySemester, req.query.applyOrder]
    conn.init().query(sql,params,function(err, rows){
        var responseData= []
        if(err) console.log(err)
        else {
            for (var i = 0; i < rows.length; i++) {
                responseData[i] = rows[i]
            }
            console.log(responseData)
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

module.exports = router
