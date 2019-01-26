var express = require('express');
var Template = require('template-js')
var path = require('path');

var items = require('../factory/itemFactory').getItems();
var itemDetails = require('../factory/itemDetails');
var crawler = require('../routes/utils/crawler');
var cheerio = require('cheerio');
const url = 'https://www.amazon.com/s/ref=nb_sb_noss_1?url=search-alias%3Daps&field-keywords=';


var mongo = require('mongodb').MongoClient;;
var dbops = require('../db/dbOps');
const dbUrl = 'mongodb://localhost:27017';
const dbName = 'crawler';
const collection = "amazon";

var tag = ".pagnDisabled";

var mainRouter  = express.Router();



const htmlparser2 = require('htmlparser2');

mainRouter.route('/')
.all(function(req,res,next) {
        res.set('Content-Type', 'application/json');
      next();
})

.get(function(req,res,next){
        
        console.log("Getting charts data");
        
        


        mongo.connect(dbUrl, function(err, client) {
  
                console.log("Connected successfully to Database");
               
                const db = client.db(dbName);
               
              dbops.getDocuments(db,collection,{items : {$exists:true}},function(result){
                items = result[0].items;
                console.log(items);
                fetchChartData(res,db,client);
                
              });
        });






          
});

var fetchChartData = function(res,db,client){

        if(itemDetails.getAllItemsCollections().length<=0){

                dbops.getDocuments(db,collection,{itemCounts : {$exists:true}},function(result){
                        console.log(result);
                        if(result.length<=0){
                                var promises = [];
                                items.forEach(function(i){
                                        var uri = url+i;
                                        console.log("getting "+uri);
                                        crawler.fetchItem(uri,i,tag,itemDetails); 
                                        promises.push(
                                                crawler.fetchItem(uri,i,tag,itemDetails)
                                                .then(function(html) {
                        
                                                var $ = cheerio.load(html.body);
                                                let ans = $(tag).text();
                                                console.log("i is "+i);
                                                let item = {[i]:ans};
                                                console.log(item);
                                                itemDetails.addItem(item);
                                                })
                                        );                  
                                });
                                Promise.all(promises).then(()=>{
                                        console.log(itemDetails.getAllItemsCollections());
                                        dbops.insertDocuments(db,collection,{itemCounts:itemDetails.getAllItemsCollections()},function(result){
                                                console.log("saved");
                                                console.log(result);
                                                client.close();
                                        });
                                        res.end(JSON.stringify(itemDetails.getAllItemsCollections()));
                                })
                        }
                        else{
                                console.log("found in db");
                                itemDetails.itemWithCount = result[0].itemCounts;
                                client.close();
                                res.end(JSON.stringify(itemDetails.getAllItemsCollections()));
                        }
                      });

                
        }
        else{
                console.log("found in cache");
                console.log(itemDetails.getAllItemsCollections())
                client.close();
                res.end(JSON.stringify(itemDetails.getAllItemsCollections()));
        }
}

module.exports = mainRouter;
