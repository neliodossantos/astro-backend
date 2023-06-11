const mongoose = require('mongoose');
const {Schema}  = mongoose;

const SubCategorySchema =  new Schema({
    nome : {
        type: String,
        require: true
    },
    category : {
        type : Schema.Types.ObjectId,
        ref : 'Category',
        required : true
    },
    userId : {
        type: Schema.Types.ObjectId,
        refer : 'User',
        required : true
    }
},
    {timestamps:true}
);

const SubCategory = mongoose.model("SubCategory",SubCategorySchema);
module.exports = {
    SubCategory,
    SubCategorySchema
};
