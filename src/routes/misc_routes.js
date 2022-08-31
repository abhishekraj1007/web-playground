const express = require("express");
const router = express.Router();
const fs = require("fs");

router.use(function (req, res, next) {
  console.log(`Time: `, new Date().toISOString());
  console.log(`HOSTNAME: `, req.hostname);
  console.log(`IP ADDRESS`, req.ip);
  console.log();
  next();
});

const { listPrime, FILE_PATH, bootStrap } = require("../utils/utils");

router.get("/", (req, res) => {
  res.status(200).send(
    `<html>
          <body style="background : black;">
            <h1 style="color : white; text-align : center;"> Hello from the server ${
              process.env.APP_ID
            } </h1>
            <h2 style="color : red; text-align : center;">localPort :  ${
              process.env.PORT || 8080
            } </h1> 
            <h2 style="color : red; text-align : center;">remoteAddress :  ${
              req.connection.remoteAddress
            } </h1> 
            <h2 style="color : red; text-align : center;">remotePort :  ${
              req.connection.remotePort
            } </h1> 
            <h2 style="color : red; text-align : center;">localAddress  ${
              req.connection.localAddress
            } </h1> 
          </body>
        </html>`
  );
});

router.get("/users", (req, res) => {
  bootStrap();
  let response = fs.readFileSync(FILE_PATH, { encoding: "utf-8", flag: "r" });
  response = JSON.parse(response);
  response.unshift({ APP_ID: process.env.APP_ID });
  res.status(200).json(response);
});

router.get("/list-prime", (req, res) => {
  try {
    const { number } = req.query;
    const response = listPrime(number);
    res
      .status(200)
      .send({ APP_ID: process.env.APP_ID, number, primes: response });
  } catch (error) {
    console.error(error);
    res.status(400).send("Bad request");
  }
});

router.get("/admin", (req, res) => {
  if (res.statusCode !== 200) {
    res
      .status(403)
      .send(
        "<html> <body>  <h1>This is a forbidden site </h1> </body> </html>"
      );
  } else {
    res
      .status(200)
      .send("<html> <body>  <h1>Welcome to admin site</h1> </body> </html>");
  }
});

// This route is only to test for webhooks
router.post("/test-webhooks", (req, res) => {
  try {
    console.log(req.body);
    res.status(200).json({
      message: "recived something..",
    });
  } catch (error) {
    console.error(error);
    res.status(200).json({
      message: "My bad got nothing..",
    });
  }
});

module.exports = router;
