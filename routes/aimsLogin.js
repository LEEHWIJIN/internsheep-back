const express = require('express');
const router = express.Router();
var request = require('request');
var crypto = require('crypto');
var bodyParser = require('body-parser');     
var fs = require('fs');      
const path = require('path');

var cookies;
var id;
var pwd;
var pwd_encoded;       

var no = "";
var name;
var subject;
var grade;
var college;
var picture;        
var score;
                             
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended : true}));
router.use(express.static(path.join(__dirname, 'public')));
router.use((req, res, next) =>{
    res.header("Access-Control-Allow-Origin", "*")
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, authorization")
    next()
})

router.get('/', function(req, res){
	if(no == "")
		res.sendFile('login.html', { root: __dirname });
	else
		res.header('Content-Type', 'text/html').send("<html>"+no+" "+name+" "+score+" "+grade+" "+subject+" "+college+" <img src=\""+picture+"\"/></html>"); 
});
router.get('/check', function(req, res){	
	if(no == "")
			res.sendFile('login.html', { root: __dirname });
	else
		res.header('Content-Type', 'text/html').send("<html>"+no+" "+name+" "+score+" "+grade+" "+subject+" "+college+" <img src=\""+picture+"\"/></html>"); 
});
router.post('/check', function(req, res){	
	id = req.body.userId;
	pwd = req.body.password;
	pwd_encoded = crypto.createHash('sha256').update(pwd).digest('hex');

	doLogin(res);
});

function doLogin(result){
	url = 'https://job.ajou.ac.kr/main/loginpro.aspx?pro=1&rUserid='+id+'&rPW='+pwd+'&rPW2='+pwd_encoded
	header = {
		'Connection':'keep-alive',
		'Accept-Language':'ko-KR,ko,en-US,en',
		'User-Agent':'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/8.2 Chrome/63.0.3239.111 Safari/537.36',
		'Upgrade-Insecure-Requests':1,
		'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
		'Accept-Encoding': 'gzip, deflate, br'
	};

	request({url: url, headers: header}, function(err, res, html) {
		if (err) {
        				console.log(err);
				return;
		}	

		cookies = "";
		var htmls = html.split('\n');
		for(var i in htmls){
			if(htmls[i].indexOf('document.cookie')>=0){
				var start = htmls[i].indexOf('"') + 1;
				var end = htmls[i].indexOf(';') - 1;
				var text = htmls[i].substr(start, end - start + 1);
				cookies += text + ";"; 
			}
		}
		if(cookies != "")
			getInfo(result);
		else{
			console.log("Please Check your Input!");
			result.sendFile('login.html', { root: __dirname });
		}	
	});
}
function getInfo(result){
	url = 'https://job.ajou.ac.kr';
	header = {
		'Connection':'keep-alive',
		'Accept-Language':'ko-KR,ko,en-US,en',
		'User-Agent':'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/8.2 Chrome/63.0.3239.111 Safari/537.36',
		'Upgrade-Insecure-Requests':1,
		'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
		'Accept-Encoding': 'gzip, deflate, br',
		'Cookie': cookies
	};

	request({url: url, headers: header}, function(err, res, html) {
		if (err) {
        				console.log(err);
				return;
		}	

		var htmls = html.split('\n');
		for(var i in htmls){
			if(htmls[i].indexOf('v_char')>=0){
				var text = htmls[i].split('&');
				no = htmls[i].split('=')[2].split('&')[0];
				name = text[1].split('=')[1];
				subject = text[2].split('=')[1];
				grade = text[3].split('=')[1];
				college = text[4].split('=')[1].split('/')[0];    
				console.log(no, name, subject, grade, college);
				break;
			}
		}
		if(no != '')
			getPicture(result);
		else{
			console.log("Please Check your Input!");
			result.sendFile('login.html', { root: __dirname });
		}	
	});
}


function getPicture(result){
	url = 'https://job.ajou.ac.kr/office/Teacher/Per/PerPic.aspx?pid='+no;
	header = {
		'Connection':'keep-alive',
		'Accept-Language':'ko-KR,ko,en-US,en',
		'User-Agent':'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/8.2 Chrome/63.0.3239.111 Safari/537.36',
		'Upgrade-Insecure-Requests':1,
		'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
		'Accept-Encoding': 'gzip, deflate, br',
		'Cookie': cookies
	};

	request({url: url, headers: header}, function(err, res, html) {
		if (err) {
        				console.log(err);
				return;
		}	

		var text = html.substr(html.indexOf('src')+5);
		picture = 'https://job.ajou.ac.kr'+text.split("'")[0];

		console.log(picture);
		getScore(result);
	});
}

function getScore(result){
	url = 'https://job.ajou.ac.kr/career/default.aspx';
	header = {
		'Connection':'keep-alive',
		'Accept-Language':'ko-KR,ko,en-US,en',
		'User-Agent':'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/8.2 Chrome/63.0.3239.111 Safari/537.36',
		'Upgrade-Insecure-Requests':1,
		'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
		'Accept-Encoding': 'gzip, deflate, br',
		'Cookie': cookies
	};

	request({url: url, headers: header}, function(err, res, html) {
		if (err) {
        				console.log(err);
				return;
		}	

		var htmls = html.split('\n');
		for(var i in htmls){
			if(htmls[i].indexOf('ScorePer')>=0){
				var start = htmls[i].indexOf('>') + 1;
				var text = htmls[i].substr(start);
				score = text.split('<')[0];

				console.log(score);
				result.header('Content-Type', 'text/html').send("<html>"+no+" "+name+" "+score+" "+grade+" "+subject+" "+college+" <img src=\""+picture+"\"/></html>"); 
				break;
			}
		}
	});
}

module.exports = router;