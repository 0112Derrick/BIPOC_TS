function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  else {
    console.log("Not authorized");
    res.redirect('/login')
  }
}

export { ensureAuthenticated };
