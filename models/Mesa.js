const mongoose = require('mongoose');
const {Schema} = mongoose;
const MesaSchema = new Schema({
    nome: {
        type: String
    }
},{timestamps: true});

const Mesa = mongoose.model('Mesa', MesaSchema);

module.exports = {
    Mesa, MesaSchema
};
