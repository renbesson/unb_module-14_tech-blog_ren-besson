const withAuth = (req, res, next) => {
  // If the user is not logged in, redirect the request to the login route
  if (!req.session.isLogged) {
    res.redirect("/signin");
  } else {
    next();
  }
};

module.exports = withAuth;
