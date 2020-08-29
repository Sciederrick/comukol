const mongoose = require('mongoose');

//Schema
const Schema = mongoose.Schema;
const reportSchema = new Schema({
  email:{
    type: String,
    required: true
  },
  type:{
    type: Boolean,
    required: true,
    default: 1 //Daily report
  },
  body:{
    type: String,
    required: true
  },
  created_at:{
    type:String,
    required: true,
    default:new Date().toLocaleString()
  }
}, {timestamp: true, _id: true, autoIndex: true });

//Model
module.exports = mongoose.model('Report', reportSchema);
