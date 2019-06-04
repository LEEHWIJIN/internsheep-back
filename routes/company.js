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
    var name = req.query.cName
    var sql = 'SELECT cName, cImage FROM company WHERE cName = ?'
    conn.init().query(sql, name, function(err, rows)
    {
        if(err) res.send(err)
        else
        {
            const buf = new Buffer(rows[0].cImage, "binary");
            console.log(rows[0].cImage)
            fs.writeFileSync('temp/' + name + 'Profile.png', buf)
            res.send('1')
        }
    })
})

module.exports = router