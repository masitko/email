"use strict";

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

var mongoose = require('./config/mongoose');
var express = require('./config/express');
var passport = require('./config/passport');

var db = mongoose();
var app = express();
var passport = passport();

app.listen(8019);
module.exports = app;

console.log('Server running at http://localhost:8019/, env: ' + process.env.NODE_ENV );


