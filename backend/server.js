const express = require("express");
const cors = require("cors");
const dbConfig = require("./app/config/db.config");

const app = express();
 

app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");
 
db.mongoose
.connect(dbConfig.url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  
  .then(() => {
    console.log("Successfully connect to MongoDB.");
   })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Zuber  task application." });
});

// routes
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);

// set port, listen for requests
const PORT =27017;
app.listen(PORT, () => {
  console.log( ` zuber`);

  console.log( ` Restaurant Server is running on port ${PORT}.`);
});
 
