const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();
const mysql = require('../db/database_config.js')
var conn = mysql()

router.post("/nodemailerTest", function(req, res, next){
    console.log(req.body)
            var sql = 'select * from student natural join resume natural join stdApplyCo natural join company natural join companyNotice natural join applyNotice natural join applyTerm where cLoginID =? AND applySemester=? AND applyOrder =?'
            var params = [req.body.cLoginID, req.body.applySemester, req.body.applyOrder]
    console.log(params)
            conn.init().query(sql, params, function (err,rows) {
                if(err) console.log(err)
                else {
                    console.log('sdfs')
                    console.log(rows)
                    for (var i = 0; i < rows.length; i++) {
                        console.log(rows[i].cName)
                        let transporter = nodemailer.createTransport({
                            service: 'gmail',
                            auth: {
                                user: 'internsheep2019@gmail.com',  // gmail 계정 아이디를 입력
                                pass: 'dlsxjstnlq1!'          // gmail 계정의 비밀번호를 입력
                            }
                        });

                        let mailOptions = {
                            from: 'internsheep2019@gmail.com',    // 발송 메일 주소 (위에서 작성한 gmail 계정 아이디)
                            to: rows[i].sEmail,                     // 수신 메일 주소
                            subject: '지원하신 회사가 합격여부를 결정하였습니다!',   // 제목
                            text: rows[i].sName + '님을 인턴쉽에 지원해 주셔서 감사합니다.\n지원하신 회사 ' + rows[i].cName + '에 '
                        };

                        if (rows[i].YN == 1) {
                            mailOptions.text += '합격하셨습니다! 축하드립니다.'
                        }
                        else if (rows[i].YN == 0) {
                            mailOptions.text += '불합격하셨습니다. 다른 곳에 지원해보세요!'
                        }

                        console.log(mailOptions)
                        transporter.sendMail(mailOptions, function (error, info) {
                            if (error) {
                                console.log(error);
                            }
                            else {
                                console.log('Email sent: ' + info.response);
                            }
                        });
                    }
                }
            })
        })

module.exports = router;