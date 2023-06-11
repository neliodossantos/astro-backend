const mongoose = require('mongoose');
const {Schema} = mongoose;

const PedidoSchema = new Schema({
    mesaId: { type: mongoose.Schema.Types.ObjectId, ref: 'Mesa' },
    productId : {type: mongoose.Schema.Types.ObjectId, ref: 'Product'},
    quantity : {type:Number , Default:1},
    totalPrice : {type:Number},
    status: { type: String, required: true, enum: ['Em espera', 'Entregado'], default: 'Em espera' }
},{timestamps:true});

const Pedido = mongoose.model('Pedido',PedidoSchema);
module.exports = {
    PedidoSchema, Pedido
}