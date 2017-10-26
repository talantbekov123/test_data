var csv = require("fast-csv");
var mysql = require('mysql');


var pool  = mysql.createPool({
	connectionLimit : 10,
	host     : 'localhost',
	user     : 'root',
	password : ' ',
	database : 'datar'
});

/* Axilary drop tables script */
var dropTbl = "DROP TABLE result";
var createTbl = `create table result(
		appln_id INT(18),
		parent_appln_id INT(18),
		contn_type INT(18),
		cpc_version INT(18)
	);`
var insert = `INSERT INTO results`;
pool.getConnection(function(err, connection) {
	if (err) throw err;
	console.log("Connected to MYSQL!");
	connection.query(dropTbl, function (error, results, fields) {
		if (err) throw err;
		connection.query(createTbl, function (error, results, fields) {
			csv
			.fromPath("new_tls216.csv", {headers: true})
			.on("data", function(data){
				let promise = new Promise(function(resolve, reject) {
					var fn = function() {
						connection.query('INSERT INTO result SET ?', data, function (error, results, fields) {
							console.log('Add data');
							var datetime = new Date();
							console.log(datetime);
						});
					}
					resolve(fn);
				});

				promise.then(
              		result => {
              			result();
              		}
              	)
			})
			.on("end", function(){
				console.log("done new_tls216");
			});
		});
	});
});	