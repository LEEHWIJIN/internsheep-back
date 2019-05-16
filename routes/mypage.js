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

    var sql = 'SELECT sID FROM student WHERE sLoginID=?'
    var sLoginID = req.body.sLoginID
    conn.init().query(sql, sLoginID,function (err, rows) {
        if (err) console.log(err)
        else {
            var sID =  rows[0].sID
            var programmingLang = `{ `
            programmingLang += `"Javascript" : `+ req.body.Javascript + `,`
            programmingLang += `"HTML" : ` + req.body.HTML + `,`
            programmingLang += `"CSS" : `+ req.body.CSS + `,`
            programmingLang += `"jQuery" : `+ req.body.jQuery + `,`
            programmingLang += `"SQL": ` + req.body.SQL + `,`
            programmingLang += `"Java": ` + req.body.Java + `,`
            programmingLang += `"AndroidJava": `+req.body.AndroidJava + `,`
            programmingLang += `"Swift": ` + req.body.Swift + `,`
            programmingLang += `"Objective": ` + req.body.Objective `,`
            programmingLang += `"Python": `+ req.body.Python+ `,`
            programmingLang +=  `"PHP": `+req.body.PHP +`,`
            programmingLang +=  `"C": `+req.body.C+`,`
            programmingLang += `"Microsoft": `+req.body.Microsoft+`,`
            programmingLang += `"Kotlin": `+req.body.Kotlin+`,`
            programmingLang += `"Peral": `+req.body.Peral+`,`
            programmingLang += `"R": `+ req.body.R +`,`
            programmingLang += `"VBA": `+req.body.VBA + `}`

            var frameworkLang = `{`
                frameworkLang += `"Nodejs" : `+req.body.Nodejs+`,`
                frameworkLang += `"Angular" : `+ req.body.Angular+`,`
                frameworkLang += `"React" : `+ req.body.React+`,`
                frameworkLang += `"Expressjs" : `+ req.body.Expressjs+`,`
                frameworkLang += `"NetCore" : `+req.body.NetCore+`,`
                frameworkLang += `"Spring" : `+ req.body.Spring+`,`
                frameworkLang += `"Django" : `+ req.body.Django+`,`
                frameworkLang += `"Flask" :`+req.body.Flask+`,`
                frameworkLang += `"Cordova" : `+ req.body.Cordova +`}`

            var databaseLang = `{`
                databaseLang += `"MySql" : ` +req.body.MySql + `,`
                databaseLang += `"SQLServer" : `+req.body.SQLServer + `,`
                databaseLang += `"MongoDB" : `+req.body.MongoDB + `,`
                databaseLang += `"SQLite" : `+req.body.SQLite + `,`
                databaseLang += `"Redis" : `+req.body.Redis + `,`
                databaseLang += `"Oracle" : `+req.body.Oracle + `,`
                databaseLang += `"Flask" : `+req.body.Flask + `,`
                databaseLang += `"Cordova" : `+req.body.Cordova+`}`

            var cloudLang = `{`
                cloudLang += `"AWS" : `+req.body.AWS+ `,`
                cloudLang += `"Azure" : `+req.body.Azure+ `,`
                cloudLang += `"GCP" : `+req.body.GCP+ `,`
                cloudLang += `"Linux" : `+req.body.Linux+ `,`
                cloudLang += `"Wordpress" : `+req.body.Wordpress+ `,`
                cloudLang += `"RaspberryPi" : `+req.body.RaspberryPi+ `,`
                cloudLang += `"Arduino" : `+req.body.Arduino+ `,`
                cloudLang += `"Firebase" : `+req.body.Firebase+ `,`
                cloudLang += `"Docker" : `+req.body.Docker+ `,`
                cloudLang += `"Go" : `+req.body.Go+`}`

            var machineLang = `{`
                machineLang += `"Tensorflow" : `+req.body.Tensorflow+ `,`
                machineLang += `"Caffe" : `+req.body.Caffe+ `,`
                machineLang += `"OpenCV" : `+req.body.OpenCV+ `,`
                machineLang += `"DLib" : `+req.body.DLib+ `,`
                machineLang += `"OpenGL" : `+req.body.OpenGL+ `,`
                machineLang += `"Unity" : `+req.body.Unity+`,`
                machineLang += `"Arduino" : `+req.body.Arduino+ `,`
                machineLang += `"Firebase" : `+req.body.Firebase+`}`

            var sScore = `{`
                sScore += `"computerprogramming" : `+req.body.computerprogramming+ `,`
                sScore += `"discretemath" : `+req.body.discretemath+ `,`
                sScore += `"datastructure" : `+req.body.datastructure+ `,`
                sScore += `"objectiveprogramming" : `+req.body.objectiveprogramming+ `,`
                sScore += `"computerstructure" : `+req.body.computerstructure+ `,`
                sScore += `"algorithm" : `+req.body.algorithm+ `,`
                sScore += `"systemprogramming" : `+req.body.systemprogramming+ `,`
                sScore += `"os" : `+req.body.os+ `,`
                sScore +=  `"database" : `+req.body.database+ `,`
                sScore += `"network" : `+req.body.network+`}`

            var sPhone = req.body.sPhone
            var sHope = req.body.sHope
            var sEnglish = req.body.sEnglish

            var sql2 = 'INSERT INTO resume (sID, programmingLang, frameworkLang, databaseLang, cloudLang, machineLang, sScore, sPhone, sHope, sEnglish) VALUES(?,?,?,?,?,?,?,?,?,?)'
            var params2 = [sID, programmingLang, frameworkLang, databaseLang, cloudLang, machineLang, sScore, sPhone, sHope, sEnglish]
            conn.init().query(sql2, params2, function (err, rows) {
                if (err) console.log(err)
                else {
                    res.send(rows)
                }
            })
        }
    })
})

router.get('/watchResume', function (req, res) {
    var sql = 'SELECT * FROM resume NATURAL JOIN student WHERE student.sLoginID = ?'
    var sLoginID = req.query.sLoginID
    conn.init().query(sql, sLoginID, function (err, rows) {
        if (err) console.log(err)
        else {
            if(rows[0] == null)
                res.send(0)
            else {
                return res.json(rows[0])
            }
        }
    })
})

router.post('/modifyResume', function (req, res) {
    var sql = 'SELECT sID FROM student WHERE sLoginID = ?'
    var sLoginID = req.body.sLoginID

    conn.init().query(sql, sLoginID, function (err, rows) {
        if(err) console.log(err)
        else {
            var sID = rows[0].sID
            var programmingLang = `{ `
            programmingLang += `"Javascript" : `+ req.body.Javascript + `,`
            programmingLang += `"HTML" : ` + req.body.HTML + `,`
            programmingLang += `"CSS" : `+ req.body.CSS + `,`
            programmingLang += `"jQuery" : `+ req.body.jQuery + `,`
            programmingLang += `"SQL": ` + req.body.SQL + `,`
            programmingLang += `"Java": ` + req.body.Java + `,`
            programmingLang += `"AndroidJava": `+req.body.AndroidJava + `,`
            programmingLang += `"Swift": ` + req.body.Swift + `,`
            programmingLang += `"Objective": ` + req.body.Objective `,`
            programmingLang += `"Python": `+ req.body.Python+ `,`
            programmingLang +=  `"PHP": `+req.body.PHP +`,`
            programmingLang +=  `"C": `+req.body.C+`,`
            programmingLang += `"Microsoft": `+req.body.Microsoft+`,`
            programmingLang += `"Kotlin": `+req.body.Kotlin+`,`
            programmingLang += `"Peral": `+req.body.Peral+`,`
            programmingLang += `"R": `+ req.body.R +`,`
            programmingLang += `"VBA": `+req.body.VBA + `}`

            var frameworkLang = `{`
            frameworkLang += `"Nodejs" : `+req.body.Nodejs+`,`
            frameworkLang += `"Angular" : `+ req.body.Angular+`,`
            frameworkLang += `"React" : `+ req.body.React+`,`
            frameworkLang += `"Expressjs" : `+ req.body.Expressjs+`,`
            frameworkLang += `"NetCore" : `+req.body.NetCore+`,`
            frameworkLang += `"Spring" : `+ req.body.Spring+`,`
            frameworkLang += `"Django" : `+ req.body.Django+`,`
            frameworkLang += `"Flask" :`+req.body.Flask+`,`
            frameworkLang += `"Cordova" : `+ req.body.Cordova +`}`

            var databaseLang = `{`
            databaseLang += `"MySql" : ` +req.body.MySql + `,`
            databaseLang += `"SQLServer" : `+req.body.SQLServer + `,`
            databaseLang += `"MongoDB" : `+req.body.MongoDB + `,`
            databaseLang += `"SQLite" : `+req.body.SQLite + `,`
            databaseLang += `"Redis" : `+req.body.Redis + `,`
            databaseLang += `"Oracle" : `+req.body.Oracle + `,`
            databaseLang += `"Flask" : `+req.body.Flask + `,`
            databaseLang += `"Cordova" : `+req.body.Cordova+`}`

            var cloudLang = `{`
            cloudLang += `"AWS" : `+req.body.AWS+ `,`
            cloudLang += `"Azure" : `+req.body.Azure+ `,`
            cloudLang += `"GCP" : `+req.body.GCP+ `,`
            cloudLang += `"Linux" : `+req.body.Linux+ `,`
            cloudLang += `"Wordpress" : `+req.body.Wordpress+ `,`
            cloudLang += `"RaspberryPi" : `+req.body.RaspberryPi+ `,`
            cloudLang += `"Arduino" : `+req.body.Arduino+ `,`
            cloudLang += `"Firebase" : `+req.body.Firebase+ `,`
            cloudLang += `"Docker" : `+req.body.Docker+ `,`
            cloudLang += `"Go" : `+req.body.Go+`}`

            var machineLang = `{`
            machineLang += `"Tensorflow" : `+req.body.Tensorflow+ `,`
            machineLang += `"Caffe" : `+req.body.Caffe+ `,`
            machineLang += `"OpenCV" : `+req.body.OpenCV+ `,`
            machineLang += `"DLib" : `+req.body.DLib+ `,`
            machineLang += `"OpenGL" : `+req.body.OpenGL+ `,`
            machineLang += `"Unity" : `+req.body.Unity+`,`
            machineLang += `"Arduino" : `+req.body.Arduino+ `,`
            machineLang += `"Firebase" : `+req.body.Firebase+`}`

            var sScore = `{`
            sScore += `"computerprogramming" : `+req.body.computerprogramming+ `,`
            sScore += `"discretemath" : `+req.body.discretemath+ `,`
            sScore += `"datastructure" : `+req.body.datastructure+ `,`
            sScore += `"objectiveprogramming" : `+req.body.objectiveprogramming+ `,`
            sScore += `"computerstructure" : `+req.body.computerstructure+ `,`
            sScore += `"algorithm" : `+req.body.algorithm+ `,`
            sScore += `"systemprogramming" : `+req.body.systemprogramming+ `,`
            sScore += `"os" : `+req.body.os+ `,`
            sScore +=  `"database" : `+req.body.database+ `,`
            sScore += `"network" : `+req.body.network+`}`
            var sPhone = req.body.sPhone
            var sHope = req.body.sHope
            var sEnglish = req.body.sEnglish
            var sql2 = 'UPDATE resume SET programmingLang = ?, frameworkLang=?, databaseLang=?, cloudLang=?, machineLang=?, sScore=?, sPhone=?, sHope=?, sEnglish=? WHERE sID = ?'
            var params = [programmingLang, frameworkLang, databaseLang, cloudLang, machineLang, sScore, sPhone, sHope, sEnglish, sID]

            conn.init().query(sql2, params, function (err, rows) {
                if (err) console.log(err)
                else {
                    res.send(rows)
                }
            })
        }
    })
})

router.post('/applyCo', function (req, res) {

    Promise.resolve()
        .then(first)
        .then(second)
        .then(three)
        .then(four)
        .catch(function (err) {
            console.log('Error', err)
            process.exit()
        })

    function first() {
        var sql1 =  'SELECT sID FROM student WHERE sLoginID = ?'
        var params1 =  [req.body.sLoginID]
        return new Promise(function (resolve,reject) {
            conn.init().query(sql1, params1, function (err,rows) {
                if(err) console.log(err)
                else {
                    var data = []
                    data[0]=rows[0].sID
                    console.log(data)
                    resolve(data)
                }
            })
        })
    }

    function second(data) {
        var sql2 = 'SELECT applyNoticeID, applyStdNum FROM applyNotice NATURAL JOIN companyNotice NATURAL JOIN company NATURAL JOIN applyTerm WHERE cName = ? and applySemester = ? and applyOrder =?'
        var params2 = [req.body.cName, req.body.applySemester, req.body.applyOrder]
        return new Promise(function (resolve,reject) {
            conn.init().query(sql2,params2, function (err, rows) {
                if(err) console.log(err)
                else{
                    data[1] = rows[0].applyNoticeID
                    data[2] = rows[0].applyStdNum
                    console.log(data)
                    resolve(data)
                }
            })
        })
    }

    function four(data) {
        return new Promise(function (resolve,reject) {
        var sql3 = 'INSERT INTO stdApplyCo (applyNoticeID, YN, sID) VALUES(?,?,?)'
        var sID = data[0]
        var applyNoticeID =  data[1]
        var params3 = [applyNoticeID, 0, sID]

        conn.init().query(sql3, params3, function (err, rows) {
            if (err) console.log(err)
            else {
                res.send(rows)
                resolve(data)
            }
        })
        })
    }
    function three(data) {
        return new Promise(function (resolve,reject) {
            var sql4 = 'UPDATE applyNotice SET applyStdNum = ? WHERE applyNoticeID = ?'
            var applyStdNum =  data[2] + 1
            var applyNoticeID =  data[1]
            var params4 = [applyStdNum, applyNoticeID]

            conn.init().query(sql4, params4, function (err, rows) {
                if (err) console.log(err)
                else {
                    resolve(rows)
                }
            })
        })
    }
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
