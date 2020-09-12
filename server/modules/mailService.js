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

const mailer = (recipient, callback) => {
  const mailOptions = {
    from:process.env.GMAIL_USER,
    to:recipient,
    subject:'ComuKol Invite',
    text:'You are receiving this mail because you have been invited to ComuKol for outbreak response team, please use the following linke on consent https://comukol.herokuapp.com/about'
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
