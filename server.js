var express = require('express');
var path = require('path');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('contactlist');
var bodyParser = require('body-parser');




app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/public/admin'));
app.use(express.static(__dirname + '/public/admin/dashboard'));
// app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.static(path.join(__dirname, 'public/admin')));
app.use(bodyParser.json());


var admin = require('./server/admin');

app.use('/admin',admin);



app.listen(3333);
console.log('Server Running at 3333');