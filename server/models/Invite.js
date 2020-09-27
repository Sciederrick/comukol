const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs')

//Schema
const Schema = mongoose.Schema;
const inviteSchema = new Schema({
  email: {
    type: String, required: true
  },
  team: {
    type: String, required: true
  }
}, {timestamps: true, autoIndex: true });

//Model
module.exports = mongoose.model('Invite', inviteSchema);
