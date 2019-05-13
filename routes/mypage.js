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
    var sLoginID = req.body.req.sLoginID
    conn.init().query(sql, sLoginID,function (err, rows) {
        if (err) console.log(err)
        else {
            var sID =  rows[0].sID
            var programmingLang = `{ `
            programmingLang += `"Javascript" : `+ req.body.req.Javascript[0] + `,`
            programmingLang += `"HTML" : ` + req.body.req.HTML[0] + `,`
            programmingLang += `"CSS" : `+ req.body.req.CSS[0] + `,`
            programmingLang += `"jQuery" : `+ req.body.req.jQuery[0] + `,`
            programmingLang += `"SQL": ` + req.body.req.SQL[0] + `,`
            programmingLang += `"Java": ` + req.body.req.Java[0] + `,`
            programmingLang += `"AndroidJava": `+req.body.req.AndroidJava[0] + `,`
            programmingLang += `"Swift": ` + req.body.req.Swift[0] + `,`
            programmingLang += `"Objective": ` + req.body.req.Objective[0] `,`
            programmingLang += `"Python": `+ req.body.req.Python[0]+ `,`
            programmingLang +=  `"PHP": `+req.body.req.PHP[0] +`,`
            programmingLang +=  `"C": `+req.body.req.C[0]+`,`
            programmingLang += `"Microsoft": `+req.body.req.Microsoft[0]+`,`
            programmingLang += `"Kotlin": `+req.body.req.Kotlin[0]+`,`
            programmingLang += `"Peral": `+req.body.req.Peral[0]+`,`
            programmingLang += `"R": `+ req.body.req.R[0] +`,`
            programmingLang += `"VBA": `+req.body.req.VBA[0] + `}`

            var frameworkLang = `{`
                frameworkLang += `"Nodejs" : `+req.body.req.Nodejs[0]+`,`
                frameworkLang += `"Angular" : `+ req.body.req.Angular[0]+`,`
                frameworkLang += `"React" : `+ req.body.req.React[0]+`,`
                frameworkLang += `"Expressjs" : `+ req.body.req.Expressjs[0]+`,`
                frameworkLang += `"NetCore" : `+req.body.req.NetCore[0]+`,`
                frameworkLang += `"Spring" : `+ req.body.req.Spring[0]+`,`
                frameworkLang += `"Django" : `+ req.body.req.Django[0]+`,`
                frameworkLang += `"Flask" :`+req.body.req.Flask[0]+`,`
                frameworkLang += `"Cordova" : `+ req.body.req.Cordova[0] +`}`

            var databaseLang = `{`
                databaseLang += `"MySql" : ` +req.body.req.MySql[0] + `,`
                databaseLang += `"SQLServer" : `+req.body.req.SQLServer[0] + `,`
                databaseLang += `"MongoDB" : `+req.body.req.MongoDB[0] + `,`
                databaseLang += `"SQLite" : `+req.body.req.SQLite[0] + `,`
                databaseLang += `"Redis" : `+req.body.req.Redis[0] + `,`
                databaseLang += `"Oracle" : `+req.body.req.Oracle[0] + `,`
                databaseLang += `"Flask" : `+req.body.req.Flask[0] + `,`
                databaseLang += `"Cordova" : `+req.body.req.Cordova[0]+`}`

            var cloudLang = `{`
                cloudLang += `"AWS" : `+req.body.req.AWS[0]+ `,`
                cloudLang += `"Azure" : `+req.body.req.Azure[0]+ `,`
                cloudLang += `"GCP" : `+req.body.req.GCP[0]+ `,`
                cloudLang += `"Linux" : `+req.body.req.Linux[0]+ `,`
                cloudLang += `"Wordpress" : `+req.body.req.Wordpress[0]+ `,`
                cloudLang += `"RaspberryPi" : `+req.body.req.RaspberryPi[0]+ `,`
                cloudLang += `"Arduino" : `+req.body.req.Arduino[0]+ `,`
                cloudLang += `"Firebase" : `+req.body.req.Firebase[0]+ `,`
                cloudLang += `"Docker" : `+req.body.req.Docker[0]+ `,`
                cloudLang += `"Go" : `+req.body.req.Go[0]+`}`

            var machineLang = `{`
                machineLang += `"Tensorflow" : `+req.body.req.Tensorflow[0]+ `,`
                machineLang += `"Caffe" : `+req.body.req.Caffe[0]+ `,`
                machineLang += `"OpenCV" : `+req.body.req.OpenCV[0]+ `,`
                machineLang += `"DLib" : `+req.body.req.DLib[0]+ `,`
                machineLang += `"OpenGL" : `+req.body.req.OpenGL[0]+ `,`
                machineLang += `"Unity" : `+req.body.req.Unity[0]+`,`
                machineLang += `"Arduino" : `+req.body.req.Arduino[0]+ `,`
                machineLang += `"Firebase" : `+req.body.req.Firebase[0]+`}`

            var sScore = `{`
                sScore += `"computerprogramming" : `+req.body.req.getUserGrade.computerprogramming[0]+ `,`
                sScore += `"discretemath" : `+req.body.req.getUserGrade.discretemath[0]+ `,`
                sScore += `"datastructure" : `+req.body.req.datastructure[0]+ `,`
                sScore += `"objectiveprogramming" : `+req.body.req.getUserGrade.objectiveprogramming[0]+ `,`
                sScore += `"computerstructure" : `+req.body.req.getUserGrade.computerstructure[0]+ `,`
                sScore += `"algorithm" : `+req.body.req.getUserGrade.algorithm[0]+ `,`
                sScore += `"systemprogramming" : `+req.body.req.getUserGrade.systemprogramming[0]+ `,`
                sScore += `"os" : `+req.body.req.getUserGrade.os[0]+ `,`
                sScore +=  `"database" : `+req.body.req.getUserGrade.database[0]+ `,`
                sScore += `"network" : `+req.body.req.getUserGrade.network[0]+`}`

            var sEnglish = `{`
            sEnglish += `"EnglishSearch" : ` + req.body.req.getUserEng.EnglishSearch[0] + `,`
            sEnglish += `"EnglishCommunication" : ` + req.body.req.getUserEng.EnglishCommunication[0] + `,`
            sEnglish += `"EnglishPresentation" : ` + req.body.req.getUserEng.EnglishPresentation[0] + `,`
            sEnglish += `"EnglishReport" : ` + req.body.req.getUserEng.EnglishReport[0] +`}`

            var sPhone = req.body.req.getUserInfo.sPhone
            var sHope = req.body.getUserInfo.sHope[0]
            var sEmail = req.body.getUserInfo.sEmail
            var sGrade = req.body.getUserInfo.sGrade[0]
            var sHopeTerm = req.body.sHopeTerm.getUserInfo.sHopeTerm[0]
            var sql2 = 'INSERT INTO resume (sID, programmingLang, frameworkLang, databaseLang, cloudLang, machineLang, sScore, sPhone, sHope, sEmail, sGrade, sHopeTerm, sEnglish) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)'
            var params2 = [sID, programmingLang, frameworkLang, databaseLang, cloudLang, machineLang, sScore, sPhone, sHope, sEmail, sGrade, sHopeTerm, sEnglish]
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
    var sql = 'SELECT programmingLang, frameworkLang, databaseLang, cloudLang, machineLang, sScore, sPhone, sHope, sEmail, sGrade, sHopeTerm, sEnglish FROM resume NATURAL JOIN student WHERE student.sLoginID = ?'
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
        if (err) console.log(err)
        else {
            var sID = rows[0].sID
            var programmingLang = `{ `
            programmingLang += `"Javascript" : `+ req.body.req.Javascript[0] + `,`
            programmingLang += `"HTML" : ` + req.body.req.HTML[0] + `,`
            programmingLang += `"CSS" : `+ req.body.req.CSS[0] + `,`
            programmingLang += `"jQuery" : `+ req.body.req.jQuery[0] + `,`
            programmingLang += `"SQL": ` + req.body.req.SQL[0] + `,`
            programmingLang += `"Java": ` + req.body.req.Java[0] + `,`
            programmingLang += `"AndroidJava": `+req.body.req.AndroidJava[0] + `,`
            programmingLang += `"Swift": ` + req.body.req.Swift[0] + `,`
            programmingLang += `"Objective": ` + req.body.req.Objective[0] `,`
            programmingLang += `"Python": `+ req.body.req.Python[0]+ `,`
            programmingLang +=  `"PHP": `+req.body.req.PHP[0] +`,`
            programmingLang +=  `"C": `+req.body.req.C[0]+`,`
            programmingLang += `"Microsoft": `+req.body.req.Microsoft[0]+`,`
            programmingLang += `"Kotlin": `+req.body.req.Kotlin[0]+`,`
            programmingLang += `"Peral": `+req.body.req.Peral[0]+`,`
            programmingLang += `"R": `+ req.body.req.R[0] +`,`
            programmingLang += `"VBA": `+req.body.req.VBA[0] + `}`

            var frameworkLang = `{`
            frameworkLang += `"Nodejs" : `+req.body.req.Nodejs[0]+`,`
            frameworkLang += `"Angular" : `+ req.body.req.Angular[0]+`,`
            frameworkLang += `"React" : `+ req.body.req.React[0]+`,`
            frameworkLang += `"Expressjs" : `+ req.body.req.Expressjs[0]+`,`
            frameworkLang += `"NetCore" : `+req.body.req.NetCore[0]+`,`
            frameworkLang += `"Spring" : `+ req.body.req.Spring[0]+`,`
            frameworkLang += `"Django" : `+ req.body.req.Django[0]+`,`
            frameworkLang += `"Flask" :`+req.body.req.Flask[0]+`,`
            frameworkLang += `"Cordova" : `+ req.body.req.Cordova[0] +`}`

            var databaseLang = `{`
            databaseLang += `"MySql" : ` +req.body.req.MySql[0] + `,`
            databaseLang += `"SQLServer" : `+req.body.req.SQLServer[0] + `,`
            databaseLang += `"MongoDB" : `+req.body.req.MongoDB[0] + `,`
            databaseLang += `"SQLite" : `+req.body.req.SQLite[0] + `,`
            databaseLang += `"Redis" : `+req.body.req.Redis[0] + `,`
            databaseLang += `"Oracle" : `+req.body.req.Oracle[0] + `,`
            databaseLang += `"Flask" : `+req.body.req.Flask[0] + `,`
            databaseLang += `"Cordova" : `+req.body.req.Cordova[0]+`}`

            var cloudLang = `{`
            cloudLang += `"AWS" : `+req.body.req.AWS[0]+ `,`
            cloudLang += `"Azure" : `+req.body.req.Azure[0]+ `,`
            cloudLang += `"GCP" : `+req.body.req.GCP[0]+ `,`
            cloudLang += `"Linux" : `+req.body.req.Linux[0]+ `,`
            cloudLang += `"Wordpress" : `+req.body.req.Wordpress[0]+ `,`
            cloudLang += `"RaspberryPi" : `+req.body.req.RaspberryPi[0]+ `,`
            cloudLang += `"Arduino" : `+req.body.req.Arduino[0]+ `,`
            cloudLang += `"Firebase" : `+req.body.req.Firebase[0]+ `,`
            cloudLang += `"Docker" : `+req.body.req.Docker[0]+ `,`
            cloudLang += `"Go" : `+req.body.req.Go[0]+`}`

            var machineLang = `{`
            machineLang += `"Tensorflow" : `+req.body.req.Tensorflow[0]+ `,`
            machineLang += `"Caffe" : `+req.body.req.Caffe[0]+ `,`
            machineLang += `"OpenCV" : `+req.body.req.OpenCV[0]+ `,`
            machineLang += `"DLib" : `+req.body.req.DLib[0]+ `,`
            machineLang += `"OpenGL" : `+req.body.req.OpenGL[0]+ `,`
            machineLang += `"Unity" : `+req.body.req.Unity[0]+`,`
            machineLang += `"Arduino" : `+req.body.req.Arduino[0]+ `,`
            machineLang += `"Firebase" : `+req.body.req.Firebase[0]+`}`

            var sScore = `{`
            sScore += `"computerprogramming" : `+req.body.req.getUserGrade.computerprogramming[0]+ `,`
            sScore += `"discretemath" : `+req.body.req.getUserGrade.discretemath[0]+ `,`
            sScore += `"datastructure" : `+req.body.req.datastructure[0]+ `,`
            sScore += `"objectiveprogramming" : `+req.body.req.getUserGrade.objectiveprogramming[0]+ `,`
            sScore += `"computerstructure" : `+req.body.req.getUserGrade.computerstructure[0]+ `,`
            sScore += `"algorithm" : `+req.body.req.getUserGrade.algorithm[0]+ `,`
            sScore += `"systemprogramming" : `+req.body.req.getUserGrade.systemprogramming[0]+ `,`
            sScore += `"os" : `+req.body.req.getUserGrade.os[0]+ `,`
            sScore +=  `"database" : `+req.body.req.getUserGrade.database[0]+ `,`
            sScore += `"network" : `+req.body.req.getUserGrade.network[0]+`}`

            var sEnglish = `{`
            sEnglish += `"EnglishSearch" : ` + req.body.req.getUserEng.EnglishSearch[0] + `,`
            sEnglish += `"EnglishCommunication" : ` + req.body.req.getUserEng.EnglishCommunication[0] + `,`
            sEnglish += `"EnglishPresentation" : ` + req.body.req.getUserEng.EnglishPresentation[0] + `,`
            sEnglish += `"EnglishReport" : ` + req.body.req.getUserEng.EnglishReport[0] +`}`

            var sPhone = req.body.req.getUserInfo.sPhone
            var sHope = req.body.getUserInfo.sHope[0]
            var sEmail = req.body.getUserInfo.sEmail
            var sGrade = req.body.getUserInfo.sGrade[0]
            var sHopeTerm = req.body.sHopeTerm.getUserInfo.sHopeTerm[0]

            var sql2 = 'UPDATE resume SET programmingLang = ?, frameworkLang=?, databaseLang=?, cloudLang=?, machineLang=?, sScore=?, sPhone=?, sHope=?, sEmail=?, sGrade=?, sHopeTerm=?,sEnglish=? WHERE sID = ?'
            var params = [programmingLang, frameworkLang, databaseLang, cloudLang, machineLang, sScore, sPhone, sHope, sEmail, sGrade, sHopeTerm, sEnglish, sID]

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

