const Router = require('express')
const router = Router()
const mysql = require('../db/database_config.js')
var conn = mysql()
let multer = require('multer')
var fs = require("fs")
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './temp/') // cb 콜백함수를 통해 전송된 파일 저장 디렉토리 설정
    },
    filename: function (req, file, cb) {
        console.log(req.body)
        cb(null, file.originalname)
    }
})

var upload = multer({storage: storage})

router.get('/getAllTag', function(req,res)
{
    var sqlQuery = 'SELECT tag FROM tag'
     
    conn.init().query(sqlQuery
        , function(rows,err)
    {
        if(err) res.send(err)
        else
        {
            res.json(rows)
        }
    })
})

router.get('/getCoTag', function(req,res)
{
    var sqlQuery = 'SELECT tag FROM tag natural join coAndTag natural join company natural join companyNotice WHERE cLoginID = ?'
    var cName = req.query.cLoginID

    conn.init().query(sqlQuery, cName, function(rows,err)
    {
        if(err) res.send(err)
        else
        {
            res.json(rows)
        }
    })
})

router.post('/addTag', function(req,res)
{
    var sqlQuery = 'INSERT INTO tag (tag) VALUES(?)'
    var tag = req.body.tag
  
    conn.init().query(sqlQuery, tag, function(err, rows)
    {
        if(err) console.log(err)
        else
        {
            console.log(rows)
            res.send('1')
        }
    })
})

router.post('/addCoAndTag', function(req,res)
{
    Promise.resolve()
    .then(search)
        .then(deleteTag)
        .then(first)
        .then(second)
        .then(three)
        .catch(function (err) {
            console.log('Error', err)
            process.exit()
        })

        function search(){
            return new Promise(function (resolve,reject) {
            var sql = 'select coAndTagID From company natural join companyNotice natural join coAndTag natural join tag where cLoginID = ?'
            conn.init().query(sql, req.body.cLoginID, function(err, rows)
            {
                if(err) console.log(err)
                else
                {
                    if(rows[0]==null){
                        resolve(0)
                    }
                    else{
                        resolve(rows)
                    }
                    
                }
            })
        })

        }
        function deleteTag(data)
        {
            return new Promise(function (resolve,reject) {
                if(data==0){
                    console.log('삭제한것 없음')
                    resolve()
                }
                else{
                
                for(var i=0;i<data.length;i++){
                    var sql = 'delete from coAndTag where coAndTagID = ?'
                    conn.init().query(sql,data[i].coAndTagID, function(err, rows)
                    {
                        if(err) console.log(err)
                        else
                        {
                            console.log(i)
                    
                        }
                    })
                    if(i==data.length-1){resolve()}
                }
                
            }
            })
        }

    function first()
    {
        return new Promise(function (resolve,reject) {
            var sql = 'select cNoticeID from company natural join companyNotice where cLoginID = ?'
            conn.init().query(sql, req.body.cLoginID, function(err, rows)
            {
                if(err) console.log(err)
                else
                {
                    console.log('first 들어옴 ' +rows[0])
                    resolve(rows[0].cNoticeID)
                }
            })
        })
    }
    function second(cNoticeID)
    {
        return new Promise(function (resolve,reject) {
            var sql = 'select tagID from tag where tag = ?'
            for(var i =0 ;i<req.body.tag.length-1; i++){
                sql += 'union select tagID from tag where tag = ?'
            }
            var params = req.body.tag
            conn.init().query(sql, params, function(err, rows)
            {

                if(err) console.log(err)
                else
                {
                    var data = {
                        cNoticeID : cNoticeID,
                        tagID : []
                    }
                    for(var i =0 ; i<rows.length; i++){
                        data.tagID.push(rows[i].tagID)
                    }
                    console.log(data)
                    resolve(data)
                }
            })
        })
    }
    function three(data)
    {
        return new Promise(function (resolve,reject) {
            console.log(data)
            var sql3 = 'INSERT INTO coAndTag (tagID, cNoticeID) VALUES(?,?)'
            var params3 = [data.tagID[0], data.cNoticeID]
            for(var i =1 ;i<data.tagID.length; i++) {
                sql3 += ', (?,?)'
                params3.push(data.tagID[i], data.cNoticeID)
            }
            conn.init().query(sql3, params3, function(err, rows)
            {
                if(err) console.log(err)
                else
                {
                    console.log(rows)
                    resolve()
                    res.send(rows)
                }
            })

        })
    }
})

router.get('/getProfileImage', function(req,res)
{
    Promise.resolve()
    .then(loadImage)
    .then(sendImage)
    .then(deleteTempImage)
    .catch(function (err) {
        console.log('Error', err)
        process.exit()
    })
    function loadImage()
    {
        console.log('load image...')
        var name = req.query.cName
        var sql = 'SELECT cName, cImage FROM company WHERE cName = ?'
        return new Promise(function (resolve,reject)
        {
            conn.init().query(sql, name, function(err, rows)
            {
                if(err) res.send(err)
                else
                {
                    var filePath = 'temp/' + name + 'Profile.png'
                    fs.writeFileSync(filePath, rows[0].cImage)
                    var imageAndPath = [rows[0].cImage, filePath]
                    resolve(imageAndPath)
                }
            })
        })
    }
    function sendImage(imageAndPath)
    {
        console.log('send image...')
        return new Promise(function (resolve,reject)
        {
            res.writeHead(200, {"Content-Type": "image/png"});
            res.write(imageAndPath[0]);
            res.end();
            resolve(imageAndPath[1])
        })
    }
    function deleteTempImage(filePath)
    {
        console.log('deleting temp image...')
        return new Promise(function (resolve,reject)
        {
            console.log(filePath+' deleting...')
            fs.unlink(filePath, function(err)
            {
                if(err) console.log(err)
                else
                {
                    console.log('successfully load image and deleted temp image')
                }
            })
        })
    }
})

module.exports = router