import passportLocal from 'passport-local';
import MemberModel from '../db/member-model.js'

const localStrategy = passportLocal.Strategy;

export default function (passport) {
  passport.use(
    new localStrategy({
      usernameField: 'email' // Tell passport to use "email" field instead of "username"
      // "username" and "password" for callback are extracted from req.user and passport
      // expects these properties in req.user. Need to tell it to substitute "email" for
      // "username" property
    },
      async function (email, password, done) {
        await MemberModel.findOne({ email: email }, function (err, user) { //Check the DB for this email
          let info;
          if (!user) {
            console.log("User name not found ", email)
            info = { message: 'User name not found' };
          }
          else if (!user.validPassword(password)) {
            console.log("Invalid Password ", password)
            info = { message: 'Invalid password' };
            err = true;

          }
          else {
            console.log("Found user ", email)
          }
          return done(err, user, info);// Call the internal passport done() method with the required params.
        })
      }
    )
  );

  // Used passport when the user is inserted into the DB for storage.
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  //Used by passport when the user needs to be retrieved from storage.
  passport.deserializeUser(function (id, done) {
    MemberModel.findById(id, function (err, user) {
      done(err, user);
    });
  });
}