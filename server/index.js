if(process.env.NODE_ENV !== 'production'){
  require('dotenv').config()
}

const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const passport = require('passport')    //1.Require passpot
const session = require('express-session')
const methodOverride=require('method-override')
require('./passport')(passport)  //2.Get custom passport file, pass passport

const requestParser = function(req, res, next) {
  let now = new Date().toLocaleString()
  console.log(`[${now}] ${req.method} ${req.path} - ${req.ip}`)
  next()
}

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(requestParser)
app.use(cors())
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,   //resave uninitialized variables if nothing has changed?
  saveUninitialized: false //do you want to save an empty value in the session?
}))
app.use(passport.initialize()) //Set up basics for passport
app.use(passport.session()) //pesist user information, works with app.use(session...)
app.use(methodOverride('_method'))
/*
<form action="/logout?_method" method="POST">
  <button type="submit">log out</button>
</form>
*/

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', console.error.bind(console, '[mongodb] connection error:'))
db.once('open', ()=>{
  console.log('[mongodb] connection success')
})
/************************Import Model******************************/
let User = require('./models/User.js')
/************************Import Model******************************/


// app.get('/login', checkNotAuthenticated, (req, res)=>{
//   res.send('failed')
// })

// app.get('/profile', checkAuthenticated, (req, res)=>{
//     res.send('successful')
// })

app.post('/register', checkNotAuthenticated, (req, res, next)=>{
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

// app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
//   successRedirect:'/profile',
//   failureRedirect:'/login'
// }))
app.post("/login", checkNotAuthenticated, (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      return res.status(400).send([user, "Cannot log in", info]);
    }

    req.login(user, err => {
      res.send("Logged in");
    })
  })(req, res, next)
})

app.delete('/logout', (req, res)=>{
  req.logOut()
  res.redirect('/login')
})

function checkAuthenticated(req, res, next){
  if(req.isAuthenticated()){
    return next()
  }
  res.redirect('/login')
}

function checkNotAuthenticated(req, res, next){
  if(req.isAuthenticated()){
    return res.redirect('/')
  }
  next()
}

app.listen(process.env.HTTP_PORT||5000);
