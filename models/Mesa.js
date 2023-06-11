const mongoose = require('mongoose');
const {Schema} = mongoose;
const MesaSchema = new Schema({
    nome: {
        type: String,
        required : true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        refer: 'Mesa'
    }
},{timestamps: true});

const Mesa = mongoose.model('Mesa', MesaSchema);

module.exports = {
    Mesa, MesaSchema
};
