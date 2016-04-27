"use strict";

const express = require('express');
const app = express();
const path = require('path');
const expressLayouts = require('express-ejs-layouts');


app.set('port', (process.env.PORT || 5000));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(expressLayouts);

app.use(express.static(__dirname + '/public'));

const calculate = require('./models/calculate');

app.get('/', (request, response) => {
  response.render('index',{title: "CSV"});
});

app.get('/csv', (request, response) => {
  response.send({"rows" : calculate(request.query.textocsv)});
});

const mongoose = require("mongoose");

mongoose.connect('mongodb://localhost/data');

const fichero= require('./mdschema');

app.get('/descfich', function (request, response ){
  fichero.find({}, function(err,data){
    if(err)
      return err;
      response.send(data);
  });
});

app.listen(app.get('port'), () => {
    console.log(`Node app is running at localhost: ${app.get('port')}` );
});