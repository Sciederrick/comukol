const mongoose = require('mongoose');

//Schema
const Schema = mongoose.Schema;
const chatSchema = new Schema({
  username:{
    type:String
  },
  msg:{
    type:String
  },
  created_at:{
    type:String,
    default:new Date().toLocaleString()
  }
}, {timestamp: true, _id: true, autoIndex: true });

//Model
module.exports = mongoose.model('Chat', chatSchema);
