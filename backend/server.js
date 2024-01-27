const express = require("express");
const cors = require('cors');
const bodyParser = require("body-parser");
const formData = require("express-form-data");

const {
  checkUserExists,
  registerUser,
  verifyUser,
  generateToken,
} = require("./util/helper.js");

const app = express();

// Use cors middleware
app.use(cors());
app.use(bodyParser.json());
app.use(formData.parse());
app.use(bodyParser.urlencoded({ extended: true }));

// Require the routes
var adminRoutes = require("./routes/admin");
var userRoutes = require("./routes/user");
var resourceRoutes = require("./routes/resource");

// Register the routes
adminRoutes(app);
userRoutes(app);
resourceRoutes(app);

// Route for creating an account
app.post("/api/createAccount", checkUserExists, (req, res) => {
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
  });

  if (accessCond) {
    const payload = {
      userName: userName,
    };

    generateToken(payload, (err, token) => {
      if (err) {
        res.status(500).json({ message: "Error generating token" });
      } else {
        res.json({ token: token });
      }
    });
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
});

app.listen(8005, () => {
  console.log("Server Started on port 8005");
});
