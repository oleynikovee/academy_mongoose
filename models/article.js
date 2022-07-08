const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const articleSchema = new Schema({
    title:{
        type:String,
        minlength:[5,'You should write more than 5 characters into title'],
        maxlength:[400,'You should write less than 400 characters into title'],
        required:true,
        index: true
    },
    subtitle:{
        type:String,
        minlength:[5,'You should write more than 5 characters into subtitle']
    },
    description:{
        type:String,
        minlength:[5,'You should write more than 5 characters into description'],
        maxlength:[5000,'You should write less than 5000 characters into description'],
        required:true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:true
    },
    category:{
        type: String, 
        required:true,
        enum: ['sport', 'games', 'history']
    },
},{timestamps:true});

module.exports = mongoose.model('Article', articleSchema);