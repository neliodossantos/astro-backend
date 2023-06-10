const mongoose = require('mongoose');

const {Schema} = mongoose;

const UserSchema = new Schema({
    nome : {
        type : String,
        required : true,
    },
    email : {
        type: String,
        required:true,
        unique : true
    },
    senha : {
        type : String
    },
    // nif : {
    //     type : Number,
    //     required : true,
    //     // validate: function(value) {
    //     //     return value.length == 11;
    //     // } 
    // },
    // telefone : {
    //     type : Number,
    //     // validate: function(value){
    //     //     return value.length == 9;
    //     // }
    // },
    role: { type: String, required: true, enum: ['restaurant', 'admin'], default: 'restaurant' }

}, {timestamps: true});

const User = mongoose.model('User',UserSchema);
module.exports = {
    User, UserSchema
};