const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs')

//Schema
const Schema = mongoose.Schema;
const userSchema = new Schema({
  _id: {
    type: String
  },
  image: {
    type: String, default: 'avatar.jpg'
  },
  name: {
    type: String, default: null
  },
  contact: {
    type: String, default: null
  },
  email: {
    type: String, required: true, unique: true 
  },
  workplace: {
    type: String, default: null
  },
  specialty: {
    type: String, default: null
  },
  jurisdiction: {
    type: String, default: null
  },
  position: {
    type: String, default: null
  },
  role: {
    type: Boolean, default: 0
  },
  teams: {
    type: [String]
  },
  password: {
    type: String, required: true
  }
}, {timestamps: true, _id: true, autoIndex: true });

userSchema.methods.hashPassword=(password)=>{
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}

userSchema.methods.comparePassword=(password, hash)=>{
  return bcrypt.compareSync(password, hash)
}
//Model
module.exports = mongoose.model('User', userSchema);
