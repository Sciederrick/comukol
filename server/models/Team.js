const mongoose = require('mongoose');

//Schema
const Schema = mongoose.Schema;
const teamSchema = new Schema({
  name: {
    type: String, required: true
  },
  creator: {
    type: String, required: true
  },
  description: {
    type: String, required: true
  },
  toolkit: {
    type: String, required: true
  },
  created_at: {
    type: String, required: true
  }
}, {timestamp: true, _id: true, autoIndex: true });

//Model
module.exports = mongoose.model('Team', teamSchema);
