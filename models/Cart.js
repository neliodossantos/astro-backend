const mongoose = require('mongoose');
const {Schema} = mongoose;


const cartItemSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  quantity: { type: Number, default: 1 }
});

const cartSchema = new mongoose.Schema({
  // mesaId: { type: mongoose.Schema.Types.ObjectId, ref: 'Mesa' },
  items: [cartItemSchema]
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = {
    Cart, cartSchema
}
