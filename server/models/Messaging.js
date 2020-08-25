const mongoose = require('mongoose');

//Schema
const Schema = mongoose.Schema;
const messagingSchema = new Schema({
  
}, {timestamp: true, _id: true, autoIndex: true });

//Model
module.exports = mongoose.model('Message', messagingSchema);
