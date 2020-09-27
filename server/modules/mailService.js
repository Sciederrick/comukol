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
  let email = Array.from(params.recipient.split(','))
  let teamName = params.teamName
  for(i=0; i<email.length; i++){
    const mailOptions = {
      from:process.env.GMAIL_USER,
      to:email[i],
      subject:'ComuKol Invite',
      html:`<p>You are receiving this mail because you have been invited to ComuKol for outbreak response team by ${params.by}</p>
            <p style="text-decoration:underline;">Team Name: ${teamName}</p>
            <p>Team Description: ${params.teamDescription}</p>
            <a href="https://comukol.herokuapp.com/invited/${email[i]}/${teamName}">Join!</a>
            `
    }
    transport.sendMail(mailOptions, (err, res) => {
      if(err){
        console.log('Error: Email not Sent! : ', err)
        return callback(err, null)
      }else{
        console.log('Success: Email Sent : ', res)
        return callback(null, res.accepted[0])
      }
    })
  }
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
