if(process.env.NODE_ENV !== 'production'){
  require('dotenv').config()
}

const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const requestParser = function(req, res, next) {
  let now = new Date().toLocaleString()
  console.log(`[${now}] ${req.method} ${req.path} - ${req.ip}`)
  next()
}

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(requestParser)
app.use(cors())

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', console.error.bind(console, '[mongodb] connection error:'))
db.once('open', ()=>{
  console.log('[mongodb] connection success')
})
/************************Import Model******************************/
let User = require('./models/User.js')
/************************Import Model******************************/

app.post('/register', (req, res, next)=>{
  let id=req.body.id
  let email=req.body.email
  let password=req.body.password
  User.findOne({email, password}, (err, doc)=>{
    if(err){
      res.status(500).send('error occured')
    }else{
      if(doc){
        res.status(500).send('email already exists')
      }else{
        let record=new User()
        record._id=id
        record.email=email
        record.password=record.hashPassword(password)
        record.save((err, user)=>{
          if(err){
            res.status(500).send('db error')
          }else{
            res.status(200).send(user)
          }
        })
      }
    }
  })
})

app.post("/login", (req, res) => {
  let email=req.body.email
  User.findOne({email}, (err, user)=>{
    if(err) res.status(404).send(`error: ${err}`)
    if(user){
      if(bcrypt.compareSync(req.body.password, user.password)){
        const payload={
          email: user.email
        }
        let token=jwt.sign(payload, process.env.SECRET_KEY, {
          expiresIn:1440
        })
        console.log(token)
        res.send(token)
      }else{
        res.status(404).json({error: 'Wrong password!'})
      }
    }else{
      res.status(404).json({error: 'User does not exist'})
    }
  })
})


app.listen(process.env.HTTP_PORT||5000);
