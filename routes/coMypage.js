const Router = require('express')
const router = Router()
const mysql = require('../db/database_config.js')
var conn = mysql()

router.post('/applyNotice', function(req, res) {

    Promise.resolve()
        .then(getApplyTermID)
        .then(getcNoticeID)
        .then(applyNotice)
        .catch(function (err) {
            console.log('Error', err)
            process.exit()
        })

    function getApplyTermID() {
        var sql = 'SELECT * FROM applyTerm WHERE applySemester = ? AND applyOrder = ?'
        var semester = req.body.applySemester
        var order = req.body.applyOrder
        var sqlParams = [semester,order]
        return new Promise(function (resolve, reject) {
            conn.init().query(sql, sqlParams, function (err, rows) {
                if (err) reject(err)
                else {
                    console.log(rows)
                    if (rows.length==0)
                    {
                        res.send('신청할 수 없음')
                    }
                    else
                    {
                        resolve(rows[0].applyTermID)
                    }
                }
            })
        })
    }
    function getcNoticeID(applyTermID)
    {
        if (!applyTermID)
        {
            var params = [0,0]
            resolve(params)
        }
        var sql = "SELECT * FROM companyNotice, company WHERE company.cID = companyNotice.cID AND cName = ?"
        var cName = req.body.cName
        return new Promise(function (resolve, reject) {
            conn.init().query(sql, cName, function (err, rows) {
                if (err) reject(err)
                else {
                    if (rows.length==0)
                    {
                        res.send('공고가 없음')
                        var params = [0,0]
                        resolve(params)
                    }
                    else
                    {
                        console.log(rows)
                        var params =[rows[0].cNoticeID, applyTermID]
                        console.log(params)
                        resolve(params)
                    }
                }
            })
        })  
    }

    function applyNotice(params) {
        console.log(params)
        var sql = 'INSERT INTO applyNotice (cNoticeID, applyTermID, cStatus, applyStdNum) VALUES(?,?,0,0)'
        return new Promise(function (resolve, reject) {
            if (params[0]==0 && params[1]==0)
                resolve(0)
            else
            {
                conn.init().query(sql, params, function (err, rows)    
                {   
                    if (err) reject(err)
                    else {
                        console.log(rows)
                        res.send(rows)
                    }
                })
            }
        })
    }
})



router.get('/showApplyNotice', function(req, res){

    Promise.resolve()
        .then(getApplyTermID)
        .then(getcNoticeID)
        .then(showNoticeID)
        .catch(function (err) {
            console.log('Error', err)
            process.exit()
        })

    function getApplyTermID() {
        var sql = 'SELECT * FROM applyTerm WHERE applySemester = ? AND applyOrder = ?'
        var semester = req.query.applySemester
        var order = req.query.applyOrder
        var sqlParams = [semester,order]

        return new Promise(function (resolve, reject) {
            conn.init().query(sql, sqlParams, function (err, rows) {
                if (err) reject(err)
                else {
                    console.log(rows)
                    if (rows.length==0)
                    {
                        res.send('신청한 공고가 없음')
                    }
                    else
                    {
                        resolve(rows[0].applyTermID)
                    }
                }
            })
        })
    }
    function getcNoticeID(applyTermID)
    {
        if (!applyTermID)
        {
            var params = [0,0]
            resolve(params)
        }
        var sql = "SELECT * FROM companyNotice, company WHERE company.cID = companyNotice.cID AND cName = ?"
        var cName = req.query.cName
        return new Promise(function (resolve, reject) {
            conn.init().query(sql, cName, function (err, rows) {
                if (err) reject(err)
                else {
                    if (rows.length==0)
                    {
                        res.send('신청한 공고가 없음')
                        var params = [0,0]
                        resolve(params)
                    }
                    else
                    {
                        console.log(rows)
                        var params =[rows[0].cNoticeID, applyTermID]
                        console.log(params)
                        resolve(params)
                    }
                }
            })
        })  
    }

    function showNoticeID(params) 
    {
        console.log(params)
        var sql = 'SELECT*FROM applyNotice WHERE cNoticeID = ? AND applyTermID = ?'
        return new Promise(function (resolve, reject) {
            if (params[0]==0 && params[1]==0)
                resolve(0)
            else
            {
                conn.init().query(sql, params, function (err, rows)    
                {   
                    if (err) reject(err)
                    else {
                        console.log(rows)
                        res.send(rows)
                    }
                })
            }
        })
    }
})




router.post('/postApplyStd', function(req, res){
    var sql = 'UPDATE stdApplyCo SET YN = ? WHERE sName = ?'
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

router.get('/showStdAttendence', function(req, res) {

    Promise.resolve()
        .then(findcNoticeID)
        .then(findApplyNoticeID)
        .then(findStudentApplyCompanyID)
        .then(findAttendence)
        .catch(function (err) {
            console.log('Error', err)
            process.exit()
        })

    function findcNoticeID() {
        var sql = 'SELECT* FROM company, companyNotice WHERE company.cID = companyNotice.cID AND cName = ?'
        var cName = req.query.cName

        return new Promise(function (resolve, reject) {
            conn.init().query(sql, cName, function (err, rows) {
                if (err) reject(err)
                else {
                    console.log(rows)
                    resolve(rows[0].cNoticeID)
                }
            })
        })
    }

    function findApplyNoticeID(cNoticeID) {
        var sql='SELECT* FROM applyTerm, applyNotice WHERE applyTerm.applyTermID = applyNotice.applyTermID AND cNoticeID = ? AND applySemester = ?'
        var applySemester = req.query.applySemester
        var sqlParams = [cNoticeID, applySemester]

        return new Promise(function (resolve, reject) {
            conn.init().query(sql, sqlParams, function (err, rows) {
                if (err) reject(err)
                else {
                    console.log(rows)
                    resolve(rows[0].applyNoticeID)
                }
            })
        })
    }

    function findStudentApplyCompanyID(applyNoticeID) {
        var sql='SELECT * FROM stdApplyCo, student WHERE stdApplyCo.sID = student.sID AND applyNoticeID = ? AND sName = ? AND YN = 1'
        var sName = req.query.sName
        var sqlParams = [applyNoticeID, sName]

        return new Promise(function (resolve, reject) {
            conn.init().query(sql, sqlParams, function (err, rows) {
                if (err) reject(err)
                else {
                    console.log(rows)
                    resolve(rows[0].stdApplyCoID)
                }
            })
        })
    }

    function findAttendence(stdApplyCoID) {
        var sql='SELECT* FROM internDetail WHERE stdApplyCoID = ?'

        return new Promise(function (resolve, reject) {
            conn.init().query(sql, stdApplyCoID, function (err, rows) {
                if (err) reject(err)
                else {
                    console.log(rows)
                    res.json(rows)
                    resolve(rows[0].attendence)
                }
            })
        })
    }
    

})

module.exports = router