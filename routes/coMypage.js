const Router = require('express')
const router = Router()
const mysql = require('../db/database_config.js')
var conn = mysql()



router.get('/checkNotice', function(req,res)
{
    var sql = 'SELECT * FROM company, companyNotice WHERE company.cID = companyNotice.cID AND cLoginID = ?'
    var cLoginID = req.query.cLoginID
    conn.init().query(sql, cLoginID, function(err, rows)
    {
        if(err)res.send(err)
        else
        {
            console.log(rows)
            if(rows.length == 0)
                res.send('0')
            else
                res.send('1')
        }
    })
})

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
        var semester = req.body.data.applySemester
        var order = req.body.data.applyOrder
        var sqlParams = [semester,order]
        return new Promise(function (resolve, reject) {
            conn.init().query(sql, sqlParams, function (err, rows) {
                if (err) reject(err)
                else {
                    console.log(rows)
                    if (rows.length==0)
                    {
                        console.log('신청할 수 없음')
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
        var sql = "SELECT * FROM companyNotice, company WHERE company.cID = companyNotice.cID AND cLoginID = ?"
        var cLoginID = req.body.cLoginID
        return new Promise(function (resolve, reject) {
            conn.init().query(sql, cLoginID, function (err, rows) {
                if (err) reject(err)
                else {
                    if (rows.length==0)
                    {
                        res.send('공고가 없음')
                        console.log('공고가 없음')
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
                        res.send('1')
                    }
                })
            }
        })
    }
})

router.get('/checkApplyNotice', function(req, res)
{
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
        var semester = req.query.applySemester
        var order = req.query.applyOrder
        var sqlParams = [semester,order]
        return new Promise(function (resolve, reject) {
            conn.init().query(sql, sqlParams, function (err, rows) {
                if (err) reject(err)
                else {
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
        var sql = "SELECT * FROM companyNotice, company WHERE company.cID = companyNotice.cID AND cLoginID = ?"
        var cLoginID = req.query.cLoginID
        return new Promise(function (resolve, reject) {
            conn.init().query(sql, cLoginID, function (err, rows) {
                if (err) reject(err)
                else {
                    console.log('2'+ rows)
                    if (rows.length==0)
                    {
                        res.send('공고가 없음')
                        var params = [0,0]
                        resolve(params)
                    }
                    else
                    {
                        console.log('공고있음')
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
        var sql = 'SELECT * FROM applyNotice WHERE cNoticeID = ? AND applyTermID = ?'
        return new Promise(function (resolve, reject) {
            if (params[0]==0 && params[1]==0)
                resolve(0)
            else
            {
                conn.init().query(sql, params, function (err, rows)
                {
                    if (err) reject(err)
                    else {
                        console.log('asasdfsf : '+ rows)
                        if(rows.length == 0)
                            res.send('0')
                        else    
                            res.send('1')
                    }
                })
            }
        })
    }
})

router.post('/writeNotice', function(req, res){
    Promise.resolve()
        .then(getCompanyNotice)
        .then(writeLocation)
        .then(writeCompanyNotice)
        .catch(function (err) {
            console.log('Error', err)
            process.exit()
        })

    function getCompanyNotice() {
        
        var sql = 'SELECT* FROM company WHERE cLoginID = ?'
        var cLoginID = req.body.cLoginID
        //console.log(cLoginID)
        return new Promise(function (resolve, reject) {
            conn.init().query(sql, cLoginID, function (err, rows) {
                if (err) reject(err)
                else
                {
                    resolve(rows[0].cID)
                }
            })
        })
    }    
    function writeLocation (cID)
    {
        var sql = 'UPDATE company SET cLocation = ? WHERE cID = ?'
        var location = req.body.data.cLocation
        var sqlParams = [location, cID]
        return new Promise(function (resolve, reject) {
            conn.init().query(sql, sqlParams, function (err, rows) {
                if (err) reject(err)
                else
                {
                    resolve(cID)
                }
            })
        })
    }
    function writeCompanyNotice(cID) 
    {
        var benefit = req.body.data.cBenefit
        var pay = req.body.data.cPay
        var start = req.body.data.internTermStart.split('-')
        var start2 = start[2].split('T')[0]
        var end = req.body.data.internTermEnd.split('-')
        var end2 =  end[2].split('T')[0]
        var internTermEnd = new Date(end[0],end[1]-1, end2, 23, 59,59)
        var internTermStart = new Date(start[0],start[1]-1, start2, 0, 0,0)
        // var internTermStart = req.body.data.internTermStart
        // var internTermEnd = req.body.data.internTermEnd
        var occupation = req.body.data.cOccupation
        var numOfPeople = req.body.data.cNumOfPeople
        var tag = req.body.data.cTag
        var info = req.body.data.cInfo
        var sql = 'INSERT INTO companyNotice (cID, cBenefit, cPay, internTermStart, internTermEnd, cOccupation, cNumOfPeople, cTag, cInfo) VALUES(?,?,?,?,?,?,?,?,?)'
        var params = [cID,benefit, pay, internTermStart, internTermEnd, occupation, numOfPeople, tag, info]
        console.log(req.body.data.internTermStart.split('-'))
        return new Promise(function (resolve, reject) {
            conn.init().query(sql, params, function (err, rows) {
                if (err) reject(err)
                else {
                        console.log(rows[0])
                        res.send('1')
                        resolve(0)
                }
            })
        })
    }
})

router.get('/watchNotice', function(req, res){
    var cLoginID = req.query.cLoginID
    var sql = 'SELECT * FROM companyNotice, company WHERE company.cID = companyNotice.cID AND cLoginID = ?'
    conn.init().query(sql, cLoginID, function(err, rows)
    {
        console.log(cLoginID)
        if(err) console.log(err)
        else
        {
            console.log(rows)
            res.send(rows)
        }
    })
})

router.post('/modifyNotice', function(req, res)
{
    Promise.resolve()
    .then(getCompanyNotice)
    .then(writeLocation)
    .then(writeCompanyNotice)
    .catch(function (err) {
        console.log('Error', err)
        process.exit()
    })

    function getCompanyNotice() {
        var sql = 'SELECT* FROM company WHERE cLoginID = ?'
        var cLoginID = req.body.cLoginID
        return new Promise(function (resolve, reject) {
            conn.init().query(sql, cLoginID, function (err, rows) {
                if (err) reject(err)
                else
                {
                    console.log(rows.cID)
                    resolve(rows[0].cID)
                }
            })
        })
    }    
    function writeLocation (cID)
    {
        var sql = 'UPDATE company SET cLocation = ? WHERE cID = ?'
        var location = req.body.data.cLocation
        var sqlParams = [location, cID]
        return new Promise(function (resolve, reject) {
            conn.init().query(sql, sqlParams, function (err, rows) {
                if (err) reject(err)
                else
                {
                    console.log(rows)
                    resolve(cID)
                }
            })
        })
    }
    function writeCompanyNotice(cID) 
    {
        var benefit = req.body.data.cBenefit
        var pay = req.body.data.cPay
        var start = req.body.data.internTermStart.split('-')
        var end = req.body.data.internTermEnd.split('-')
        var internTermEnd = new Date(end[0],end[1]-1, end[2], 41, 59,59)
        var internTermStart = new Date(start[0],start[1]-1, start[2], 18, 0,0)
        var occupation = req.body.data.cOccupation
        var numOfPeople = req.body.data.cNumOfPeople
        var tag = req.body.data.cTag
    
        var sql = 'UPDATE companyNotice SET cBenefit = ?, cPay = ?, internTermStart = ?, internTermEnd = ?, cOccupation = ?, cNumOfPeople = ?, cTag = ? WHERE cID = ?'
        var params = [benefit, pay, internTermStart, internTermEnd, occupation, numOfPeople, tag, cID]
    
        return new Promise(function (resolve, reject) {
            conn.init().query(sql, params, function (err, rows) {
                if (err) reject(err)
                else {
                        console.log(rows)
                        res.send('1')
                        resolve(0)
                }
            })
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
        var sql = "SELECT * FROM companyNotice, company WHERE company.cID = companyNotice.cID AND cLoginID = ?"
        var cLoginID = req.query.cLoginID
        return new Promise(function (resolve, reject) {
            conn.init().query(sql, cLoginID, function (err, rows) {
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
        var sql = 'SELECT* FROM company, companyNotice WHERE company.cID = companyNotice.cID AND cLoginID = ?'
        var cLoginID = req.query.cLoginID

        return new Promise(function (resolve, reject) {
            conn.init().query(sql, cLoginID, function (err, rows) {
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

            conn.init().query(sql, sqlParams, function (err, rows) {
                if (err) reject(err)
                else {
                    console.log(rows)
                    resolve(rows[0].stdApplyCoID)
                }
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
router.get('/watchApplyStd', function(req, res) {

    Promise.resolve()
        .then(getApplyTermID)
        .then(getcNoticeID)
        .then(getApplyNoticeID)
        .then(getApplyStd)
        .then(showResumeYN)
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
                        res.send('기간이 없음')
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
        var sql = "SELECT * FROM companyNotice, company WHERE company.cID = companyNotice.cID AND cLoginID = ?"
        var cLoginID = req.query.cLoginID
        return new Promise(function (resolve, reject) {
            conn.init().query(sql, cLoginID, function (err, rows) {
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

    function getApplyNoticeID(params) {
        console.log(params)
        var sql = 'SELECT * FROM applyNotice WHERE cNoticeID = ? AND applyTermID = ?'
        return new Promise(function (resolve, reject) {
            if (params[0]==0 && params[1]==0)
                resolve(0)
            else
            {
                conn.init().query(sql, params, function (err, rows)
                {
                    if (err) reject(err)
                    else {
                        if(rows.length == 0)
                            res.send('공고 신청을 하지 않음')
                        else if(rows[0].cStatus == 2)
                        {
                            console.log('선발 이미 완료')
                            res.send('이미 선발을 완료 하였습니다.')
                        }
                        else
                        {
                            console.log(rows)
                            resolve(rows[0].applyNoticeID)
                        }
                    }
                })
            }
        })
    }

    
    function getApplyStd(applyNoticeID)
    {
        var sql = 'SELECT * FROM stdApplyCo WHERE applyNoticeID = ?'
        return new Promise(function (resolve, reject) {
            conn.init().query(sql, applyNoticeID, function (err, rows) {
                if (err) reject(err)
                else {
                    if(rows.length == 0)
                        res.send('신청한 학생이 없음')
                    else
                    {
                        console.log(rows) 
                        resolve(rows)    
                    }
                }
            })
        })
    }
    
    function showResumeYN(resolvedRows)
    {
        console.log(resolvedRows)
        var sql = 'SELECT * FROM resume, student, stdApplyCo WHERE resume.sID = stdApplyCo.sID AND student.sID = stdApplyCo.sID AND stdApplyCoID = ?'
        var sIDs = new Array()
        sIDs[0] = resolvedRows[0].stdApplyCoID
        var index = 1
        console.log(sIDs)
        for (var i = 0; i < resolvedRows.length-1; i++) {
            sql += ' UNION '
            sql += 'SELECT * FROM resume, student, stdApplyCo WHERE resume.sID = stdApplyCo.sID AND student.sID = stdApplyCo.sID AND stdApplyCoID = ?'
            sIDs[index] = resolvedRows[index].stdApplyCoID
            console.log(sIDs[index])
            index++;
        }

        return new Promise(function (resolve, reject) {
            conn.init().query(sql, sIDs, function (err, rows) {
                if (err) reject(err)
                else 
                {
                    console.log(rows)
                    res.json(rows)
                }
            })
        })
    }
})
router.get('/watchApplyStdNum', function(req, res) {

    Promise.resolve()
        .then(getApplyTermID)
        .then(getcNoticeID)
        .then(getApplyNoticeID)
        .then(getApplyStd)
        .then(showResumeYN)
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
                        res.send('기간이 없음')
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
        var sql = "SELECT * FROM companyNotice, company WHERE company.cID = companyNotice.cID"
        var cLoginID = req.query.cLoginID
        return new Promise(function (resolve, reject) {
            conn.init().query(sql, cLoginID, function (err, rows) {
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

    function getApplyNoticeID(params) {
        console.log(params)
        var sql = 'SELECT * FROM applyNotice WHERE cNoticeID = ? AND applyTermID = ?'
        return new Promise(function (resolve, reject) {
            if (params[0]==0 && params[1]==0)
                resolve(0)
            else
            {
                conn.init().query(sql, params, function (err, rows)
                {
                    if (err) reject(err)
                    else {
                        if(rows.length == 0)
                            res.send('공고 신청을 하지 않음')
                        else
                        {
                            console.log(rows)
                            resolve(rows[0].applyNoticeID)
                        }
                    }
                })
            }
        })
    }

    
    function getApplyStd(applyNoticeID)
    {
        var sql = 'SELECT * FROM stdApplyCo WHERE applyNoticeID = ?'
        return new Promise(function (resolve, reject) {
            conn.init().query(sql, applyNoticeID, function (err, rows) {
                if (err) reject(err)
                else {
                    if(rows.length == 0)
                        res.send('신청한 학생이 없음')
                    else
                    {
                        console.log(rows) 
                        resolve(rows)    
                    }
                }
            })
        })
    }
    
    function showResumeYN(resolvedRows)
    {
        console.log(resolvedRows)
        var sql = 'SELECT * FROM resume, student, stdApplyCo WHERE resume.sID = stdApplyCo.sID AND student.sID = stdApplyCo.sID AND stdApplyCoID = ?'
        var sIDs = new Array()
        sIDs[0] = resolvedRows[0].stdApplyCoID
        var index = 1
        console.log(sIDs)
        for (var i = 0; i < resolvedRows.length-1; i++) {
            sql += ' UNION '
            sql += 'SELECT * FROM resume, student, stdApplyCo WHERE resume.sID = stdApplyCo.sID AND student.sID = stdApplyCo.sID AND stdApplyCoID = ?'
            sIDs[index] = resolvedRows[index].stdApplyCoID
            console.log(sIDs[index])
            index++;
        }

        return new Promise(function (resolve, reject) {
            conn.init().query(sql, sIDs, function (err, rows) {
                if (err) reject(err)
                else 
                {
                    console.log(rows.length)
                    res.json(`"`+rows.length+`"`)
                }
            })
        })
    }
})





router.post('/changeYNApplyStd', function(req, res)
{
    Promise.resolve()
    .then(makeSql1)
    .then(makeSql2)
    .then(makeInternDetail1)
    .then(endRecruitment)
    .then(InternTerm)
        .then(makeInternDetail2)
    .catch(function (err) {
        console.log('Error', err)
        process.exit()
    })

    function makeSql1()
    {
        var sql = 'UPDATE stdApplyCo SET YN = CASE stdApplyCoID '
        var IDandYN = []
        var index = 0;
        while(req.body.data[index])
        {
            sql += 'WHEN ? THEN ? '
            IDandYN[2*index] = req.body.data[index].stdApplyCoID
            IDandYN[2*index + 1] = req.body.data[index].YN
            index++
            console.log(IDandYN)
        }
        return new Promise(function (resolve, reject) 
        {
            var param = []
            IDandYN[2*index] = req.body.data[0].stdApplyCoID
            param[0] = sql
            param[1] = IDandYN
            console.log(param)
            resolve(param)
        })
    }

    function makeSql2(param)
    {
        sql = param[0] + 'ELSE YN END WHERE stdApplyCoID IN (?'
        IDandYN = param[1]
        var index = 1
        while(req.body.data[index])
        {
            sql += ', ?'
            IDandYN[2*req.body.data.length + 1] = req.body.data[index].stdApplyCoID
            index++

        }
        return new Promise(function (resolve, reject)
        {
            sql += ')'
            console.log(sql)
            conn.init().query(sql, IDandYN, function (err, rows) {
                if (err) reject(err)
                else 
                {
                    console.log(rows)
                    resolve()
                }
            })

        })
    }
    function makeInternDetail1()
    {
        var sql = 'SELECT * FROM stdApplyCo WHERE stdApplyCoID = ? AND YN = 1'
        var stdApplyCoIDs = new Array()
        stdApplyCoIDs[0] = req.body.data[0].stdApplyCoID
        var index = 1
        console.log(stdApplyCoIDs)
        while(req.body.data[index])
        {
            sql += ' UNION '
            sql += 'SELECT * FROM stdApplyCo WHERE stdApplyCoID = ? AND YN = 1'
            stdApplyCoIDs[index] = req.body.data[index].stdApplyCoID
            console.log(stdApplyCoIDs[index])
            index++;
        }
        return new Promise(function (resolve, reject) {
            conn.init().query(sql, stdApplyCoIDs, function (err, rows) {
                var stdApplyCoIDs2 = []
                if (err) reject(err)
                else
                {
                    var params = [stdApplyCoIDs, 0]

                    if(rows.length == 0)
                    {
                        resolve(params)
                    }
                    else
                    {
                        console.log(rows[0].stdApplyCoID)
                        var j=0;
                        while(rows[j].stdApplyCoID)
                        {
                            stdApplyCoIDs2[j] =rows[j].stdApplyCoID
                            j++
                            console.log(stdApplyCoIDs2+8080)
                            if(rows.length == j)
                            {
                                params[0] = stdApplyCoIDs2
                                params[1] = 1
                                resolve(params)
                                break 
                            }
                        }
                    }
                }
            })
        })
    }
    function endRecruitment(params)
    {
        var sql1 = 'SELECT * FROM stdApplyCo WHERE stdApplyCoID = ?'
        var sql = 'UPDATE applyNotice SET cStatus = 2 WHERE applyNoticeID = ?'
        console.log(params[0][0])
        return new Promise(function (resolve, reject) {
            if (params[1]==0)
            {}
            else
            {
                conn.init().query(sql1, params[0][0], function(err,rows)
                {
                    if(err) reject(err)
                    else 
                    {
                        conn.init().query(sql, rows[0].applyNoticeID, function (err, rows)
                        {
                            if (err) reject(err)
                            else 
                            {
                                console.log(rows)
                                console.log('endRecruitment')
                                if(params[1] = 0)
                                {
                                    res.send('합격한 학생이 없습니다.')
                                    console.log('합격 음슴')
                                }
                                else
                                    resolve (params[0])
                            }
                        })
                    }
                })
            }
        })
    }

    function InternTerm(stdApplyCoIDs) {
        var sql1 = 'SELECT internTermStart, internTermEnd FROM companyNotice natural join company natural join applyNotice natural join applyTerm where cLoginID =? and applySemester =?'
        var params = [req.body.cLoginID, req.body.applySemester]
        return new Promise(function (resolve, reject) {
            conn.init().query(sql1, params, function (err, rows) {
                if (err) reject(err)
                else {
                    console.log(rows)
                    var internTerm = [rows[0].internTermStart, rows[0].internTermEnd]
                    resolve(stdApplyCoIDs, internTerm)
                }
            })
        })
    }

    function makeInternDetail2(stdApplyCoIDs,internTerm) {
        var sql = 'INSERT INTO internDetail (stdApplyCoID, attendence) VALUES (?,?)'
        var index = 1
        while (stdApplyCoIDs[index]) {
            sql += ', (?,?)'
            index++
        }
        var start = internTerm[0]
        var end = internTerm[1]
        var startYear = start.getFullYear()
        var startDate = start.getDate()
        console.log(startDate)
        var startMonth = start.getMonth()+1
        var diff = end - start
        var currDay = 24 * 60 * 60 * 1000;// 시 * 분 * 초 * 밀리세컨
        var diffDay = parseInt(diff / currDay) + 1
        var index = 0
        var attendenceArray = new Array()
        for (var i = 0; i < diffDay; i++) {
            var plusDate = startDate + index
            var determineYear = startYear
            var determineMonth = startMonth
            if (startMonth == 1 || startMonth == 3 || startMonth == 5 || startMonth == 7 || startMonth == 8 || startMonth == 10 || startMonth == 12) {
                if (plusDate > 31) {
                    if (startYear == 12) {
                        determineYear++
                        determineMonth = 1
                    }
                    else determineMonth++
                    plusDate -= 31
                }
            }
            else if (startMonth == 2) {
                if (startMonth % 4 == 0) {
                    if (plusDate > 29) {
                        determineMonth++
                        plusDate -= 29
                    }
                }

                else {
                    if (plusDate > 28) {
                        determineMonth++
                        plusDate -= 28
                    }
                }
            }
            else {
                if (plusDate > 30) {
                    determineMonth++
                    plusDate -= 30
                }
            }
            var determineDay = determineYear + '-' + determineMonth + '-' + plusDate
            attendenceArray.push({"id" : determineDay, "val" : "출석"})
            index++
        }
        var jsonType = JSON.stringify(attendenceArray)
        var params = new Array()
        for(var z = 0 ; z<stdApplyCoIDs.length ; z++){
            params,push(stdApplyCoIDs[z], jsonType)
        }
        return new Promise(function (resolve, reject) {
            conn.init().query(sql, params, function (err, rows) {
                if (err) reject(err)
                else {
                    resolve(rows)
                    res.send('1')
                }
            })
        })
    }
})

router.get('/showCompanyInfo', function(req, res)
{
    var loginID = req.query.cLoginID
    var sql = 'SELECT * FROM company WHERE cLoginID = ?'
    conn.init().query(sql, loginID, function(err, rows)
    {
        if(err) console.log(err)
        else 
        {
            console.log(rows)
            res.send('1')
        }
    })
})

router.post('/modifyCompanyInfo', function(req, res)
{
    var loginID = req.body.cLoginID
    var sql = 'UPDATE company SET cManagerName = ?, cManagerPhone = ?, cLocation = ?, cCeoPhone = ? WHERE cLoginID = ?'
     
    var managerName = req.body.data.cManagerName
    var managerPhone = req.body.data.cManagerPhone
    var location = req.body.data.datacLocation
    var ceoPhone = req.body.data.cCeoPhone
    var sqlParams = [managerName, managerPhone, location, ceoPhone, loginID]
    conn.init().query(sql, sqlParams, function(err,rows)
    {
        if(err)res.send(err)
        else
        {
            console.log(rows)
            res.send('1')
        }
    })
})
router.post('/endSelection', function(req, res)
{
    Promise.resolve()
    .then(getApplyTermID)
    .then(getcNoticeID)
    .then(endSelection)
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
                    if (rows.length==0)
                    {
                        res.send('모집 상태를 바꿀 수 없음')
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
        var sql = "SELECT * FROM companyNotice, company WHERE company.cID = companyNotice.cID AND cLoginID = ?"
        var cLoginID = req.query.cLoginID
        return new Promise(function (resolve, reject) {
            conn.init().query(sql, cLoginID, function (err, rows) {
                if (err) reject(err)
                else {
                    console.log('2'+ rows)
                    if (rows.length==0)
                    {
                        res.send('공고가 없음')
                        var params = [0,0]
                        resolve(params)
                    }   
                    else
                    {
                        console.log('공고있음')
                        var params =[rows[0].cNoticeID, applyTermID]
                        console.log(params)
                        resolve(params)
                    }
                }   
            })
        })
    }

    function endSelection(params) {
        console.log(params)
        var sql = 'UPDATE applyNotice SET cStatus = 2 WHERE cNoticeID = ? AND applyTermID = ?'
        return new Promise(function (resolve, reject) {
            if (params[0]==0 && params[1]==0)
                resolve(0)
            else
            {
                conn.init().query(sql, params, function (err, rows)
                {
                    if (err) reject(err)
                    else {
                        console.log('asasdfsf : '+ rows)
                        if(rows.length == 0)
                            res.send('0')
                        else    
                            res.send('1')
                    }
                })
            }
        })
    }
})

router.get('/loadHiredStd', function(req, res)
{
    var cLoginID = req.query.cLoginID
    var applySemester = req.query.applySemester
    var sql = 'SELECT * FROM company NATURAL JOIN companyNotice NATURAL JOIN applyNotice NATURAL JOIN applyTerm NATURAL JOIN stdApplyCo NATURAL JOIN internDetail WHERE cLoginID = ? and applySemester =?'
    var params = [cLoginID, applySemester]
    conn.init().query(sql, params, function(err, rows)
    {
        if(err) console.log(err)
        else
        {
            console.log(rows)
            res.send(rows)
        }
    })
})

router.post('/changeAttend', function(req, res)
{
    Promise.resolve()
        .then(first)
        .then(second)
        .catch(function (err) {
            console.log('Error', err)
            process.exit()
        })

    function first() {
        var sql = 'SELECT internID, attendence FROM student natural join stdApplyCo natural join applyNotice natural join applyTerm natural join internDetail WHERE sLoginID=? and applySemester = ?'
        var applySemester = req.body.applySemester
        var sLoginID = req.body.sLoginID
        var params = [sLoginID, applySemester]
        return new Promise(function (resolve, reject) {
            conn.init().query(sql, params, function (err, rows) {
                if (err) reject(err)
                else {
                    resolve(rows[0])
                }
            })
        })
    }
    function second(data)
    {
        console.log(data)
        var sql = "UPDATE internDetail set attendence =? where internID = ?"
        var beforeAttendence = JSON.parse(data.attendence)
        var afterAttendence = new Array()
        for(var i =0 ;i<beforeAttendence.length ; i++){
            if(beforeAttendence[i].id == req.body.id){
                afterAttendence.push({"id" : beforeAttendence[i].id, "val" : req.body.val})
            }
            else afterAttendence.push({"id" : beforeAttendence[i].id, "val" : "출석"})
        }
        var jsonType = JSON.stringify(afterAttendence)
        console.log(jsonType)
        var params = [jsonType,data.internID]
        return new Promise(function (resolve, reject) {
            conn.init().query(sql, params, function (err, rows) {
                if (err) console.log(err)
                else {
                    console.log(rows)
                    resolve(rows)
                  res.send('1')
                }
            })
        })
    }
})

module.exports = router
