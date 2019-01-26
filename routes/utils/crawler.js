
var Crawler = require("node-webcrawler");
var cheerio = require('cheerio');
const rp = require('request-promise');

new Crawler()
var crawler = {
    crawler : new Crawler({
        maxConnections : 10,
        
        callback : function (error, result, $) {
            // defualt callback
            if(error){
                console.log(error);
            }else{
                console.log($("title").text());
            }
        }
      }),

      fetchItem2: function(uri,i,tag,itemDetails){
          
        this.crawler.queue([{
            uri: uri,
            callback: function (error, result,$) {
                if(error){
                    console.log(error);
                }else{
                    console.log("i is "+i);
                    let item = {[i]:$(tag).text()};
                    console.log(item);
                    console.log('Grabbed', result.body.length, 'bytes');
                    itemDetails.addItem(item);
                }
            }
        }])
        
      },
      fetchItem : function(uri){
        return rp({url:uri,timeout:420 * 1000,maxRedirects:10,encoding:'utf8',gzip:true,resolveWithFullResponse: true})
      }

}

module.exports = crawler;
//.pagnDisabled