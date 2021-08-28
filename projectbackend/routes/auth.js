const { check, validationResult } = require("express-validator"); //validations of data
var express = require("express");
var router = express.Router();

const { signout, signup, signin, isSignedIn } = require("../controllers/auth");

router.post(
  "/signup",
  [
    check("name", "Name should be atleast 3 characters").isLength({ min: 3 }),
    check("email", "Email is required").isEmail(),
    check("password", "password should be min of 3 char").isLength({ min: 3 }),
  ],
  signup
);

router.post(
  "/signin",
  [
    check("email", "Email is required").isEmail(),
    check("password", "password field is required").isLength({ min: 1 }),
  ],
  signin
);

router.get("/signout", signout);

// protected test route
router.get("/testroute", isSignedIn, (req, res) => {
  //middleware coming from express so no need of next
  res.json(req.auth);
});
module.exports = router;
