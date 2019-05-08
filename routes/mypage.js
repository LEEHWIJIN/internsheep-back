const Router = require('express')
const router = Router()
const mysql = require('../db/database_config.js')
var conn = mysql()
let multer = require('multer')
var fs = require("fs")
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './upload/') // cb 콜백함수를 통해 전송된 파일 저장 디렉토리 설정
    },
    filename: function (req, file, cb) {
        console.log(req.body)
        cb(null, req.body.sNum + '-'+file.originalname)
    }
})

var upload = multer({storage: storage})

router.post('/resume', function (req, res) {
    var sNum = req.body.sNum
    var sName = req.body.sName
    var sql = 'INSERT INTO resume (sName, sNum) VALUES(?,?)'
    var params = [sName, sNum]

    conn.init().query(sql, params, function (err, rows) {
        if (err) console.log(err)
        else {
            res.send(rows)
        }
    })
})

router.get('/watchResume', function (req, res) {
    var sql = 'SELECT sName, sNum FROM resume'
    conn.init().query(sql, function (err, rows) {
        var responseData = []
        if (err) console.log(err)
        else {
            for (var i = 0; i < rows.length; i++) {
                if (rows[i].sName == req.query.sName)
                    responseData[0] = rows[i]
            }
            return res.json(responseData)
        }
    })
})

router.post('/modifyResume', function (req, res) {
    var sql = 'UPDATE resume SET sName=?, sNum=? WHERE sName=?'
    var sNum = req.body.sNum
    var sName = req.body.sName
    var params = [sName, sNum, sName]
    conn.init().query(sql, params, function (err, rows) {
        if (err) console.log(err)
        else {
            res.send(rows)
        }
    })
})

router.post('/applyCo', function (req, res) {
    var sql = 'INSERT INTO studentApplyCompany (cName, YN, sName) VALUES(?,?,?)'
    var cName = req.body.cName
    var sName = req.body.sName
    var params = [cName, 0, sName]

    conn.init().query(sql, params, function (err, rows) {
        if (err) console.log(err)
        else {
            res.send(rows)
        }
    })
})

router.get('/applyStatus', function (req, res) {
    var sql = 'SELECT cName, sName, YN FROM studentApplyCompany'
    conn.init().query(sql, function (err, rows) {
        var responseData = []
        if (err) console.log(err)
        else {
            for (var i = 0; i < rows.length; i++) {
                if (rows[i].sName == req.query.sName) {
                    responseData[0] = rows[i]
                }
            }
            if (responseData[0] == null) {
                return res.send(false)
            } else {
                return res.json(responseData)
            }
        }
    })
})

router.post('/postReportAndReview', upload.single('file'), function (req, res) {
    var sql1 = 'INSERT INTO companyReview (cName, starScore, sName) VALUES(?,?,?)'
    var sql2 = 'INSERT INTO report (sName, sNum, reportURL, reportRealName) VALUES(?,?,?,?)'
    var cName = req.body.cName
    var sNum = req.body.sNum
    var sName = req.body.sName
    var starScore = req.body.starScore
    var reportURL = req.file.path
    var reportRealName = req.body.name
    var params1 = [cName, starScore, sName]
    var params2 = [sName, sNum, reportURL, reportRealName]
    conn.init().query(sql2, params2, function (err, rows) {
        if (err) console.log(err)
        else {
            console.log(rows)
        }
    })
    conn.init().query(sql1, params1, function (err, rows) {
        if (err) console.log(err)
        else {
            console.log(rows)
        }
    })
})


router.get('/loadFileName', function (req,res) {
    var sql = 'SELECT reportRealName FROM report WHERE sName = ?'
    var sName = req.query.sName
    conn.init().query(sql, sName, function (err, rows) {
        if(err) console.log(err)
        else{
            if(rows[0]==null){
                res.send('')
            }
            else {
                res.send(rows[0].reportRealName)
            }
        }
     })
})

router.get('/downloadReport', function (req,res) {
    var sql = 'SELECT reportURL FROM report WHERE sName = ?'
    var sName = req.query.sName
    conn.init().query(sql, sName, function (err, rows) {
        if(err) console.log(err)
        else{
            if(rows[0]==null){
                res.send('')
            }
            else {
                res.download(rows[0].reportURL)
            }
        }
    })
})


router.post('/modifyReportAndReview', upload.single('file'), function (req, res) {
    Promise.resolve()
        .then(first)
        .then(second)
        .catch(function (err) {
            console.log('Error', err)
            process.exit()
        })
    var sName = req.body.sName
    function first() {
        return new Promise(function (resolve,reject) {
            var sql0 = 'SELECT reportURL FROM report WHERE sName=?'
            conn.init().query(sql0,sName,function (err,rows) {
                if(err) console.log(err)
                else{
                    fs.unlink(rows[0].reportURL, function (err) {
                        if(err) resolve()
                        else {
                            resolve()
                        }
                    })
                }
            })
        })
    }
   function second() {
       return new Promise(function (resolve, reject) {
           var sql1 = 'UPDATE companyReview SET starScore= ? WHERE sName= ?'
           var sql2 = 'UPDATE report SET reportRealName = ?, reportURL = ? WHERE sName=?'
           var sNum = req.body.sNum
           var starScore = req.body.starScore
           var reportURL = req.file.path
           var reportRealName = req.body.name
           var params1 = [starScore,sName]
           var params2 = [reportRealName, reportURL, sName]
           console.log(params2)
           conn.init().query(sql2, params2, function (err, rows) {
               if (err) console.log(err)
               else {
                   console.log(rows)
               }
           })
           conn.init().query(sql1, params1, function (err, rows) {
               if (err) console.log(err)
               else {
                   console.log(rows)
               }
           })
           resolve()
       })
   }
})

module.exports = router