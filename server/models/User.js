const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs')

//Schema
const Schema = mongoose.Schema;
const userSchema = new Schema({
  _id: {type: String},
  name: {type: String},
  email: {type: String, required: true},
  specialty: {type: String},
  teams: {type: [String]},
  password: {type: String, required: true }
}, {timestamp: true, _id: true, autoIndex: true });

userSchema.methods.hashPassword=(password)=>{
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}

userSchema.methods.comparePassword=(password, hash)=>{
  return bcrypt.compareSync(password, hash)
}
//Model
module.exports = mongoose.model('User', userSchema);
