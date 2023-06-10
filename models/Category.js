const mongoose = require('mongoose');
const moment = require('moment');
const {Schema}  = mongoose;

const categorySchema =  new Schema({
    nome: {
        type: String,
        require: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        refer: 'User'
    }
}
,{timestamps:true}
);

const Category = mongoose.model("Category",categorySchema);
module.exports = {
    Category,
    categorySchema
};
