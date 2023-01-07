const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
const sqlQuery = require("../config/db.js");

const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");

exports.postLogin = (req, res) => {
  // Form validation
  const { errors, isValid } = validateLoginInput(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const email = req.body.email;
  const password = req.body.password;
  // Find user by email
  sqlQuery(`SELECT * FROM users WHERE email = '${email}'`)
  .then(users => users[0])
  .then((user) => {
    // Check if user exists
    if (!user) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }
    // Check password
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        // User matched
        // Create JWT Payload
        const payload = user;
        
        // Sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 31556926, // 1 year in seconds
          },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token,
            });
          }
        );
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: "Password incorrect" });
      }
    });
  });
};

exports.postRegister = (req, res) => {
  // Form validation
  const { errors, isValid } = validateRegisterInput(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const name = req.body.name;
  const email = req.body.email;
  let password = req.body.password;
  sqlQuery(`SELECT * FROM users WHERE email = '${email}'`)
  .then(users => users[0])
  .then((user) => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    } else {      
      // Hash password before saving in database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, (err, hash) => {
            if (err) throw err;
            sqlQuery(`INSERT INTO users (name, email, password) VALUES ('${name}','${email}','${hash}')`)
            .then((user) => res.json(user))
            .catch((err) => console.log(err));
        });
      });
    }
  });
};
