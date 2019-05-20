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
        cb(null, req.body.sLoginID + '-'+file.originalname)
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
            programmingLang += `"Javascript" : `+ `"` +req.body.req.programmingLang.Javascript+ `"`+ `,`
            programmingLang += `"HTML" : ` + `"` + req.body.req.programmingLang.HTML + `"` + `,`
            programmingLang += `"CSS" : `+ `"` +req.body.req.programmingLang.CSS + `"` + `,`
            programmingLang += `"jQuery" : `+ `"` + req.body.req.programmingLang.jQuery + `"` + `,`
            programmingLang += `"SQL": ` + `"` +req.body.req.programmingLang.SQL + `"` + `,`
            programmingLang += `"Java": ` + `"` +req.body.req.programmingLang.Java + `"` + `,`
            programmingLang += `"AndroidJava": `+ `"` +req.body.req.programmingLang.AndroidJava + `"` + `,`
            programmingLang += `"Swift": ` + `"` +req.body.req.programmingLang.Swift + `"` + `,`
            programmingLang += `"Objective": ` + `"` +req.body.req.programmingLang.Objective + `"` + `,`
            programmingLang += `"Python": `+ `"` + req.body.req.programmingLang.Python+ `"` + `,`
            programmingLang +=  `"PHP": `+ `"` +req.body.req.programmingLang.PHP + `"` +`,`
            programmingLang +=  `"C": `+ `"` +req.body.req.programmingLang.C + `"` +`,`
            programmingLang += `"Microsoft": `+ `"` +req.body.req.programmingLang.Microsoft+ `"` +`,`
            programmingLang += `"Kotlin": `+ `"` +req.body.req.programmingLang.Kotlin + `"` +`,`
            programmingLang += `"Peral": `+ `"` +req.body.req.programmingLang.Peral + `"` +`,`
            programmingLang += `"R": `+  `"` +req.body.req.programmingLang.R + `"` +`,`
            programmingLang += `"VBA": `+ `"` +req.body.req.programmingLang.VBA + `"` + `}`

            var frameworkLang = `{`
                frameworkLang += `"Nodejs" : `+ `"` +req.body.req.frameworkLang.Nodejs + `"` +`,`
                frameworkLang += `"Angular" : `+ `"` +req.body.req.frameworkLang.Angular+ `"` +`,`
                frameworkLang += `"React" : `+ `"` + req.body.req.frameworkLang.React+ `"` +`,`
                frameworkLang += `"Expressjs" : `+ `"` +req.body.req.frameworkLang.Expressjs+ `"` +`,`
                frameworkLang += `"NetCore" : `+ `"` +req.body.req.frameworkLang.NetCore+ `"` +`,`
                frameworkLang += `"Spring" : `+ `"` +req.body.req.frameworkLang.Spring+ `"` +`,`
                frameworkLang += `"Django" : `+ `"` + req.body.req.frameworkLang.Django+ `"` +`,`
                frameworkLang += `"Flask" :`+ `"` +req.body.req.frameworkLang.Flask+ `"` +`,`
                frameworkLang += `"Cordova" : `+ `"` + req.body.req.frameworkLang.Cordova + `"` +`}`

            var databaseLang = `{`
                databaseLang += `"MySql" : ` + `"` +req.body.req.databaseLang.MySql + `"` + `,`
                databaseLang += `"SQLServer" : `+ `"` +req.body.req.databaseLang.SQLServer + `"` + `,`
                databaseLang += `"MongoDB" : `+ `"` +req.body.req.databaseLang.MongoDB + `"` + `,`
                databaseLang += `"SQLite" : `+ `"` +req.body.req.databaseLang.SQLite + `"` + `,`
                databaseLang += `"Redis" : `+ `"` +req.body.req.databaseLang.Redis + `"` + `,`
                databaseLang += `"Oracle" : `+ `"` +req.body.req.databaseLang.Oracle + `"` + `,`
                databaseLang += `"Flask" : `+ `"` +req.body.req.databaseLang.Flask + `"` + `,`
                databaseLang += `"Cordova" : `+ `"` +req.body.req.databaseLang.Cordova + `"` +`}`

            var cloudLang = `{`
                cloudLang += `"AWS" : `+ `"` +req.body.req.cloudLang.AWS+ `"` + `,`
                cloudLang += `"Azure" : `+ `"` +req.body.req.cloudLang.Azure+ `"` + `,`
                cloudLang += `"GCP" : `+ `"` +req.body.req.cloudLang.GCP+ `"` + `,`
                cloudLang += `"Linux" : `+ `"` +req.body.req.cloudLang.Linux+ `"` + `,`
                cloudLang += `"Wordpress" : `+ `"` +req.body.req.cloudLang.Wordpress+ `"` + `,`
                cloudLang += `"RaspberryPi" : `+ `"` +req.body.req.cloudLang.RaspberryPi+ `"` + `,`
                cloudLang += `"Arduino" : `+ `"` +req.body.req.cloudLang.Arduino+ `"` + `,`
                cloudLang += `"Firebase" : `+ `"` +req.body.req.cloudLang.Firebase+ `"` + `,`
                cloudLang += `"Docker" : `+ `"` +req.body.req.cloudLang.Docker+ `"` + `,`
                cloudLang += `"Go" : `+ `"` +req.body.req.cloudLang.Go+ `"` +`}`

            var machineLang = `{`
                machineLang += `"Tensorflow" : `+ `"` +req.body.req.machineLang.Tensorflow+ `"` + `,`
                machineLang += `"Caffe" : `+ `"` +req.body.req.machineLang.Caffe+ `"` + `,`
                machineLang += `"OpenCV" : `+ `"` +req.body.req.machineLang.OpenCV+ `"` + `,`
                machineLang += `"DLib" : `+ `"` +req.body.req.machineLang.DLib+ `"` + `,`
                machineLang += `"OpenGL" : `+ `"` +req.body.req.machineLang.OpenGL+ `"` + `,`
                machineLang += `"Unity" : `+ `"` +req.body.req.machineLang.Unity+ `"` +`,`
                machineLang += `"Arduino" : `+ `"` +req.body.req.machineLang.Arduino+ `"` + `,`
                machineLang += `"Firebase" : `+ `"` +req.body.req.machineLang.Firebase+ `"` +`}`

                var sScore = `{`
                sScore += `"computerprogramming" : `+ `"` +req.body.req.getUserGrade[0].computerprogramming+ `"` + `,`
                sScore += `"discretemath" : `+ `"` +req.body.req.getUserGrade[0].discretemath+ `"` + `,`
                sScore += `"datastructure" : `+ `"` +req.body.req.getUserGrade[0].datastructure+ `"` + `,`
                sScore += `"objectiveprogramming" : `+ `"` +req.body.req.getUserGrade[0].objectiveprogramming+ `"` + `,`
                sScore += `"computerstructure" : `+ `"` +req.body.req.getUserGrade[0].computerstructure+ `"` + `,`
                sScore += `"algorithm" : `+ `"` +req.body.req.getUserGrade[0].algorithm+ `"` + `,`
                sScore += `"systemprogramming" : `+ `"` +req.body.req.getUserGrade[0].systemprogramming+ `"` + `,`
                sScore += `"os" : `+ `"` +req.body.req.getUserGrade[0].os+ `"` + `,`
                sScore +=  `"database" : `+ `"` +req.body.req.getUserGrade[0].database+ `"` + `,`
                sScore += `"network" : `+ `"` +req.body.req.getUserGrade[0].network+ `"` +`}`

            var sEnglish = `{`
            sEnglish += `"EnglishSearch" : ` +  `"` +req.body.req.getUserEng[0].EnglishSearch + `"` + `,`
            sEnglish += `"EnglishCommunication" : ` +  `"` +req.body.req.getUserEng[0].EnglishCommunication + `"` + `,`
            sEnglish += `"EnglishPresentation" : ` +  `"` +req.body.req.getUserEng[0].EnglishPresentation + `"` + `,`
            sEnglish += `"EnglishReport" : ` +  `"` +req.body.req.getUserEng[0].EnglishReport + `"` +`}`

            var sPhone = req.body.req.getUserInfo[0].sPhone
            var sHope = req.body.req.getUserInfo[0].sHope
            var sEmail = req.body.req.getUserInfo[0].sEmail
            var sGrade = req.body.req.getUserInfo[0].sGrade
            var sHopeTerm = req.body.req.getUserInfo[0].sHopeTerm
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
                res.send('0')
            else {
                return res.json(rows[0])
            }
        }
    })
})

router.post('/modifyResume', function (req, res) {
    var sql = 'SELECT sID FROM student WHERE sLoginID = ?'
    var sLoginID = req.body.req.sLoginID

    conn.init().query(sql, sLoginID, function (err, rows) {
        if (err) console.log(err)
        else {
            var sID =  rows[0].sID
            var programmingLang = `{ `
            programmingLang += `"Javascript" : `+ `"` +req.body.req.programmingLang.Javascript+ `"`+ `,`
            programmingLang += `"HTML" : ` + `"` + req.body.req.programmingLang.HTML + `"` + `,`
            programmingLang += `"CSS" : `+ `"` +req.body.req.programmingLang.CSS + `"` + `,`
            programmingLang += `"jQuery" : `+ `"` + req.body.req.programmingLang.jQuery + `"` + `,`
            programmingLang += `"SQL": ` + `"` +req.body.req.programmingLang.SQL + `"` + `,`
            programmingLang += `"Java": ` + `"` +req.body.req.programmingLang.Java + `"` + `,`
            programmingLang += `"AndroidJava": `+ `"` +req.body.req.programmingLang.AndroidJava + `"` + `,`
            programmingLang += `"Swift": ` + `"` +req.body.req.programmingLang.Swift + `"` + `,`
            programmingLang += `"Objective": ` + `"` +req.body.req.programmingLang.Objective + `"` + `,`
            programmingLang += `"Python": `+ `"` + req.body.req.programmingLang.Python+ `"` + `,`
            programmingLang +=  `"PHP": `+ `"` +req.body.req.programmingLang.PHP + `"` +`,`
            programmingLang +=  `"C": `+ `"` +req.body.req.programmingLang.C + `"` +`,`
            programmingLang += `"Microsoft": `+ `"` +req.body.req.programmingLang.Microsoft+ `"` +`,`
            programmingLang += `"Kotlin": `+ `"` +req.body.req.programmingLang.Kotlin + `"` +`,`
            programmingLang += `"Peral": `+ `"` +req.body.req.programmingLang.Peral + `"` +`,`
            programmingLang += `"R": `+  `"` +req.body.req.programmingLang.R + `"` +`,`
            programmingLang += `"VBA": `+ `"` +req.body.req.programmingLang.VBA + `"` + `}`

            var frameworkLang = `{`
                frameworkLang += `"Nodejs" : `+ `"` +req.body.req.frameworkLang.Nodejs + `"` +`,`
                frameworkLang += `"Angular" : `+ `"` +req.body.req.frameworkLang.Angular+ `"` +`,`
                frameworkLang += `"React" : `+ `"` + req.body.req.frameworkLang.React+ `"` +`,`
                frameworkLang += `"Expressjs" : `+ `"` +req.body.req.frameworkLang.Expressjs+ `"` +`,`
                frameworkLang += `"NetCore" : `+ `"` +req.body.req.frameworkLang.NetCore+ `"` +`,`
                frameworkLang += `"Spring" : `+ `"` +req.body.req.frameworkLang.Spring+ `"` +`,`
                frameworkLang += `"Django" : `+ `"` + req.body.req.frameworkLang.Django+ `"` +`,`
                frameworkLang += `"Flask" :`+ `"` +req.body.req.frameworkLang.Flask+ `"` +`,`
                frameworkLang += `"Cordova" : `+ `"` + req.body.req.frameworkLang.Cordova + `"` +`}`

            var databaseLang = `{`
                databaseLang += `"MySql" : ` + `"` +req.body.req.databaseLang.MySql + `"` + `,`
                databaseLang += `"SQLServer" : `+ `"` +req.body.req.databaseLang.SQLServer + `"` + `,`
                databaseLang += `"MongoDB" : `+ `"` +req.body.req.databaseLang.MongoDB + `"` + `,`
                databaseLang += `"SQLite" : `+ `"` +req.body.req.databaseLang.SQLite + `"` + `,`
                databaseLang += `"Redis" : `+ `"` +req.body.req.databaseLang.Redis + `"` + `,`
                databaseLang += `"Oracle" : `+ `"` +req.body.req.databaseLang.Oracle + `"` + `,`
                databaseLang += `"Flask" : `+ `"` +req.body.req.databaseLang.Flask + `"` + `,`
                databaseLang += `"Cordova" : `+ `"` +req.body.req.databaseLang.Cordova + `"` +`}`

            var cloudLang = `{`
                cloudLang += `"AWS" : `+ `"` +req.body.req.cloudLang.AWS+ `"` + `,`
                cloudLang += `"Azure" : `+ `"` +req.body.req.cloudLang.Azure+ `"` + `,`
                cloudLang += `"GCP" : `+ `"` +req.body.req.cloudLang.GCP+ `"` + `,`
                cloudLang += `"Linux" : `+ `"` +req.body.req.cloudLang.Linux+ `"` + `,`
                cloudLang += `"Wordpress" : `+ `"` +req.body.req.cloudLang.Wordpress+ `"` + `,`
                cloudLang += `"RaspberryPi" : `+ `"` +req.body.req.cloudLang.RaspberryPi+ `"` + `,`
                cloudLang += `"Arduino" : `+ `"` +req.body.req.cloudLang.Arduino+ `"` + `,`
                cloudLang += `"Firebase" : `+ `"` +req.body.req.cloudLang.Firebase+ `"` + `,`
                cloudLang += `"Docker" : `+ `"` +req.body.req.cloudLang.Docker+ `"` + `,`
                cloudLang += `"Go" : `+ `"` +req.body.req.cloudLang.Go+ `"` +`}`

            var machineLang = `{`
                machineLang += `"Tensorflow" : `+ `"` +req.body.req.machineLang.Tensorflow+ `"` + `,`
                machineLang += `"Caffe" : `+ `"` +req.body.req.machineLang.Caffe+ `"` + `,`
                machineLang += `"OpenCV" : `+ `"` +req.body.req.machineLang.OpenCV+ `"` + `,`
                machineLang += `"DLib" : `+ `"` +req.body.req.machineLang.DLib+ `"` + `,`
                machineLang += `"OpenGL" : `+ `"` +req.body.req.machineLang.OpenGL+ `"` + `,`
                machineLang += `"Unity" : `+ `"` +req.body.req.machineLang.Unity+ `"` +`,`
                machineLang += `"Arduino" : `+ `"` +req.body.req.machineLang.Arduino+ `"` + `,`
                machineLang += `"Firebase" : `+ `"` +req.body.req.machineLang.Firebase+ `"` +`}`
            console.log(req.body.req.getUserGrade)
            var sScore = `{`
                sScore += `"computerprogramming" : `+ `"` +req.body.req.getUserGrade[0].computerprogramming+ `"` + `,`
                sScore += `"discretemath" : `+ `"` +req.body.req.getUserGrade[0].discretemath+ `"` + `,`
                sScore += `"datastructure" : `+ `"` +req.body.req.getUserGrade[0].datastructure+ `"` + `,`
                sScore += `"objectiveprogramming" : `+ `"` +req.body.req.getUserGrade[0].objectiveprogramming+ `"` + `,`
                sScore += `"computerstructure" : `+ `"` +req.body.req.getUserGrade[0].computerstructure+ `"` + `,`
                sScore += `"algorithm" : `+ `"` +req.body.req.getUserGrade[0].algorithm+ `"` + `,`
                sScore += `"systemprogramming" : `+ `"` +req.body.req.getUserGrade[0].systemprogramming+ `"` + `,`
                sScore += `"os" : `+ `"` +req.body.req.getUserGrade[0].os+ `"` + `,`
                sScore +=  `"database" : `+ `"` +req.body.req.getUserGrade[0].database+ `"` + `,`
                sScore += `"network" : `+ `"` +req.body.req.getUserGrade[0].network+ `"` +`}`

            var sEnglish = `{`
            sEnglish += `"EnglishSearch" : ` +  `"` +req.body.req.getUserEng[0].EnglishSearch + `"` + `,`
            sEnglish += `"EnglishCommunication" : ` +  `"` +req.body.req.getUserEng[0].EnglishCommunication + `"` + `,`
            sEnglish += `"EnglishPresentation" : ` +  `"` +req.body.req.getUserEng[0].EnglishPresentation + `"` + `,`
            sEnglish += `"EnglishReport" : ` +  `"` +req.body.req.getUserEng[0].EnglishReport + `"` +`}`

            var sPhone = req.body.req.getUserInfo[0].sPhone
            var sHope = req.body.req.getUserInfo[0].sHope
            var sEmail = req.body.req.getUserInfo[0].sEmail
            var sGrade = req.body.req.getUserInfo[0].sGrade
            var sHopeTerm = req.body.req.getUserInfo[0].sHopeTerm

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
        var sql1 =  'SELECT sID FROM student natural join resume WHERE sLoginID = ?'
        var params1 =  [req.body.sLoginID]
        return new Promise(function (resolve,reject) {
            conn.init().query(sql1, params1, function (err,rows) {
                if(err) console.log(err)
                else {
                    if(rows[0]== null) {
                        resolve('0')
                    }
                    else {
                        var data = []
                        data[0] = rows[0].sID
                        resolve(data)
                    }
                }
            })
        })
    }

    function second(data) {
        var sql2 = 'SELECT applyNoticeID, applyStdNum FROM applyNotice NATURAL JOIN companyNotice NATURAL JOIN company NATURAL JOIN applyTerm WHERE cName = ? and applySemester = ? and applyOrder =?'
        var params2 = [req.body.cName, req.body.applySemester, req.body.applyOrder]
        return new Promise(function (resolve,reject) {
            if(data == '0'){
                resolve('0')
            }
            else {
                conn.init().query(sql2, params2, function (err, rows) {
                    if (err) console.log(err)
                    else {
                        data[1] = rows[0].applyNoticeID
                        data[2] = rows[0].applyStdNum
                        resolve(data)

                    }
                })
            }
        })
    }

    function four(data) {
        return new Promise(function (resolve,reject) {
        var sql3 = 'INSERT INTO stdApplyCo (applyNoticeID, YN, sID) VALUES(?,?,?)'
            console.log(data)
        var sID = data[0]
        var applyNoticeID =  data[1]
        var params3 = [applyNoticeID, -1, sID]
            if(data == '0'){
                res.send('0')
                resolve('0')
            }
            else {
                conn.init().query(sql3, params3, function (err, rows) {
                    if (err) console.log(err)
                    else {
                         res.send(rows)
                         resolve(data)
                    }
                })
            }
        })
    }
  
    function three(data) {
        return new Promise(function (resolve,reject) {
            var sql4 = 'UPDATE applyNotice SET applyStdNum = ? WHERE applyNoticeID = ?'
            var applyStdNum =  data[2] + 1
            var applyNoticeID =  data[1]
            var params4 = [applyStdNum, applyNoticeID]
          if(data == '0'){
                resolve('0')
            }
          else{
            conn.init().query(sql4, params4, function (err, rows) {
                if (err) console.log(err)
                else {
                    resolve(data)
                }
            })
          }
       })
    }
})

router.get('/applyStatus', function (req, res) {
    var sql = 'SELECT cName, YN, cImage, cOccupation, applyOrder FROM company NATURAL JOIN companyNotice NATURAL JOIN applyNotice NATURAL JOIN stdApplyCo NATURAL JOIN student natural join applyTerm WHERE sLoginID = ? and applySemester =?'
    var sLoginID = req.query.sLoginID
    var applySemester = req.query.applySemester
    var params = [sLoginID, applySemester]
    conn.init().query(sql, params, function (err, rows) {
        if (err) console.log(err)
        else {
            console.log(rows)
            if (rows[0] == null) {
                console.log('값이 없음')
                return res.send('0')
            } else {
                console.log('값이 있음')
                return res.json(rows)
            }
        }
    })
})

router.post('/postReview', function (req, res) {
    var sql1 = 'SELECT internID FROM student NATURAL JOIN stdApplyCo NATURAL JOIN internDetail WHERE sLoginID = ?'
    var sLoginID = req.body.sLoginID
    console.log(req.body)
    conn.init().query(sql1, sLoginID, function (err, rows) {
        if (err) console.log(err)
        else {
            var sql2 = 'INSERT INTO companyReview (internID, starScore, reviewContent, reviewTitle) VALUES(?,?,?,?)'
            var internID = rows[0].internID
            var starScore = req.body.starScore
            var reviewContent = req.body.reviewContent
            var reviewTitle = req.body.reviewTitle
            var params2 = [internID, starScore, reviewContent, reviewTitle]
            conn.init().query(sql2, params2, function (err, rows) {
                if(err) console.log(err)
                else {
                    console.log(rows)
                    res.send(rows)
                }
            })
        }
    })
})

router.post('/postReport', upload.single('file'), function (req, res) {
    var sql1 = 'SELECT internID FROM student NATURAL JOIN stdApplyCo NATURAL JOIN internDetail WHERE sLoginID = ?'
    var sLoginID = req.body.sLoginID
    conn.init().query(sql1, sLoginID, function (err, rows) {
        if (err) console.log(err)
        else {
            var sql2 = 'INSERT INTO report (internID, reportWritingDate, reportURL, reportRealName) VALUES(?,?,?,?)'
            var internID = rows[0].internID
            var reportWritingDate = req.body.applySemester
            var reportURL = req.file.path
            var reportRealName = req.body.name
            var params2 = [internID, reportWritingDate, reportURL, reportRealName]
            conn.init().query(sql2, params2, function (err, rows) {
                if (err) console.log(err)
                else {
                    console.log(rows)
                    res.send(rows)
                }
            })
        }
    })
})


router.get('/loadFileName', function (req,res) {
    var sql = 'SELECT reportRealName FROM student NATURAL JOIN stdApplyCo NATURAL JOIN internDetail NATURAL JOIN report WHERE sLoginID= ?'
    var sLoginID = req.query.sLoginID
    var params = [sLoginID]
    conn.init().query(sql, params, function (err, rows) {
        if(err) console.log(err)
        else{
            if(rows[0]==null){
                res.send('0')
            }
            else {
                res.send(rows[0].reportRealName)
            }
        }
    })
})

router.get('/downloadReport', function (req,res) {
    var sql = 'SELECT reportURL FROM student NATURAL JOIN stdApplyCo NATURAL JOIN internDetail NATURAL JOIN report WHERE sLoginID= ?'
    var sLoginID = req.query.sLoginID
    conn.init().query(sql, sLoginID, function (err, rows) {
        if(err) console.log(err)
        else{
            if(rows[0]==null){
                res.send('0')
            }
            else {
                res.download(rows[0].reportURL)
            }
        }
    })
})

router.get('/checkReportTerm', function (req,res) {
    Promise.resolve()
        .then(getsID)
        .then(getapplyNoticeID)
        .then(getNoticID)
        .then(getInternsheepTerm)
        // .then(showResumeYN)
        .catch(function (err) {
            console.log('Error', err)
            process.exit()
        })

        function getsID() {
            console.log("sLoginID",req.query.sLoginID)
            var sql = 'SELECT sID FROM student WHERE sLoginID = ?'
            var sLoginID = req.query.sLoginID
            
            return new Promise(function (resolve, reject) {
                conn.init().query(sql, sLoginID, function (err, rows) {
                    if (err) reject(err)
                    else {
                        console.log(rows)
                        if (rows.length==0)
                        {
                            res.send('ID가 없음')
                        }
                        else
                        {
                            resolve(rows[0].sID)                       
                        }
                    }
                })
            })
        }

        function getapplyNoticeID(sID) {
            console.log("sID : ",sID)
            var sql1 = 'SELECT applyNoticeID FROM stdApplyCo WHERE sID = ?'
            
            return new Promise(function (resolve, reject) {
                conn.init().query(sql1, sID, function (err, rows) {
                    if (err) reject(err)
                    else {
                        if (rows.length==0)
                        {
                            res.send('sID가 있고 applyNoticeId가 없음')
                        }
                        else
                        {
                            console.log("applynoticId이다.",rows)
                            resolve(rows[0].applyNoticeID)                       
                        }
                    }
                })
            })
        }

        function getNoticID(applyNoticeID) {
            var sql = 'SELECT cNoticeID FROM applyNotice WHERE applyNoticeID = ?'
            
            return new Promise(function (resolve, reject) {
                conn.init().query(sql, applyNoticeID, function (err, rows) {
                    if (err) reject(err)
                    else {
                        console.log(rows)
                        if (rows.length==0)
                        {
                            res.send('회사 공고가 없음')
                        }
                        else
                        {
                            resolve(rows[0].cNoticeID)                       
                        }
                    }
                })
            })
        }
        
        function getInternsheepTerm(cNoticeID) {
            var sql = 'SELECT internTermStart,internTermEnd FROM companyNotice WHERE cNoticeID = ?'
            
            return new Promise(function (resolve, reject) {
                conn.init().query(sql, cNoticeID, function (err, rows) {
                    if (err) reject(err)
                    else {
                        if (rows.length==0)
                        {
                            res.send('기간이 없음')
                        }
                        else
                        {
                            var responseData=[]
                            var n = Date.now()
                            // var count = 0
                            var today = new Date(n + 32400000)
                            
                            var start = rows[0].internTermStart
                            var end = rows[0].internTermEnd
                            var diff1 = today - start
                            var diff2 = end + 864000000 - today
                            var currDay = 24 * 60 * 60 * 1000;// 시 * 분 * 초 * 밀리세컨
                            if (parseInt(diff1 / currDay) <= 0 && parseInt(diff2 / currDay) >= 0) {
                                console.log(parseInt(diff1 / currDay))
                                responseData[0] = '1'//리포트 작성기간이 맞다.
                            }
                            if(responseData[0]==null){
                                responseData[0]='0'//리포트 작성기간이 아니다.
                            }
                            console.log("보낼데이터 입니다.",responseData[0])
                            return res.send(responseData[0])
                            // resolve(rows[0])                       
                        }
                    }
                })
            })
        }
    
})

router.get('/watchReview', function (req,res) {
    var sql = 'SELECT starScore, reviewContent, reviewTitle, cName, cOccupation FROM student NATURAL JOIN stdApplyCo NATURAL JOIN internDetail NATURAL JOIN companyReview NATURAL JOIN applyNotice NATURAL JOIN companyNotice NATURAL JOIN company WHERE sLoginID = ?'
    var sLoginID = req.query.sLoginID
    var params = [sLoginID]
    conn.init().query(sql, params, function (err, rows) {
        if(err) console.log(err)
        else{
            if(rows[0]==null){
                res.send('0')
            }
            else {
                console.log(rows[0])
                res.send(rows[0])
            }
        }
    })
})

router.post('/modifyReport', upload.single('file'), function (req, res) {
    Promise.resolve()
        .then(first)
        .then(second)
        .catch(function (err) {
            console.log('Error', err)
            process.exit()
        })

    function first() {
        return new Promise(function (resolve,reject) {
            var sql1 = 'SELECT reportID, reportURL FROM student NATURAL JOIN stdApplyCo NATURAL JOIN internDetail NATURAL JOIN report WHERE sLoginID = ?'
            var sLoginID = req.body.sLoginID
            conn.init().query(sql1,sLoginID,function (err,rows) {
                if(err) console.log(err)
                else{
                    fs.unlink(rows[0].reportURL, function (err) {
                        if(err) {
                            console.log('제대로 암됨')
                            resolve(rows[0].reportID)
                        }
                        else {
                            console.log('제대로 됨')
                            resolve(rows[0].reportID)
                        }
                    })
                }
            })
        })
    }

    function second(data) {
        return new Promise(function (resolve,reject) {
            console.log(data)

                    var sql2 = 'UPDATE report SET reportURL=?, reportRealName=? WHERE reportID = ?'
                    var reportURL = req.file.path
                    var reportRealName = req.body.name
                    var reportID = data
                    var params2 = [reportURL, reportRealName, reportID]
                    conn.init().query(sql2, params2, function (err, rows) {
                        if (err) console.log(err)
                        else {
                            console.log(rows)
                            res.send(rows)
                            resolve()
                        }
                    })
        })
    }
})

router.post('/modifyReview', function (req, res) {
            var sql3 = 'SELECT reviewID FROM student NATURAL JOIN stdApplyCo NATURAL JOIN internDetail NATURAL JOIN companyReview WHERE sLoginID = ?'
            var sLoginID = req.body.sLoginID

            conn.init().query(sql3, sLoginID, function (err, rows) {
                if (err) console.log(err)
                else {
                    var sql4 = 'UPDATE companyReview SET starScore=?, reviewContent=?, reviewTitle=? WHERE reviewID = ?'
                    var starScore = req.body.starScore
                    var reviewContent = req.body.reviewContent
                    var reviewTitle = req.body.reviewTitle
                    var reviewID = rows[0].reviewID
                    var params4 = [starScore, reviewContent, reviewTitle, reviewID]
                    conn.init().query(sql4, params4, function (err, rows) {
                        if(err) console.log(err)
                        else {
                            console.log(rows)
                            res.send(rows)
                        }
                    })
                }
            })
})

router.get('/showStudentInfo', function(req, res)
{
    var sql = 'SELECT * FROM student WHERE sLogin = ?'
    var loginID = req.query.sLoginID
    conn.init().query(sql, loginID, function(err, rows)
    {
        if(err)res.send(err)
        else 
        {
            console.log(rows)
            res.send(rows)
        }
    })
})
router.post('/modifyStudentInfo', function(req, res)
{
    var sql = 'UPDATE student SET sNum = ?, sMajor = ? WHERE sLoginID = ?'
    var loginID = req.body.sLoginID
    var sNum = req.body.sNum
    var sMajor = req.body.sMajor
    var sqlParams = [sNum, sMajor, loginID]
    conn.init().query(sql, sqlParams, function(err, rows)
    {
        if(err)res.send(err)
        else
        {
            console.log(rows)
            res.send('1')
        }
    })
})

router.post('/giveup', function(req, res)
{
    var sql1 = 'SELECT stdApplyCo.stdApplyCoID FROM student natural join stdApplyCo natural join applyNotice natural join applyTerm natural join companyNotice natural join company where sLoginID = ? AND applySemester =? and applyOrder =?'
    var loginID = req.body.sLoginID
    var applySemester = req.body.applySemester
    var applyOrder = req.body.applyOrder
    var params1=[loginID, applySemester, applyOrder]

    conn.init().query(sql1, params1, function (err, rows) {
        if(err) console.log(err)
        else{
            var sql2 = 'UPDATE stdApplyCo SET YN = 2 WHERE stdApplyCoID = ?'
            var stdApplyCoID = rows[0].stdApplyCoID
            conn.init().query(sql2, stdApplyCoID, function(err, rows)
            {
                if(err)res.send(err)
                else
                {
                    console.log(rows)
                    res.send(rows)
                }
            })
        }
    })
})
module.exports = router

