const mongoose = require("mongoose");

const Restaurent = mongoose.model(
  "Restaurent",
  new mongoose.Schema({
    name: String,
    place: String,
    img: String,
    price: String,
   
  })
);

module.exports = Restaurent;
