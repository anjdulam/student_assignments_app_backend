const express = require("express");
const router = express.Router();

const { registerUser, currentUser, loginUser } = require("../controllers/userController");
const validateToken = require("../middleware/validateTokenHandler");

// Route for user registration
router.post("/register", registerUser);

// Route for user login
router.post("/login", loginUser);

// Route for getting current user information, protected by token validation
router.get("/current", validateToken, currentUser);

module.exports = router;
