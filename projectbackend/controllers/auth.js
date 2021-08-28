const User = require("../models/user"); //accessing from models

const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");

exports.signup = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
      param: errors.array()[0].param,
    });
  }

  const user = new User(req.body); //creating a user when the details are sent
  user.save((err, user) => {
    //saving the data to the database
    if (err) {
      //if a error is occured when saving
      return res.status(400).json({
        //return the status code along with a json specifying the error to the front end
        err: "NOT able to save user in DB",
      });
    }
    res.json({
      name: user.name,
      email: user.email,
      id: user._id,
    });
  });
};

exports.signin = (req, res) => {
  const errors = validationResult(req);
  const { email, password } = req.body;
  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }

  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "USER email does not exists",
      });
    }
    // checking if the password mathces , authenticate is the method that is defined in the user model , that checks if the password matches
    if (!user.authenticate(password)) {
      return res.status(401).json({
        error: "Email and Password does not match",
      });
    }
    // CREATING TOKEN
    const token = jwt.sign({ _id: user._id }, process.env.SECRET);
    // put token into a cookie
    res.cookie("token", token, { expire: new Date() + 9999 });
    // res to front end
    const { _id, name, email, role } = user;
    return res.json({ token, user: { _id, name, email, role } });
  });
};

exports.signout = (req, res) => {
  res.clearCookie("token");
  res.json({
    message: "User Signed out successfully",
  });
};

// Protected routes
exports.isSignedIn = expressJwt({
  secret: process.env.SECRET,
  userProperty: "auth",
});

// Custom middlewares
exports.isAuthenticated = (req, res, next) => {
  // req.profile is setup by the front end
  let checker = req.profile && req.auth && req.profile._id == req.auth._id;
  if (!checker) {
    return res.status(403).json({
      error: "ACCESS DENIED",
    });
  }

  next();
};

exports.isAdmin = (req, res, next) => {
  if (req.profile.role === 0) {
    return res.status(403).json({
      error: "You are not ADMIN",
    });
  }
  next();
};
