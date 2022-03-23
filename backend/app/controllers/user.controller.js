const config = require("../config/auth.config");
const db = require("../models");
const Restaurent = db.restaurent;
const User = db.user;


exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};


exports.createres = (req, res) => {

const user = new Restaurent({
  name: "MDH 4",
  price: 89,
  place: "Delhi",
  img: "https://4.imimg.com/data4/BC/EC/MY-2353689/restaurant-furniture-set-500x500.jpg",
});

user.save((err, user) => {
  if (err) {
    res.status(500).send({ message: err });
    return;
  }
  return res.status(200).send({ message: "res added Succesfully ." , error:false});


});
};

exports.getallrestaurant = (req, res) => {
  const title = req.body.name;
  var condition = title ? { name: { $regex: new RegExp(title), $options: "i" } } : {};

  Restaurent.find( condition  )
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving tutorials."
    });
  });

 
};
