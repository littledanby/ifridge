var fs = require('fs'),
    bodyParser = require('body-parser'),
    express = require('express'); // file system module
var AWS = require('aws-sdk');

//var times = [];

var table_name = 'xdk_table';

AWS.config.loadFromPath('./config.json');


var app = express();
app.use(bodyParser.json({}));
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/data', function (req, res) {
    var dev_times = [];
    var local_times = [];
    var hums = [];
    var lights = [];
    var temps = [];
    var db= new AWS.DynamoDB();

    db.scan({TableName:table_name}, function(err, data) {
        var items = data.Items;
        //console.log(items);
        for(var i=0; i<items.length; i++) {
            dev_times.push(items[i].device_time.N);
            local_times.push(items[i].local_time.S);
            hums.push(items[i].humidity.N);
            lights.push(items[i].light.N);
            temps.push(items[i].temp.N);
        }
        console.log("Receive post");
        var tmp = {
            "times": dev_times,
            "hums" : hums,
            "temps": temps
        };
        console.log(tmp);
        res.json(tmp);
    });
});

app.listen(7003);




function update_data(tablename){
    var dev_times = [];
    var local_times = [];
    var hums = [];
    var lights = [];
    var temps = [];
    var db= new AWS.DynamoDB();

    db.scan({TableName:tablename}, function(err, data) {
        var items = data.Items;
        //console.log(items);
        for(var i=0; i<items.length; i++) {
            dev_times.push(items[i].device_time.N);
            local_times.push(items[i].local_time.S);
            hums.push(items[i].humidity.N);
            lights.push(items[i].light.N);
            temps.push(items[i].temp.N);
        }
        console.log("Receive post");
        var tmp = {
            "times": dev_times,
            "hums" : hums,
            "temps": temps
        };
        return tmp;
    });

}