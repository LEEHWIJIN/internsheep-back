var mysql = require('mysql');
var conf = require('../constants')
var connection = mysql.createConnection(conf)

module.exports = {
    connection
}


connection.query('SELECT * FROM Persons', function(err, rows, fields) {
    
    if (!err)
        console.log('The solution is: ', rows);
    else
        console.log('Error while performing Query.', err);
});

