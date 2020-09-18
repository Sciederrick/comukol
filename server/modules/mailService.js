if(process.env.NODE_ENV !== 'production'){
  require('dotenv').config({path:'./../.env'})
}
const nodemailer = require('nodemailer')

const transport = nodemailer.createTransport({
  host:'smtp.gmail.com',
  port:465,
  secure:true,
  auth: {
    type:'OAuth2',
    user: process.env.GMAIL_USER,
    clientId: process.env.GMAIL_CLIENT_ID,
    clientSecret: process.env.GMAIL_CLIENT_SECRET,
    refreshToken: process.env.GMAIL_OAUTH2_REFRESH_TOKEN,
    access_token: process.env.GMAIL_OAUTH2_ACCESS_TOKEN
  }
})
//Invite members
const mailer = (params, callback) => {
  const mailOptions = {
    from:process.env.GMAIL_USER,
    to:params.recipient,
    subject:'ComuKol Invite',
    text:`You are receiving this mail because you have been invited to ComuKol for outbreak response team by ${params.by}, please use the following link on consent https://comukol.herokuapp.com/about`
  }

  transport.sendMail(mailOptions, (err, res) => {
    if(err){
      console.log('Error: Email not Sent! : ', err)
      return callback(err, null)
    }else{
      console.log('Success: Email Sent : ', res)
      return callback(null, res)
    }
  })
}
//Password reset
const mailResetLink = (params, callback) => {
  const mailOptions = {
    from:process.env.GMAIL_USER,
    to:params.email,
    subject:'Password Reset Link',
    text:`You are receiving this mail because you have requested for a password reset. Use the following one time link: ${params.resetLink}`
  }

  transport.sendMail(mailOptions, (err, res) => {
    if(err){
      console.log('Error: Email not Sent! : ', err)
      return callback(err, null)
    }else{
      console.log('Success: Email Sent : ', res)
      return callback(null, res)
    }
  })
}

module.exports.mailer = mailer
module.exports.mailResetLink = mailResetLink
