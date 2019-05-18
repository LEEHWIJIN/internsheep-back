const Router = require('express')
const router = Router()
const mysql = require('../db/database_config.js')
var conn = mysql()
const joi = require('joi')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { SECRET } = require('../constants');

const signup = joi.object().keys({
    name:joi.string().regex(/^[a-zA-Z0-9가-힣]+$/).min(2).max(30).required(),
    id:joi.string().alphanum().min(4).max(30).required(),
    password:joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required()
});

router.post('/std/signup',(req,res)=>{
    const result = joi.validate(req.body.user, signup);//조건에 맞는지 검사 result 가 뱉는 에러메세지로 나중에 프론트에서 띄워줘야함
    if(result.error === null){
        var sql1 = 'select sLoginID from student where sLoginID = ?'
        var sLoginID = req.body.user.id
        
        conn.init().query(sql1,sLoginID,function(err,rows){
            if(err) console.log(err)
            else {
                if(rows.length == 0){
                    bcrypt.hash(req.body.user.password, 12).then(hashed => {
                        var sql2 = 'insert into student (sName, sPassword, sLoginID) values(?,?,?) '
                        var sName = req.body.user.name
                        var sLoginID = req.body.user.id
                        var sPassword = hashed
                        var params = [sName, sPassword, sLoginID]
                        conn.init().query(sql2, params, function(err,rows){
                            if(err) console.log(err)
                            else {
                                res.send({result : 1})
                            }
                        })

                    })
                
                }
            }
        })
    }
    else
    {
        if(result.error.message == 'child "name" fails because ["name" length must be less than or equal to 30 characters long]')
        {
            console.log('이름은 30자 이하여야합니다.')
            res.json('이름은 30자 이하여야합니다.')
        }
        else if(result.error.message == 'child "name" fails because ["name" length must be at least 2 characters long]')
        {
            console.log('이름은 한글자 이상이여야합니다.')
            res.json('이름은 한글자 이상이여야합니다.')
        }
        else if(result.error.message == 'child "id" fails because ["id" length must be at least 4 characters long]')
        {
            console.log('아이디는 최소 4글자 이상이여야합니다.')
            res.json('아이디는 최소 4글자 이상이여야합니다.')
        }
        else if(result.error.message == 'child "id" fails because ["id" length must be less than or equal to 30 characters long]')
        {
            console.log('아이디는 최대 30글자입니다.')
            res.json('아이디는 최대 30글자입니다.')
        }
        else
        {
            console.log(result.error.message)
            res.json(result.error);//조건에 안맞을때
        }
    }
})

router.post('/std/login',(req,res)=>{
    var sql1 = 'select sPassword,sLoginID,sName,sID from student where sLoginID = ?'
    var sLoginID = req.body.user.id
    conn.init().query(sql1, sLoginID, function(err,rows){
        if(err) console.log(err)
        else{
            if(rows.length == 1){
                bcrypt.compare(req.body.user.password,rows[0].sPassword).then(function(result){
                    if(result){
                        const payload = {
                            sId: rows[0].sID,
                            name: rows[0].sName,
                            loginId: rows[0].sLoginID
                        };
                        jwt.sign(payload, SECRET,{
                            expiresIn: '1d'
                        },(err, token) => {
                            if(err){
                                console.log(err)
                                return res.status(404).json({error:'토큰만료'});
                            }
                            else{
                                res.json({token})
                            }
                        });
                    }
                    else{
                        return res.status(404).json({error:'비번틀림'});
                    }
                })
            }
            else{
                return res.status(404).json({error:'fail'});
            } 
        }
    })
})

router.get('/std/dupcheck',function(req,res){
    var id = req.query.id;
    var sql = 'select sLoginID from student where sLoginID = ?'
    var param = [id]
    conn.init().query(sql, param, function(err, rows){
        if(err) console.log(err)
        else {
            if(rows.length==0){//not duplicate
                return res.send({result:0})
            }
            else{
                return res.send({result:1})
            }
        }
    })
})

router.post('/co/signup',(req,res)=>{
    const result = joi.validate(req.body.user, signup);//조건에 맞는지 검사 result 가 뱉는 에러메세지로 나중에 프론트에서 띄워줘야함
    if(result.error === null){
        var sql1 = 'select cLoginID from company where cLoginID = ?'
        var sLoginID = req.body.user.id
        
        conn.init().query(sql1,sLoginID,function(err,rows){
            if(err) console.log(err)
            else {
                if(rows.length == 0){
                    bcrypt.hash(req.body.user.password, 12).then(hashed => {
                        var sql2 = 'insert into company (cName, cPassword, cLoginID) values(?,?,?) '
                        var cName = req.body.user.name
                        var cLoginID = req.body.user.id
                        var cPassword = hashed
                        var params = [cName, cPassword, cLoginID]
                        conn.init().query(sql2, params, function(err,rows){
                            if(err) console.log(err)
                            else {
                                res.send({result : 1})
                            }
                        })

                    })
                
                }
            }
        })
    }
    else
    {
        if(result.error.message == 'child "name" fails because ["name" length must be less than or equal to 30 characters long]')
        {
            console.log('이름은 30자 이하여야합니다.')
            res.json('이름은 30자 이하여야합니다.')
        }
        else if(result.error.message == 'child "name" fails because ["name" length must be at least 2 characters long]')
        {
            console.log('이름은 한글자 이상이여야합니다.')
            res.json('이름은 한글자 이상이여야합니다.')
        }
        else if(result.error.message == 'child "id" fails because ["id" length must be at least 4 characters long]')
        {
            console.log('아이디는 최소 4글자 이상이여야합니다.')
            res.json('아이디는 최소 4글자 이상이여야합니다.')
        }
        else if(result.error.message == 'child "id" fails because ["id" length must be less than or equal to 30 characters long]')
        {
            console.log('아이디는 최대 30글자입니다.')
            res.json('아이디는 최대 30글자입니다.')
        }
        else
        {
            console.log(result.error.message)
            res.json(result.error);//조건에 안맞을때
        }
    }
})

router.post('/co/login',(req,res)=>{
    var sql1 = 'select cPassword,cLoginID,cName, cID from company where cLoginID = ?'
    var cLoginID = req.body.user.id
    conn.init().query(sql1, cLoginID, function(err,rows){
        if(err) console.log(err)
        else{
            if(rows.length == 1){
                bcrypt.compare(req.body.user.password,rows[0].cPassword).then(function(result){
                    if(result){
                        const payload = {
                            sId: rows[0].cID,
                            name: rows[0].cName,
                            loginId: rows[0].cLoginID
                        };
                        jwt.sign(payload, SECRET,{
                            expiresIn: '1d'
                        },(err, token) => {
                            if(err){
                                console.log(err)
                                return res.status(404).json({error:'토큰만료'});
                            }
                            else{
                                res.json({token})
                            }
                        });
                    }
                    else{
                        return res.status(404).json({error:'비번틀림'});
                    }
                })
            }
            else{
                return res.status(404).json({error:'fail'});
            } 
        }
    })
})

router.get('/co/dupcheck',function(req,res){
    var id = req.query.id;
    var sql = 'select cLoginID from company where cLoginID = ?'
    var param = [id]
    conn.init().query(sql, param, function(err, rows){
        if(err) console.log(err)
        else {
            if(rows.length==0){//not duplicate
                return res.send({result:0})
            }
            else{
                return res.send({result:1})
            }
        }
    })
})

module.exports = router