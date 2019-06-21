var nodemail = require('nodemailer');
var config = require('../certification/email').test;

module.exports = function() {
    return {
        init: function () {
            return nodemail.createTransport(
                {
                    service: config.service,
                    auth: 
                    {
                        user: config.auth.user,
                        pass: config.auth.pass
                    }
                }
            )
        }
    }
}