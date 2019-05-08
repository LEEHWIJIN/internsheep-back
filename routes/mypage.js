const Router = require('express')
const router = Router()
const mysql = require('../db/database_config.js')
var conn = mysql()
let multer = require('multer')
var fs = require("fs")
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './routes/upload/') // cb 콜백함수를 통해 전송된 파일 저장 디렉토리 설정
    },
    filename: function (req, file, cb) {
        cb(null, req.body.sName + '-' + file.originalname) // cb 콜백함수를 통해 전송된 파일 이름 설정
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
    var sql2 = 'INSERT INTO report (sName, reportContent) VALUES(?,?)'
    var cName = req.body.cName
    var sName = req.body.sName
    var starScore = req.body.starScore
    var before = req.file.path

    var after = before.split('\\')
    var afterLength = after.length
    var reportContent = after[afterLength - 1]
    var params1 = [cName, starScore, sName]
    var params2 = [sName, reportContent]
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

router.get('/downloadReport', function (req, res) {
    var sql = 'SELECT reportContent FROM report WHERE sName = ?'
    var sName = req.query.sName

    conn.init().query(sql, sName, function (err, rows) {
        if (err) console.log(err)
        else {
            var filePath = __dirname + '\\upload\\' + rows[0].reportContent
            var arr = rows[0].reportContent.split('-')
            var fileName = arr[1]
            console.log(fileName)
            var data = {
                "filePath": encodeURIComponent(filePath),
                "fileName": fileName
            }
            res.json(data)
            //
            // console.log(filePath)
            // var arr = before.split("-")
            // var originName = arr[1]
            // var fileName = originName
            // res.setHeader("Content-Disposition", "attachment;filename =" +encodeURI(fileName))
            // res.setHeader("Content-Type","binary/octet-stream")
            // var fileStream = fs.createReadStream(filePath)
            // fileStream.pipe(res)
        }
    })
})


router.get('/testDownload', function (req, res) {

    var file = '/Users/kakao/Downloads/thankyou.png';
    res.download(file); // Set disposition and send it.

})

router.post('/modifyReportAndReview', function (req, res) {
    var sql1 = 'UPDATE companyReview SET starScore=? WHERE sName=?'
    var sName = req.body.sName
    var starScore = req.body.starScore
    var params1 = [starScore, sName]

    conn.init().query(sql1, params1, function (err, rows) {
        if (err) console.log(err)
        else {
            console.log(rows)
            res.send(rows)
        }
    })
})

router.get('/watchReportAndReview', function (req, res) {
    var sql = 'SELECT cName, sName, starScore FROM companyReview'
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

module.exports = router