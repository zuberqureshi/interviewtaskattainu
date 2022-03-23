const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/test/all", controller.allAccess);
  app.get("/api/test/createres", controller.createres);

  app.get("/api/test/user", [authJwt.verifyToken], controller.userBoard);


   app.post("/api/test/getallrestaurant", [authJwt.verifyToken], controller.getallrestaurant);

 



  
  app.get(
    "/api/test/mod",
    [authJwt.verifyToken ]
  );


  app.get(
    "/api/test/home",
    (req, res) => {
      res.json({ message: "Welcome to Zuber sign task application." });
    });
  app.get(
    "/api/test/admin",
    [authJwt.verifyToken]
  );
};
