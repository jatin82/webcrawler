
var db = {
    insertDocuments : function(db,docs,data,callback) {
        collection = db.collection(docs);
        
        collection.insert(data, function(err, result) {
          
            if(err!==null){
                throw err;
            }
            console.log("Db Insert success");
          
          callback(result);
        });
      },

      getDocuments : function(db,docs,data,callback){
        let collection = db.collection(docs);
        
        collection.find(data).toArray(function(err, docs) {
          
            if(err!==null){
                throw err;
            }
            console.log("Found the following records");
            console.log(docs)
            callback(docs);
        });
      }
}

module.exports = db;