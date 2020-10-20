const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    customId:{
        type:String,
        required:true,
        unique:true,
    },
    username:{
        type: String,
        required:true,
        unique:true,
        trim:true,
        minlength:3
    },
    convIds: {
        type: Array,
    }
}, {
    timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;