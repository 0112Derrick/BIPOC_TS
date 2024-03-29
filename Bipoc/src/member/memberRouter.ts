import express, { response } from 'express';
import passport from 'passport';
import { addMember } from '../db/db-api.js';

const memberRouter = express.Router();
/* express.urlencoded() */
// Signup Request
memberRouter.post('/signup', express.json(), async function (req, res, next) {

  if (req.body.email && req.body.password && req.body.dateOfBirth && req.body.username) {

    const member = await addMember({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    }).then((member) => { console.log("Added member", member) })
      .catch((err) => console.log("Failed to add member"))
      .finally(() => res.redirect('/'));
  }
  else {
    //
    res.status(400);
    res.redirect('/');
    console.log('unable to validate user');
  }
});

//Login request
memberRouter.post('/login', express.json(), function (req, res, next) {

  passport.authenticate('local', function (err, user, info, status) {
    if (err) {
      console.log("Invalid password");
      return res.sendStatus(402);
    }
    if (!user) {
      console.log("Failed to find user");
      return res.sendStatus(401);
    }
    req.logIn(user, function (err) {
      if (err) { return next(err) }
      return res.sendStatus(200);
    });
    return;
  })(req, res, next);

});

//Logout request
memberRouter.post('/logout', (req, res) => {
  //note that req.logout() does not work!
  req.session.destroy(function (err) {
    res.sendStatus(200);
  })
});

memberRouter.post('/*', (req, res) => {
  res.sendStatus(404);
});

memberRouter.use((error, req, res, next) => {
  console.log("Error: ", error);
  res.sendStatus(error.sendStatus);
  next();
})

export default memberRouter;