const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName:{
        type:String,
        required:true,
        minlength:[4,'You should write more than 4 characters into firstName'],
        maxlength:[50,'You should write less than 50 characters into firstName']
    },
    lastName: {
        type:String,
        required:true,
        minlength:[3,'You should write more than 3 characters into firstName'],
        maxlength:[60,'You should write less than 60 characters into firstName']
    },
    role:{ 
        type: String, 
        required:true,
        enum: ['admin','writer', 'guest']
    },
    createdAt: {
        type: Date,
		default: Date.now
    },
    numberOfArticles: {
        type: Number,
        default:0

    },
    nickname:{
        type:String
    }
},{timestamps:true});

module.exports = mongoose.model('User', userSchema);