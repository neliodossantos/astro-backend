const mongoose = require('mongoose');
const {Schema} = mongoose;



const cartSchema = new mongoose.Schema({
    mesaId: { type: mongoose.Schema.Types.ObjectId, ref: 'Mesa' },
    productId : {type: mongoose.Schema.Types.ObjectId, ref: 'Product'},
    quantity : {type:Number , Default:1}
});
const Cart = mongoose.model('Cart', cartSchema);

module.exports = {
    Cart, cartSchema
}
