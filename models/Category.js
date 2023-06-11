const mongoose = require('mongoose');
const {Schema}  = mongoose;

const categorySchema =  new Schema({
    nome: {
        type: String,
        require: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        refer: 'User',
        require: true
    }
}
,{timestamps:true}
);

const Category = mongoose.model("Category",categorySchema);
module.exports = {
    Category,
    categorySchema
};
