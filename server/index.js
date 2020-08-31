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
const nodemailer = require('nodemailer')
const mailGun = require('nodemailer-mailgun-transport')
const multer = require('multer')

const requestParser = function(req, res, next) {
  let now = new Date().toLocaleString()
  console.log(`[${now}] ${req.method} ${req.path} - ${req.ip}`)
  next()
}

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(requestParser)
app.use(cors())

// const fileFilterProfile = (req, file, cb)=>{
//   const allowedTypes = ["image/jpeg", "image/png", "image/jpg"]
//   if(!allowedTypes.includes(file.mimetype)){
//     const error = new Error("Wrong file type")
//     error.code = "LIMIT_FILE_TYPES"
//     return cb(error, false)
//   }
//   cb(null, true)
// }

//for shared official documents
// const fileFilter2 = (req, file, cb)=>{
//   const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "application/pdf", "application/docx", "application/odt", "application/xls", "application/xlsx", "application/ods", "application/ppt", "application/pptx", "application/txt"]
//   if(!allowedTypes.includes(file.mimetype)){
//     const error = new Error("Wrong file type")
//     error.code = "LIMIT_FILE_TYPES"
//     return cb(error, false)
//   }
//   cb(null, true)
// }

//for all files, storing files with their original extension
// let storageProfile = multer.diskStorage({
//   destination: (req, file, cb)=>{
//     cb(null, './uploads/profile')
//   },
//   filename: (req, file, cb)=>{
//     let ext = file.mimetype.split('/')[1]
//     cb(null, `${file.originalname}`)
//   }
// })
//
// let storageToolkit = multer.diskStorage({
//   destination: (req, file, cb)=>{
//     cb(null, './uploads/toolKit/Cholera/')
//   },
//   filename: (req, file, cb)=>{
//     let ext = file.mimetype.split('/')[1]
//     cb(null, `${file.originalname}`)
//   }
// })


//for profile photo
// const MAX_SIZE = 200000
// const upload = multer({
//   storageProfile,
//   fileFilterProfile,
//   limits:{
//     fileSize: MAX_SIZE
//   }
// })

//for shared official documents
// const MAX_SIZE_2 = 200000000
// const upload2 = multer({
//   dest: './uploads/toolKit/Cholera/',
//   fileFilter2,
//   limits:{
//     fileSize: MAX_SIZE_2
//   }
// })
//
// const MAX_SIZE_3 = 200000000
// const pureUpload = multer({
//   storage: storageToolkit
// })



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

app.post("/api/login", (req, res) => {
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
        res.send(token)
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

// app.post("/api/profile/photo/upload", upload.single('file'), (req, res)=>{
//   const originalName=req.file.originalname
//   const email=req.body.email
//   User.findOneAndUpdate({email}, {image:originalName}, {new: true}, (err, doc)=>{
//     if(err) res.status(499).json({error: 'Update Failed!'})
//     res.send(doc)
//   })
// })

// app.post("/api/file/manager/multiple/uploads", upload2.array('files'), (req, res)=>{
//   console.log(req.files)
//   res.json({files: req.files})
// })
//
// app.post("/api/file/manager/dropzone", pureUpload.single('file'), (req, res)=>{
//   console.log(req.file)
//   res.json({files: req.file})
// })
//
// app.use((err, req, res, next)=>{
//   if(err.code === "LIMIT_FILE_TYPES"){
//     res.status(422).json({error: 'Only images are allowed'})
//     return
//   }
//
//   if(err.code === "LIMIT_FILE_SIZE"){
//     res.status(422).json({error:`Too large. Max size is ${MAX_SIZE/1000}kb`})
//   }
// })


//sending email invites
// app.post("/api/invite/members", (req, res)=>{
//   const mail=req.body.invitees
//   console.log(`invited: ${mail}`)
//   console.log('invite members through email')
//   console.log(mail)
//   const auth = {
//     auth:{
//       api_key: process.env.MAILGUN_API_KEY,
//       domain: process.env.MAILGUN_DOMAIN
//     }
//   }
//   const transporter=nodemailer.createTransport(mailGun(auth))
//   const mailOptions={
//     from: process.env.EMAIL,
//     to: mail,
//     subject: `You have been invited to ComuKOL`,
//     text: 'Please visit the following link: http://Comukol.herokuapp.com/invited'
//   }
//   transporter.sendMail(mailOptions)
//     .then((response)=>{
//       console.log('email sent')
//       res.send(response)
//     })
//     .catch((err)=>{
//       res.status(411).json({error: 'Email not sent'})
//       console.log('error: '+err)
//     })
// })

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
    console.log(docs)
    if(err) res.status(500).send('db error')
    res.send(docs)
  })
})

//Fetch Daily Reports
app.get("/api/daily/reports", (req, res)=>{
  Report.find({type:true}, (err, docs)=>{
    console.log(docs)
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

//Handle production
if(process.env.NODE_ENV === 'production'){
  //Static folder
  app.use(express.static(__dirname + '/public'))

  //Handle SPA
  app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'))
}

http.listen(process.env.PORT||5000, ()=>`listening on port %s`, process.env.PORT||5000)
