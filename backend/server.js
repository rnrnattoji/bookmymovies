const express = require('express');
const bodyParser = require('body-parser');
const formData = require('express-form-data');

const app = express();

app.use(bodyParser.json());
app.use(formData.parse());
app.use(bodyParser.urlencoded({ extended: true }));

// Require the routes
var adminRoutes = require('./routes/admin');
var userRoutes = require('./routes/user');

// Register the routes
adminRoutes(app);
userRoutes(app);

app.listen(8005, () => {
    console.log("Server Started on port 8005");
});
