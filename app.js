var createError = require('http-errors');
var express = require('express');
var logger = require('morgan');
var indexRouter = require('./routes/chartsRouter');
var path = require('path');
var cors = require('cors');

var app = express();
var corsOptions = {
  origin: '*'
}
app.use(cors(corsOptions));

var mongo = require('mongodb').MongoClient;;
var dbops = require('./db/dbOps');
const dbUrl = 'mongodb://localhost:27017';
const dbName = 'crawler';
const collection = "amazon";
const fixedItems = {"items":['shirts','jeans','socks','coat','bike']};


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use('/api/charts', indexRouter);

app.use(function(req, res, next) {
  next(createError(404));
});


app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  console.log(err)
  res.status(err.status || 500);
  res.render('error');
});
var hostname = 'localhost';
var port = 3000;

mongo.connect(dbUrl, function(err, client) {
  
  console.log("Connected successfully to Database");
 
  const db = client.db(dbName);
 
dbops.getDocuments(db,collection,{items : {$exists:true}},function(result){
  if(result<=0){
    dbops.insertDocuments(db,collection,fixedItems,function(result){
      console.log("docs inserted");
      console.log(result);
    })
  }
});

  app.listen(port, hostname, function(){
    console.log('Application running at http://'+hostname+':'+port);
  });
  
});



