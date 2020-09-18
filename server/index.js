if(process.env.NODE_ENV !== 'production'){
  require('dotenv').config()
}

const express = require('express')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)
const path = require('path')
const fs = require('fs')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const fileUpload = require('express-fileupload')
const fileOp = require('./modules/fileOperations.js')
const mail = require('./modules/mailService.js')

const requestParser = function(req, res, next) {
  let now = new Date().toLocaleString()
  console.log(`[${now}] ${req.method} ${req.path} - ${req.ip}`)
  next()
}

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(requestParser)
app.use(cors())
app.use(fileUpload({
    createParentPath: true
}))


mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', console.error.bind(console, '[mongodb] connection error:'))
db.once('open', ()=>{
  console.log('[mongodb] connection success')
})
/************************Import Model******************************/
let User = require('./models/User.js')
/************************Import Model******************************/



/*socket.io*/
let users = []
let messages = []
/*************Chat Model*************/
const Chat = require('./models/Chat.js')
/**************Chat Model************/
Chat.find({}, (err, docs)=>{
  if(err) throw err
  messages = docs
})

io.on('connection', socket=>{
  socket.emit('loggedIn', {
    users: users.map(s => s.username),
    messages: messages
  })
  socket.on('newUser', username=>{
    console.log(`${username} has arrived at the forum`)
    socket.username = username
    users.push(socket)

    io.emit('userOnline', socket.username)
  })
  socket.on('msg', msg=>{
    let message = new Chat({
      username: socket.username,
      msg: msg
    })
    message.save((err, docs)=>{
      if(err) throw err
      messages.push(docs)
      io.emit('msg', docs)
    })
  })
  //Disconnect
  socket.on('disconnect', ()=>{
    console.log(`${socket.username} has left the forum.`)
    io.emit('userLeft', socket.username)
    users.splice(users.indexOf(socket), 1)
  })
})
/*socket.io*/


app.post('/api/register', (req, res, next)=>{
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
        record.role=1
        record.password=record.hashPassword(password)
        record.save((err, user)=>{
          if(err){
            res.status(500).send('db error')
          }else{
            res.send(user)
          }
        })
      }
    }
  })
})

//reset password
app.post('/api/passwordreset', (req, res)=>{
  const email = req.body.email

  User.findOne({email}, (err, user)=>{
    if(err){
      console.log(err)
      res.status(500).send('error occured')
    }else{
      if(user){
        const payload = {
          id:user._id,
          email:user.email,
        }
        let d = new Date()
        const secret = `${user.password}-${d.getTime(user.updatedAt)}`
        const token = jwt.sign(payload, secret)
        const params = {
          email : req.body.email,
          resetLink: `https://comukol.herokuapp.com/api/resetpassword/${payload.id}/${token}`
        }
        mail.mailResetLink(params, (err, success)=>{
          if(err) res.status(400).json({err})
          res.send(success.accepted)
        })
      }else{
        res.status(404).json({error:'email does not exist!'})
      }
    }
  })
})

app.get('/api/resetpassword/:id/:token', (req, res)=>{
  const id = req.params.id
  const d = new Date()
  User.findById(id, (err, user) => {
    if(err) res.status(500).json({error: 'db operation failed!'})
      const secret = `${user.password}-${d.getTime(user.updatedAt)}`
      const payload = jwt.decode(req.params.token, secret)
      //Form to reset password
      console.log('payload\n')
      console.log(payload)
      res.send(
      '<form action="/api/resetpassword" method="POST">' +
      '<input type="hidden" name="id" value="' + payload.id + '" />' +
      '<input type="hidden" name="token" value="' + req.params.token + '" />' +
      '<input type="password" name="password" value="" placeholder="Enter your new password..." />' +
      '<input type="submit" value="Reset Password" />' +
      '</form>'
    )
  })
})

app.post('/api/resetpassword', (req, res)=>{
  let record = new User()
  const pwd = record.hashPassword(req.body.password)
  User.findByIdAndUpdate(req.body.id, {password:pwd}, (err, user) => {
    if(err) res.status(500).json({error: 'password reset failed!'})
    // const secret = `${user.password}-${d.getTime(user.createdAt)}`
    // const payload = jwt.decode(req.body.token, secret)
    //TODO: update password
    res.send('Your password has been successfully changed.')
  })
})

//refresh token, to be stored in Redis DB
let refreshTokens = []

app.post("/api/token", (req, res)=>{
  const refreshToken=req.body.token
  if(refreshToken==null) return res.sendStatus(401)
  if(!refreshTokens.includes(refreshToken)) return res.sendStatus(403)
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user)=>{
    if(err) return res.sendStatus(403)
    const payload={
      email: user.email,
      userImage: user.userImage,
      specialty: user.specialty,
      position: user.position,
      role : user.role,
      teams: user.teams
    }
    const accessToken=jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn:1440
    })
    res.json({accessToken})
  })
})

app.delete('/logout', (req, res)=>{
  refreshTokens = refreshTokens.filter(token => token !== req.body.token)
  res.sendStatus(204)
})

app.post("/api/login", (req, res) => {
  let email=req.body.email
  User.findOne({email}, (err, user)=>{
    if(err) res.status(404).send(`error: ${err}`)
    if(user){
      if(bcrypt.compareSync(req.body.password, user.password)){
        const payload={
          email: user.email,
          userImage: user.userImage,
          specialty: user.specialty,
          position: user.position,
          role : user.role,
          teams: user.teams
        }
        const accessToken=jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
          expiresIn:1440
        })
        const refreshToken=jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET)
        res.json({accessToken, refreshToken})
      }else{
        res.status(404).json({error: 'Wrong password!'})
      }
    }else{
      res.status(404).json({error: 'User does not exist'})
    }
  })
})

// app.post("/api/invited/confirm", (req, res)=>{
//   let email=req.body.email
//   User.findOne({email, role:false, contact:null}, (err, user)=>{
//     if(err) res.status(404).send(`error: ${err}`)
//     if(user) console.log(user)
//     res.status(404).json({error: 'User does not exist'})
//   })
// })
//
// app.post("/api/invited/modify/password", (req, res)=>{
//   let email=req.body.email
//   let password=req.body.password
//   password=bcrypt.hashSync(password, bcrypt.genSaltSync(10))
//   User.findOneAndUpdate({email}, {password}, {new: true}, (err, user)=>{
//     if(err) res.status(499).json({error: 'Update Failed!'})
//     if(user){
//       res.send(user)
//     }
//     res.status(404).json({error: 'Update error!'})
//   })
// })

app.post("/api/user/profile", (req, res) => {
  const email=req.body.email
  User.findOne({email}, (err, user)=>{
    if(err) res.status(404).send(`error: ${err}`)
    if(user){
      res.send(user)
    }else{
      res.status(500).json({error: 'User retrieval failed'})
    }
  })
})

app.post("/api/profile/update", (req, res)=>{
  const email=req.body.email, name=req.body.fullName, contact=req.body.contact, workplace=req.body.workplace, specialty=req.body.specialty, jurisdiction=req.body.jurisdiction
  if(!email||!name||!contact||!workplace||!specialty||!jurisdiction){
    res.status(500).json({error: 'All fields should be field!'})
    console.log('empty fields')
  }else{
    User.findOneAndUpdate({email}, {name, contact, workplace, specialty, jurisdiction}, {new: true}, (err, doc)=>{
      if(err) res.status(500).json({error: 'Update Failed!'})
      res.send(doc)
    })
  }
})
//Amazon S3 File Operations listing, upload, delete, download
app.post('/api/upload/files', (req, res) => {
  const files = req.files
  const destination = req.body.category
  let response = []
  for (const property in files) {
    (async ()=>{
      try{
        let response = await fileOp.uploadFile(destination, files[property].name, files[property].data)
        res.send(`${response} successfully uploaded`)
      }catch(err){
        res.status(500).json({error: 'Upload Failed!'})
      }
    })()
  }
  console.log('file(s) successfully uploaded')
})

app.post('/api/list/files', (req, res) => {
  (async ()=>{
    const Prefix = req.body.toolkit
    try{
      let response = await fileOp.listFiles(Prefix)
      res.send(response)
    }catch(err){
      res.status(500).json({error: 'File listing Failed!'})
    }
  })()
})

app.post("/api/delete/file", (req, res) => {
  (async ()=>{
    const fileName = req.body.file
    try{
      let response = await fileOp.deleteFile(fileName)
      res.send(response)
    }catch(err){
      res.status(500).json({error: 'File deletion Failed!'})
    }
  })()
})

app.post("/api/invite/members", (req, res) => {
  const recipient = req.body.invitees
  const by = req.body.by
  const params = {
    recipient,
    by
  }
  mail.mailer(params, (err, done)=>{
    if(err) res.send(err)
    res.send(done)
  })
})


/************************Import Model******************************/
let Report = require('./models/Report.js')
/************************Import Model******************************/
//Store Reports
app.post("/api/reports", (req, res)=>{
  const email = req.body.email
  const type = req.body.type
  const body = req.body.body
  const created_at = req.body.created_at
  console.log(`email : ${email}`)
  console.log(`type : ${type}`)
  console.log(`body : ${body}`)
  console.log(`created_at : ${created_at}`)
  let record=new Report()
  record.email = email
  record.type = type
  record.body = body
  record.created_at = created_at
  record.save((err, report)=>{
    if(err){
      res.status(500).send('db error')
      console.log(err)
    }else{
      res.status(200).send(report)
      console.log(report)
    }
  })
})

//Fetch Situational Reports
app.get("/api/situational/reports", (req, res)=>{
  Report.find({type:false}, (err, docs)=>{
    if(err) res.status(500).send('db error')
    res.send(docs)
  })
})

//Fetch Daily Reports
app.get("/api/daily/reports", (req, res)=>{
  Report.find({type:true}, (err, docs)=>{
    if(err) res.status(500).send('db error')
    res.send(docs)
  })
})


/************************Import Model******************************/
let Team = require('./models/Team.js')
/************************Import Model******************************/
//create Team
app.post("/api/create/team", (req, res)=>{
  const teamName = req.body.teamName
  const email = req.body.email
  const description = req.body.description
  const toolkit = req.body.toolkit
  const datetime = new Date()
  const created_at = datetime.toLocaleString()
  let operation = false
  let team = null
  let record=new Team()
  record.name = teamName
  record.creator =  email
  record.description = description
  record.toolkit = toolkit
  record.created_at = created_at
  record.save((err, team)=>{
    if(err) res.status(500).send(err)
      User.findOneAndUpdate({email}, {$push:{teams: teamName}}, {new: true}, (err, user)=>{
        if(err) res.status(500).json({error: err})
        res.send(user)
      })
  }
)
})

//User Authorization
// function authenticateToken(req, res, next){
//   const authHeader = req.headers['authorization']
//   //Bearer <token>
//   const token = authHeader && authHeader.split(' ')[1]  //token or undefined
//   if(token == null) return res.sendStatus(401)
//
//   jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user)=>{
//     if(err) return res.sendStatus(403)
//     req.user = user
//     next()
//   })
// }


//Handle production
if(process.env.NODE_ENV === 'production'){
  //Static folder
  app.use(express.static(__dirname + '/public'))

  //Handle SPA
  app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'))
}

http.listen(process.env.PORT||5000, ()=>`listening on port %s`, process.env.PORT||5000)
