
var itemDetails = {
    itemWithCount : [],
    addItem : function(item){
        this.itemWithCount.push(item);
    },
    getAllItemsCollections : function(){
        return this.itemWithCount;
    }
}

module.exports = itemDetails;
