import express, { response } from 'express';
import passport from 'passport';
import { addEmployer } from '../db/db-api.js';

const employerRouter = express.Router();

// Signup Request
employerRouter.post('/signup', express.urlencoded(), async function (req, res, next) {

  if (req.body.email && req.body.password && req.body.dateOfBirth) {

    const employer = await addEmployer({
      email: req.body.email,
      dateOfBirth: req.body.dateOfBirth,
      password: req.body.password
    }).then((member) => console.log("Added Employer", member))
      .catch((err) => console.log("Failed to add employer"))
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
employerRouter.post('/login', express.json(), function (req, res, next) {

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
employerRouter.post('/logout', (req, res) => {
  //note that req.logout() does not work!
  req.session.destroy(function (err) {
    res.sendStatus(200);
  })
});

employerRouter.post('/*', (req, res) => {
  res.sendStatus(404);
});

employerRouter.use((error, req, res, next) => {
  console.log("Error: ", error);
  res.sendStatus(error.sendStatus);
  next();
})

export default employerRouter;