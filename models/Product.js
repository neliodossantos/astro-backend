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
         ref : 'Category',
         required : true
    },
    subcategory : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Subcategory',
        required : true
    },
    image : {
        type: String,
        required  : true
    },
    userId: {
        type : Schema.Types.ObjectId,
        ref : 'User',
        required : true
   },
}, {timestamps: true});

const Product = mongoose.model("Product",ProductSchema);
module.exports = {
    Product,
    ProductSchema
}