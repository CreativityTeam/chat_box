var express = require('express');
var app = express();

app.get('/test',function(req,res){
    res.send("Test ok");
});

module.exports = app;