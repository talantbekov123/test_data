var csv = require("fast-csv");
var mysql = require('mysql');


var pool  = mysql.createPool({
	host     : 'localhost',
	user     : 'root',
	password : ' ',
	database : 'datar'
});

var insert = `INSERT INTO results`;
pool.getConnection(function(err, connection) {
	if (err) throw err;
	csv
	.fromPath("new_tls224.csv", {headers: true})
	.on("data", function(data){
		connection.query('UPDATE result SET cpc_version = ? WHERE appln_id = ?', [data.cpc_version, data.appln_id], function (error, results, fields) {
			if (error) {
				console.log(error)
				connection.query('INSERT INTO result SET ?', data, function (error, results, fields) {
					if (error) throw error;
					console.log('Add data');
				});
				console.log('Update data');
			}
		});
	})
	.on("end", function(){
		console.log("done new_tls224");
	});
});