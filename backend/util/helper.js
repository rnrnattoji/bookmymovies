const { createHash } = require("crypto");
const jwt = require("jsonwebtoken");
const ObjectId = require("mongodb").ObjectId;

const { secretKey } = require("../config/app-config.js");
const db = require("../util/db-initializer.js");

// Middleware function to Generate Hashed Password
const generateHashedPassword = (plainPassword) => {
  return new Promise((resolve, reject) => {
    resolve(createHash("sha256").update(plainPassword).digest("hex"));
  });
};

// Middleware function to Register Users
const registerUser = async (payload, callback) => {
  const datetime = new Date();
  const addedDate = datetime.toISOString().slice(0, 19).replace("T", " ");
  const userId = new ObjectId();
  const hashedPassword = await generateHashedPassword(payload.password);

  const dataToInsert = {
    id: userId.toString(),
    userName: payload.userName,
    password: hashedPassword,
    vipUntil: addedDate,
  };

  const query = "INSERT INTO users SET ?";
  db.query(query, dataToInsert, (error, results) => {
    if (error) {
      callback(error, null);
    } else {
      callback(null, results);
    }
  });
};

// Middleware function to verify user
const verifyUser = async (userName, password) => {
  const hashedPassword = await generateHashedPassword(password);
  const query = `SELECT COUNT(id) FROM users  WHERE (userName = '${userName}' AND password = '${hashedPassword}');`;

  const cursor = await new Promise((resolve, reject) => {
    db.query(query, (error, rows) => {
      resolve(rows);
    });
  });

  if (cursor == undefined) {
    return false;
  }
  var count = 0;
  cursor.forEach((record) => {
    if ("COUNT(id)" in record) {
      count += record["COUNT(id)"];
    }
  });
  
  if (count > 0) {
    return true;
  }
  return false;
};

// Middleware function to generate token
const generateToken = (payload, callback) => {
  jwt.sign(payload, secretKey, { expiresIn: "1h" }, (err, token) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, token);
    }
  });
};

// // Middleware function to verify token
// const verifyToken = (req, res, next) => {
//   const token = req.headers["authorization"];
//   if (!token) return res.status(401).json({ message: "Unauthorized" });

//   jwt.verify(token, secretKey, (err, decoded) => {
//     if (err) return res.status(403).json({ message: "Forbidden" });
//     req.user = decoded;
//     next();
//   });
// };

module.exports = { registerUser, verifyUser, generateToken };
