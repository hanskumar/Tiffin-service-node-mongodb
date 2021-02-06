/*-------------Add to Cart Functionality----------------*/
module.exports = function Cart(OldCart){
    this.items = OldCart.items || {};
    this.totalQty = OldCart.totalQty || 0;
    this.totalPrice = OldCart.totalPrice || 0;

    this.add = function(item,id){
        
        var storedItem = this.items[id];
        if(!storedItem){
            storedItem = this.items[id] = {item: item, qty:0, price: 0,item_id:id };
        }

        storedItem.qty++;
        //console.log(storedItem.item.price);
        storedItem.price =  storedItem.item.price * storedItem.qty;
        //storedItem =  price*storedItem.qty;
        this.totalQty++;
        this.totalPrice += parseInt(storedItem.item.price);   

    };

    this.remove = function(id) {
        this.totalItems -= this.items[id].qty;
        this.totalPrice -= this.items[id].price;
        delete this.items[id];
    };

    this.getItems = function() {
        var arr = [];
        for (var id in this.items) {
            arr.push(this.items[id]);
        }
        return arr;
    };

};

//module.exports = Cart;
