const mongoose = require('mongoose');
const {Schema}  = mongoose;

const SubCategorySchema =  new Schema({
    nome : {
        type: String,
        require: true
    },
    category : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Category'
    }
},
    {timestamps:true}
);

const SubCategory = mongoose.model("SubCategory",SubCategorySchema);
module.exports = {
    SubCategory,
    SubCategorySchema
};
