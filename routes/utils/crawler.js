
const rp = require('request-promise');

new Crawler()
var crawler = {
      fetchItem : function(uri){
        return rp({url:uri,timeout:420 * 1000,maxRedirects:10,encoding:'utf8',gzip:true,resolveWithFullResponse: true})
      }

}

module.exports = crawler;