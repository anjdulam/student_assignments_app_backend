// require('dotenv').config();
// const asyncHandler = require("express-async-handler");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const pool = require('../config/dbConnection'); // Using the pool

// //@desc Register a user
// //@route POST /api/users/register
// //@access public
// const registerUser = asyncHandler(async (req, res) => {
//   const { username, email, password } = req.body;
//   if (!username || !email || !password) {
//     res.status(400);
//     throw new Error("All fields are mandatory!");
//   }

//   // Checking if the user with the same email already exists
//   pool.query('SELECT id FROM users WHERE email = ?', [email], async (error, users) => {
//     if (error) {
//       console.error("Error checking user existence:", error);
//       return res.status(500).json({ message: error.message });
//     }
//     if (users.length > 0) {
//       return res.status(400).json({ message: "User already registered with the email id!" });
//     }

//     // Hash password
//     const hashedPassword = await bcrypt.hash(password, 10);
//     pool.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', 
//     [username, email, hashedPassword], (error, result) => {
//       if (error) {
//         console.error("Error registering user:", error);
//         return res.status(500).json({ message: error.message });
//       }
//       if (result.insertId) {
//         console.log("User registered successfully:", result.insertId);
//         res.status(201).json({ id: result.insertId, email: email });
//       } else {
//         res.status(400).json({ message: "User registration failed" });
//       }
//     });
//   });
// });

// //@desc Login user
// //@route POST /api/users/login
// //@access public
// const loginUser = asyncHandler(async (req, res) => {
//   const { email, password } = req.body;
//   if (!email || !password) {
//     res.status(400);
//     throw new Error("All fields are mandatory!");
//   }

//   pool.query('SELECT * FROM users WHERE email = ?', [email], async (error, users) => {
//     if (error) {
//       console.error("Error fetching user during login:", error);
//       return res.status(500).json({ message: error.message });
//     }
//     const user = users[0];

//     // Compare password with hashed password
//     if (user && (await bcrypt.compare(password, user.password))) {
//       // Generating access token once the user logs in
//       const accessToken = jwt.sign(
//         { username: user.username, email: user.email, id: user.id }, // payload that I want to embed in token
//         process.env.JWT_SECRET,
//         { expiresIn: "15m" }
//       );
//       console.log("User logged in successfully:", user.id);
//       res.status(200).json({ accessToken });
//     } else {
//       res.status(401).json({ message: "Email or password is not valid" });
//     }
//   });
// });

// //@desc Current user info
// //@route GET /api/users/current
// //@access private
// const currentUser = asyncHandler(async (req, res) => {
//   // Assuming `req.user` is populated from the middleware after decoding the JWT
//   console.log("Fetching current user info:", req.user.id);
//   res.json({ id: req.user.id, username: req.user.username, email: req.user.email });
// });

// module.exports = { registerUser, loginUser, currentUser };





require('dotenv').config();
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require('../config/dbConnection'); // Using the pool

//@desc Register a user
//@route POST /api/users/register
//@access public
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are mandatory!" });
  }

  pool.query('SELECT id FROM users WHERE email = ?', [email], async (error, users) => {
    if (error) {
      console.error("Error checking user existence:", error);
      return res.status(500).json({ message: error.message });
    }
    if (users.length > 0) {
      return res.status(400).json({ message: "User already registered with the email id!" });
    }

    // Hash password outside the callback for cleaner error handling
    const hashedPassword = await bcrypt.hash(password, 10);
    pool.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', 
    [username, email, hashedPassword], (error, result) => {
      if (error) {
        console.error("Error registering user:", error);
        return res.status(500).json({ message: error.message });
      }
      res.status(201).json({ id: result.insertId, email: email });
    });
  });
});

//@desc Login user
//@route POST /api/users/login
//@access public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "All fields are mandatory!" });
  }

  pool.query('SELECT * FROM users WHERE email = ?', [email], async (error, users) => {
    if (error) {
      console.error("Error fetching user during login:", error);
      return res.status(500).json({ message: error.message });
    }
    if (users.length === 0) {
      return res.status(401).json({ message: "Email or password is not valid" });
    }
    const user = users[0];

    console.log(user);
    // Compare password with hashed password
    if (await bcrypt.compare(password, user.password)) {
      // Generating access token once the user logs in
      const accessToken = jwt.sign(
        { username: user.username, email: user.email, id: user.id }, // payload that I want to embed in token
        process.env.JWT_SECRET,
        { expiresIn: "15m" }
      );
      res.status(200).json({ accessToken });
    } else {
      res.status(401).json({ message: "Email or password is not valid" });
    }
  });
});

//@desc Current user info
//@route GET /api/users/current
//@access private
const currentUser = asyncHandler(async (req, res) => {
  console.log("Fetching current user info:", req.user.id);
  res.json({ id: req.user.id, username: req.user.username, email: req.user.email });
});

module.exports = { registerUser, loginUser, currentUser };
