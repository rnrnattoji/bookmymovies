const express = require("express");
const bodyParser = require("body-parser");
const formData = require("express-form-data");

const { registerUser, verifyUser, generateToken } = require("./util/helper.js");

const app = express();

app.use(bodyParser.json());
app.use(formData.parse());
app.use(bodyParser.urlencoded({ extended: true }));

// Require the routes
var adminRoutes = require("./routes/admin");
var userRoutes = require("./routes/user");

// Register the routes
adminRoutes(app);
userRoutes(app);

// Route for creating an account
app.post("/api/createAccount", (req, res) => {
  const userName = req.body.userName;
  const password = req.body.password;

  if (
    userName == undefined ||
    userName == null ||
    password == undefined ||
    password == null
  ) {
    res.status(400).json({ message: "Please provide Username or Password." });
  }
  const inputData = {
    userName: userName,
    password: password,
  };

  registerUser(inputData, (err, token) => {
    if (err) {
      res.status(500).json({ message: "Error generating token" });
    } else {
      res.status(200).json({ message: "successful" });
    }
  });
});

// Route for generating a token (login)
app.post("/api/login", async (req, res) => {
  const userName = req.body.userName;
  const password = req.body.password;

  if (
    userName == undefined ||
    userName == null ||
    password == undefined ||
    password == null
  ) {
    res.status(400).json({ message: "Please provide Username or Password." });
  }

  const accessCond = await new Promise((resolve, reject) => {
    resolve(verifyUser(userName, password));
  })

  if (!accessCond) {
    res.status(401).json({ message: "Unauthorized" });
  }

  const payload = {
    userName: userName,
    password: password,
  };

  generateToken(payload, (err, token) => {
    if (err) {
      res.status(500).json({ message: "Error generating token" });
    } else {
      res.json({ token: token });
    }
  });
});

app.listen(8005, () => {
  console.log("Server Started on port 8005");
});
