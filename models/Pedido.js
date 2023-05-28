const mongoose = require('mongoose');

const {Schema} = mongoose;

const cartItemSchema = new mongoose.Schema({
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    quantity: { type: Number, default: 1 }
  });
const PedidoSchema = new Schema({
    idMesa : { type: mongoose.Schema.Types.ObjectId , ref: 'Mesa' },
    items: [cartItemSchema],
    total : {
        type: Number
    },
    comentario: { type: String },
    status: { type: String, required: true, enum: ['Em espera', 'Entregado'], default: 'Em espera' }
},{timestamps:true});

const Pedido = mongoose.model('Pedido',PedidoSchema);
module.exports = {
    PedidoSchema, Pedido
}