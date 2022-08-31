const express = require("express"),
  router = express.Router(),
  UserModel = require("../models/users"),
  swaggerUi = require("swagger-ui-express"),
  swaggerDocument = require("./swagger.json");

router.use("/api", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// this is the base path

router.post("/users/register", async (req, res) => {
  try {
    console.log(req.body);
  } catch (error) {
    res.status(200).send({
      response: null,
      message: "Something went Wrong",
    });
  }
});

// registration route

// login route

// get user

// user dashboard

// user  can create blog

// user can update profile picture

// user can

module.exports = router;
