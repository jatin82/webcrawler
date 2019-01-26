



var itemFactory = {
    items : [],
    getItemByName :function(item){
        return this.items[item]
    },
    getItems : function(){
        return this.items;
    }
}

module.exports = itemFactory;
