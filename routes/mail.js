const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();

router.post("/nodemailerTest", function(req, res, next){

    Promise.resolve()
        .then(first)
        .then(second)
        .catch(function (err) {
            console.log('Error', err)
            process.exit()
        })

    function first() {
        return new Promise(function (resolve, reject) {
            var sql1 = 'select cName from company where cLoginID = ?'
            var params1 = [req.body.cLoginID]
            conn.init().query(sql1, params1, function (err, rows) {
                if (err) console.log(err)
                else {
                    console.log(rows)
                    resolve(rows[0])
                }
            })
        })
    }

    function second(cName) {
        return new Promise(function (resolve, reject) {
            var sql = 'select sEmail from student where sLoginID = ?'

            for(var i =0 ;i<req.body.data.length;i++) {
                var params = [req.body.data[i].sLoginID]
                conn.init().query(sql, params, function (err,rows) {
                    if(err) console.log(err)
                    else{
                        var sEmail = rows[0];
                        var YN = req.body.data[i].YN
                        var sName = req.body.data[i].sName

                        let transporter = nodemailer.createTransport({
                            service: 'gmail',
                            auth: {
                                user: 'internsheep2019@gmail.com',  // gmail 계정 아이디를 입력
                                pass: 'dlsxjstnlq1!'          // gmail 계정의 비밀번호를 입력
                            }
                        });

                        let mailOptions = {
                            from: 'internsheep2019@gmail.com',    // 발송 메일 주소 (위에서 작성한 gmail 계정 아이디)
                            to: sEmail,                     // 수신 메일 주소
                            subject: '지원하신 회사가 합격여부를 결정하였습니다!',   // 제목
                            text: sName + '님을 인턴쉽에 지원해 주셔서 감사합니다.\n지원하신 회사 ' + cName + '에 '
                        };

                        if (YN == 1) {
                            text += '합격하셨습니다! 축하드립니다.'
                        }
                        else if (YN == 0) {
                            text += '불합격하셨습니다. 다른 곳에 지원해보세요!'
                        }

                        transporter.sendMail(mailOptions, function (error, info) {
                            if (error) {
                                console.log(error);
                            }
                            else {
                                console.log('Email sent: ' + info.response);
                            }
                        });
                        resolve(rows)
                    }
                })
            }
        })
    }
})

module.exports = router;