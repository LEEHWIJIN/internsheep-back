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

router.get('/getTag', function(req,res)
{
    var sqlQuery = 'SELECT * FROM tag WHERE tag = ?'
    var tag = req.query.tag
     
    conn.init().query(sqlQuery, tag, function(rows,err)
    {
        if(err) res.send(err)
        else
        {
            res.send(rows)
        }
    })
})

router.post('/addTag', function(req,res)
{
    var sqlQuery = 'INSERT INTO tag (tag) VALUES(?)'
    var tag = req.body.tag
  
    conn.init().query(sqlQuery, tag, function(err, rows)
    {
        if(err)
        {
            console.log(err.code)
            if(err.code =='ER_DUP_ENTRY')
                res.send('1')
            else
                res.send(err)
        }
        else
        {
            console.log(rows)
            res.send('1')
        }
    })
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