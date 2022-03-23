const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
 
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {

        if(!req.body.username){

          res.status(500).send({ message: 'Username mandatory ', error:true  });
          return;
        }

        if(!req.body.email){

          res.status(500).send({ message: 'Email mandatory ', error:true  });
          return;
        }

        if(!req.body.password){

          res.status(500).send({ message: 'Password mandatory ', error:true  });
          return;
        }

  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8)
  });

  user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    return res.status(200).send({ message: "User Registered Succesfully ." , error:false});

 
  });
};

exports.signin = (req, res) => {

  
  if(!req.body.email){

    res.status(500).send({ message: 'Email mandatory ', error:true  });
    return;
  }

  if(!req.body.password){

    res.status(500).send({ message: 'Password mandatory ', error:true  });
    return;
  }


  User.findOne({
    email: req.body.email
  })
     .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });

 
     
      res.status(200).send({
        id: user._id,
        username: user.username,
        email: user.email,
         accessToken: token
      });
    });
};
