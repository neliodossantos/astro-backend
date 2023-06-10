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
        default: 0
    },
    category : {
         type : mongoose.Schema.Types.ObjectId,
         ref : 'Category'
    },
    subcategory : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Subcategory'
    },
    image : {
        type: String,
        required  : true
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