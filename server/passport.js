const localStrategy = require('passport-local').Strategy //::Step 1
const User=require('./models/User')

module.exports=(passport)=>{
  passport.use(new localStrategy({usernameField:'email'}, (email, password, done)=>{ //::Step 3 |->callback
    User.findOne({email}, (err, doc)=>{
      if(err)
      {
        done(err)
      }
      else
      {
        if(doc)
        {
          let valid=doc.comparePassword(password, doc.password)
          if(valid)
          {
            done(null, {
              id:doc.id,
              username:doc.email,
              password:doc.password
            })
          }
          else {
            return done(null, false)
          }
        }
        else
        {
          done(null, false)
        }
      }
    })
  })) //::Step 2 |->Indicate usernameField and passwordField, default is username and password, change that if that is not the case!
  passport.serializeUser((user, done)=>{  //::Step 4 serialize user, store our user into our session
    done(null, user)
  })
  passport.deserializeUser((id, done)=>{ //Kick our user out!
    User.findById(id.toString(), (err, user)=>{
      done(err, user)
    })
  })
}
