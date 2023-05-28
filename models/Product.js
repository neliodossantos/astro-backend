const mongoose = require('mongoose');
const {Schema} = mongoose;

const ProductSchema = new Schema({
    nome : {
        type : String,
        required : true
    },
    descricao : {
        type : String,
        require: true
    },
    preco : {
        type : Number,
        default: 0,
        require: true
    },
    category : {
         type : mongoose.Schema.Types.ObjectId,
         ref : 'Category',
         required : true
    },
    image : {
        type: String
    },
    owner: {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
   },
}, {timestamps: true});

const Product = mongoose.model("Product",ProductSchema);
module.exports = {
    Product,
    ProductSchema
}