var csv = require("fast-csv");

csv
 .fromPath("one.csv", {headers: true})
 .on("data", function(data){
     console.log(data);
 })
 .on("end", function(){
     console.log("done");
 });