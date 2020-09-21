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
        const secret = `${user.password}-${Date.parse(user.updatedAt)}`
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
  User.findById(id, (err, user) => {
    if(err) res.status(500).json({error: 'db operation failed!'})
      try{
        const secret = `${user.password}-${Date.parse(user.updatedAt)}`
        const payload = jwt.verify(req.params.token, secret)
        //Form to reset password
        res.send(
        `<!DOCTYPE html>
          <html lang="en">
            <head>
              <meta charset="utf-8">
              <meta http-equiv="X-UA-Compatible" content="IE=edge">
              <meta name="viewport" content="width=device-width,initial-scale=1.0">
              <style>
              html{
                width:100vw;
              }
              body{
                margin:0;
                x-overflow:hidden;
              }
              .logo{
                font-family:sans-serif;
                font-weight:700;
                font-size:1.5rem;
                margin-top:5px;
                padding:0 10px;
                color:#FFFFFF;
                text-shadow:2px 2px #ADD8E6;
              }
              form{
                margin:60px 2px;
                background:#f8f8ff;
                padding:40px 15px 100px;
                text-align:center;
              }
              @media screen and (min-width: 600px) {
                .logo{
                  font-size:2rem;
                  padding:0 10px 10px 10px;
                }
                form{
                  width:55%;
                  margin:60px auto;
                  padding:60px 120px 80px 120px;
                  -webkit-box-shadow: 2px 2px 3px rgba(0,0,0,0.1);
                  box-shadow: 2px 2px 3px rgba(0,0,0,0.1);
                }
              }
              .label{
                display:block;
                position:relative;
                margin:40px 0px;
              }
              .new-password-text, .confirm-password-text{
                position:absolute;
                top:-1.6em;
                padding:10px;
                font-family:sans-serif;
                font-size:.8em;
                letter-spacing:1px;
                color:rgb(120,120,120);
                transition:ease .3s;
              }
              #newPwd, #confirmPwd{
                width:100%;
                margin-top:20px;
                padding:10px;
                background:transparent;
                border:none;
                outline:none;
              }
              .box-line{
                width:100%;
                height:2px;
                background:rgb(120,120,120);
              }
              #matchPasswords{
                text-align:left;
              }
              input[type="submit"]{
                inline-block;
                padding:12px 24px;
                background:rgb(360,360,360);
                font-weight:bold;
                color:#787878;
                border:1px solid #787878;
                outline:none;
                border-radius:3px;
                cursor:not-allowed;
                transition:ease .3s;
              }
              </style>
            </head>
            <body>
            <p class="logo">ComuKol</p>
            <form action="/api/resetpassword" method="POST">
            <input type="hidden" name="id" value="${payload.id}" />
            <input type="hidden" name="token" value="${req.params.token}" />
            <label class="label">
            <p class="new-password-text" onfocus="this.style.top='-3em'" onfocusout="this.style.top='0'">New Password</p>
            <input id="newPwd" type="password" name="password"/>
            <div class="box-line">
            <div class="line"></div>
            </div>
            </label>
            <label class="label">
            <p class="confirm-password-text" onfocus="this.style.top='-3em'" onfocusout="this.style.top='0'">Confirm Password</p>
            <input id="confirmPwd" type="password" name="confirmPassword"/>
            <div class="box-line">
            <div class="line"></div>
            </div>
            </label>
            <p id="matchPasswords"></p>
            <input onMouseOver="this.style.color='#FFF';this.style.backgroundColor='#008000'" onMouseOut="this.style.color='#787878';this.style.backgroundColor='#FFFFFF'" type="submit" value="Reset Password" disabled/>
            </form>
            <script type="text/javascript">
            let passwordField = document.querySelectorAll('input[type="password"]')
            let boxLine = document.querySelectorAll('div.box-line')
            const matchPasswords = document.querySelector('#matchPasswords')
            const submitButton = document.querySelector('input[type="submit"]')
            passwordField[0].addEventListener('focus', ()=>{
              boxLine[0].style.transition='ease .5s'
              boxLine[0].style.backgroundColor='#FC6A03'
            })
            passwordField[0].addEventListener('focusout', ()=>{
              boxLine[0].style.transition='ease .3s'
              boxLine[0].style.backgroundColor='#787878'
            })
            passwordField[1].addEventListener('focus', ()=>{
              boxLine[1].style.transition='ease .5s'
              boxLine[1].style.backgroundColor='#FC6A03'
            })
            passwordField[1].addEventListener('focusout', ()=>{
              boxLine[1].style.transition='ease .3s'
              boxLine[1].style.backgroundColor='#787878'
            })
            passwordField[0].addEventListener('keyup', ()=>{
              if((passwordField[0].value.trim() === ''||passwordField[1].value.trim() === '') || (passwordField[0].value.trim() !== passwordField[1].value.trim())){
                submitButton.setAttribute("disabled", "disabled")
                submitButton.style.cursor='not-allowed'
                matchPasswords.innerHTML='<small style="color:#FF0000">passwords do not match!</small>'
              }else{
                matchPasswords.innerHTML='<small style="color:#008000">passwords match</small>'
                submitButton.style.cursor='pointer'
                submitButton.removeAttribute("disabled")
              }
            })
            passwordField[1].addEventListener('keyup', ()=>{
              if((passwordField[0].value.trim() === ''||passwordField[1].value.trim() === '') || passwordField[0].value.trim() !== passwordField[1].value.trim()){
                submitButton.setAttribute("disabled", "disabled")
                submitButton.style.cursor='not-allowed'
                matchPasswords.innerHTML='<small style="color:#FF0000">passwords do not match!</small>'
              }else{
                matchPasswords.innerHTML='<small style="color:#008000">passwords match</small>'
                submitButton.style.cursor='pointer'
                submitButton.removeAttribute("disabled")
              }
            })
            </script>
            </body>
          </html>`
        )
      }catch(err){
        console.log(err)
        res.status(500).send(
          `<!DOCTYPE html>
            <html lang="en">
              <head>
                <meta charset="utf-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width,initial-scale=1.0">
              </head>
              <body>
              <div style="text-align:center;padding-top:5%;">
                <p style="font-family:sans-serif;font-size=5rem;color:#990F02;">Invalid Reset Link!</p>
              </div>
              </body>
            </html>`
        )
      }
  })
})

app.post('/api/resetpassword', (req, res)=>{
  const id = req.body.id
  const token = req.body.token
  const password = req.body.password
  console.log(req.body.password)
  //fn
  const updatePassword = () => {
    let record = new User()
    const pwd = record.hashPassword(password)
    User.findByIdAndUpdate(id, {password:pwd}, (err, user) => {
      if(err) res.status(500).json({error: 'password reset failed!'})
      res.send(
        `<!DOCTYPE html>
          <html lang="en">
            <head>
              <meta charset="utf-8">
              <meta http-equiv="X-UA-Compatible" content="IE=edge">
              <meta name="viewport" content="width=device-width,initial-scale=1.0">
            </head>
            <body>
            <div style="text-align:center;padding-top:5%;">
            <p style="font-family:sans-serif;font-size=5rem;color:#008000;">Your password has been changed successfully</p>
            <a href="https://comukol.herokuapp.com/" style="font-family:mono;font-size=3rem;">login</a>
            </div>
            </body>
          </html>`
        )
      })
  }
  User.findById(id, (err, user) => {
    if(err) res.status(500).json({error: 'db operation failed!'})
      const secret = `${user.password}-${Date.parse(user.updatedAt)}`
      try{
        const payload = jwt.verify(token, secret)
        updatePassword()
      }catch(err){
        console.log(err)
        res.status(500).send(
          `<!DOCTYPE html>
            <html lang="en">
              <head>
                <meta charset="utf-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width,initial-scale=1.0">
              </head>
              <body>
              <div style="text-align:center;padding-top:5%;">
                <p style="font-family:sans-serif;font-size=5rem;color:#990F02;">Invalid Reset Link!</p>
              </div>
              </body>
            </html>`
        )
      }
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
