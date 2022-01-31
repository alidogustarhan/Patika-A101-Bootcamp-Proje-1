const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//CREATE SCHEMA

const MessageSchema = new Schema({
    name:String,
    message:String,
    dataCreated:{
        type:Date,
        default:Date.now
    },
});

const quote = mongoose.model('quote', MessageSchema);
module.exports = quote;