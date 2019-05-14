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
                sScore += `"computerprogramming" : `+ `"` +req.body.req.getUserGrade[0].computerprogramming[0]+ `"` + `,`
                sScore += `"discretemath" : `+ `"` +req.body.req.getUserGrade[0].discretemath[0]+ `"` + `,`
                sScore += `"datastructure" : `+ `"` +req.body.req.getUserGrade[0].datastructure[0]+ `"` + `,`
                sScore += `"objectiveprogramming" : `+ `"` +req.body.req.getUserGrade[0].objectiveprogramming[0]+ `"` + `,`
                sScore += `"computerstructure" : `+ `"` +req.body.req.getUserGrade[0].computerstructure[0]+ `"` + `,`
                sScore += `"algorithm" : `+ `"` +req.body.req.getUserGrade[0].algorithm[0]+ `"` + `,`
                sScore += `"systemprogramming" : `+ `"` +req.body.req.getUserGrade[0].systemprogramming[0]+ `"` + `,`
                sScore += `"os" : `+ `"` +req.body.req.getUserGrade[0].os[0]+ `"` + `,`
                sScore +=  `"database" : `+ `"` +req.body.req.getUserGrade[0].database[0]+ `"` + `,`
                sScore += `"network" : `+ `"` +req.body.req.getUserGrade[0].network[0]+ `"` +`}`

            var sEnglish = `{`
            sEnglish += `"EnglishSearch" : ` +  `"` +req.body.req.getUserEng[0].EnglishSearch[0] + `"` + `,`
            sEnglish += `"EnglishCommunication" : ` +  `"` +req.body.req.getUserEng[0].EnglishCommunication[0] + `"` + `,`
            sEnglish += `"EnglishPresentation" : ` +  `"` +req.body.req.getUserEng[0].EnglishPresentation[0] + `"` + `,`
            sEnglish += `"EnglishReport" : ` +  `"` +req.body.req.getUserEng[0].EnglishReport[0] + `"` +`}`

            var sPhone = req.body.req.getUserInfo[0].sPhone
            var sHope = req.body.req.getUserInfo[0].sHope[0]
            var sEmail = req.body.req.getUserInfo[0].sEmail
            var sGrade = req.body.req.getUserInfo[0].sGrade[0]
            var sHopeTerm = req.body.req.getUserInfo[0].sHopeTerm[0]
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
            var sID =  rows[0].sID
            var programmingLang = `{ `
            programmingLang += `"Javascript" : `+ req.body.req.programmingLang[0].Javascript[0] + `,`
            programmingLang += `"HTML" : ` + req.body.req.programmingLang[0].HTML[0] + `,`
            programmingLang += `"CSS" : `+ req.body.req.programmingLang[0].CSS[0] + `,`
            programmingLang += `"jQuery" : `+ req.body.req.programmingLang[0].jQuery[0] + `,`
            programmingLang += `"SQL": ` + req.body.req.programmingLang[0].SQL[0] + `,`
            programmingLang += `"Java": ` + req.body.req.programmingLang[0].Java[0] + `,`
            programmingLang += `"AndroidJava": `+req.body.req.programmingLang[0].AndroidJava[0] + `,`
            programmingLang += `"Swift": ` + req.body.req.programmingLang[0].Swift[0] + `,`
            programmingLang += `"Objective": ` + req.body.req.programmingLang[0].Objective[0] `,`
            programmingLang += `"Python": `+ req.body.req.programmingLang[0].Python[0]+ `,`
            programmingLang +=  `"PHP": `+req.body.req.programmingLang[0].PHP[0] +`,`
            programmingLang +=  `"C": `+req.body.req.programmingLang[0].C[0]+`,`
            programmingLang += `"Microsoft": `+req.body.req.programmingLang[0].Microsoft[0]+`,`
            programmingLang += `"Kotlin": `+req.body.req.programmingLang[0].Kotlin[0]+`,`
            programmingLang += `"Peral": `+req.body.req.programmingLang[0].Peral[0]+`,`
            programmingLang += `"R": `+ req.body.req.programmingLang[0].R[0] +`,`
            programmingLang += `"VBA": `+req.body.req.programmingLang[0].VBA[0] + `}`

            var frameworkLang = `{`
            frameworkLang += `"Nodejs" : `+req.body.req.frameworkLang[0].Nodejs[0]+`,`
            frameworkLang += `"Angular" : `+ req.body.req.frameworkLang[0].Angular[0]+`,`
            frameworkLang += `"React" : `+ req.body.req.frameworkLang[0].React[0]+`,`
            frameworkLang += `"Expressjs" : `+ req.body.req.frameworkLang[0].Expressjs[0]+`,`
            frameworkLang += `"NetCore" : `+req.body.req.frameworkLang[0].NetCore[0]+`,`
            frameworkLang += `"Spring" : `+ req.body.req.frameworkLang[0].Spring[0]+`,`
            frameworkLang += `"Django" : `+ req.body.req.frameworkLang[0].Django[0]+`,`
            frameworkLang += `"Flask" :`+req.body.req.frameworkLang[0].Flask[0]+`,`
            frameworkLang += `"Cordova" : `+ req.body.req.frameworkLang[0].Cordova[0] +`}`

            var databaseLang = `{`
            databaseLang += `"MySql" : ` +req.body.req.databaseLang.MySql[0] + `,`
            databaseLang += `"SQLServer" : `+req.body.req.databaseLang.SQLServer[0] + `,`
            databaseLang += `"MongoDB" : `+req.body.req.databaseLang.MongoDB[0] + `,`
            databaseLang += `"SQLite" : `+req.body.req.databaseLang.SQLite[0] + `,`
            databaseLang += `"Redis" : `+req.body.req.databaseLang.Redis[0] + `,`
            databaseLang += `"Oracle" : `+req.body.req.databaseLang.Oracle[0] + `,`
            databaseLang += `"Flask" : `+req.body.req.databaseLang.Flask[0] + `,`
            databaseLang += `"Cordova" : `+req.body.req.databaseLang.Cordova[0]+`}`

            var cloudLang = `{`
            cloudLang += `"AWS" : `+req.body.req.cloudLang.AWS[0]+ `,`
            cloudLang += `"Azure" : `+req.body.req.cloudLang.Azure[0]+ `,`
            cloudLang += `"GCP" : `+req.body.req.cloudLang.GCP[0]+ `,`
            cloudLang += `"Linux" : `+req.body.req.cloudLang.Linux[0]+ `,`
            cloudLang += `"Wordpress" : `+req.body.req.cloudLang.Wordpress[0]+ `,`
            cloudLang += `"RaspberryPi" : `+req.body.req.cloudLang.RaspberryPi[0]+ `,`
            cloudLang += `"Arduino" : `+req.body.req.cloudLang.Arduino[0]+ `,`
            cloudLang += `"Firebase" : `+req.body.req.cloudLang.Firebase[0]+ `,`
            cloudLang += `"Docker" : `+req.body.req.cloudLang.Docker[0]+ `,`
            cloudLang += `"Go" : `+req.body.req.cloudLang.Go[0]+`}`

            var machineLang = `{`
            machineLang += `"Tensorflow" : `+req.body.req.machineLang.Tensorflow[0]+ `,`
            machineLang += `"Caffe" : `+req.body.req.machineLang.Caffe[0]+ `,`
            machineLang += `"OpenCV" : `+req.body.req.machineLang.OpenCV[0]+ `,`
            machineLang += `"DLib" : `+req.body.req.machineLang.DLib[0]+ `,`
            machineLang += `"OpenGL" : `+req.body.req.machineLang.OpenGL[0]+ `,`
            machineLang += `"Unity" : `+req.body.req.machineLang.Unity[0]+`,`
            machineLang += `"Arduino" : `+req.body.req.machineLang.Arduino[0]+ `,`
            machineLang += `"Firebase" : `+req.body.req.machineLang.Firebase[0]+`}`

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

router.post('/postStdPickCo', function (req, res) {
    Promise.resolve()
        .then(first)
        .then(second)
        .catch(function (err) {
            console.log('Error', err)
            process.exit()
        })
    function first() {
        return new Promise(function (resolve,reject) {
            var sql1 = 'select sID, cID, sLoginID, cName from student join company where student.sLoginID = ? and company.cName = ?'
            var params1 = [req.body.sLoginID, req.body.cName]
            conn.init().query(sql1, params1, function (err,rows) {
                if(err) console.log(err)
                else{
                    console.log(rows)
                    resolve(rows[0])
                }
            })
        })
    }
    function second(data) {
        return new Promise(function (resolve, reject) {
            var sql2 = 'INSERT INTO stdPickCo (sID, cID) VALUES(?,?)'
            var params2 = [data.sID, data.cID]
            conn.init().query(sql2, params2, function (err, rows) {
                if (err) console.log(err)
                else {
                    console.log(rows)
                    resolve(rows)
                }
            })
        })
    }
})

router.get('/watchStdPickCo', function (req,res) {
    var sql = 'SELECT cName, cImage, cOccupation, cTag, applyStdNum FROM student NATURAL JOIN stdPickCo NATURAL JOIN company NATURAL JOIN companyNotice NATURAL JOIN applyNotice WHERE sLoginID = ?'
    var sLoginID = req.query.sLoginID
    conn.init().query(sql, sLoginID, function (err, rows) {
        if(err) console.log(err)
        else{
            if(rows[0]==null){
                res.send('')
            }
            else {
               res.json(rows)
            }
        }
    })
})

router.post('/deleteStdPickCo', function (req, res) {
    Promise.resolve()
        .then(first)
        .then(second)
        .catch(function (err) {
            console.log('Error', err)
            process.exit()
        })
    function first() {
        return new Promise(function (resolve,reject) {
            var sql1 = 'select stdPickCoID from student natural join stdPickCo natural join company where sLoginID = ? AND cName =?'
            var params1 = [req.body.sLoginID, req.body.cName]
            conn.init().query(sql1, params1, function (err,rows) {
                if(err) console.log(err)
                else{
                    console.log(rows)
                    resolve(rows[0].stdPickCoID)
                }
            })
        })
    }
    function second(data) {
        return new Promise(function (resolve, reject) {
            console.log(data.sLoginID)
            var sql2 = 'DELETE FROM stdPickCo WHERE stdPickCoID = ?'
            var params2 = [data]
            conn.init().query(sql2, params2, function (err, rows) {
                if (err) console.log(err)
                else {
                    console.log(rows)
                    resolve(rows)
                }
            })
        })
    }
})

module.exports = router

