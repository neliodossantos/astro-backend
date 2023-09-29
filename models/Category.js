const mongoose = require('mongoose');
const {Schema}  = mongoose;

const categorySchema =  new Schema({
    nome: {
        type: String,
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
