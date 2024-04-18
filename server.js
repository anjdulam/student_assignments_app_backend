require('dotenv').config(); // Load environment variables
const express = require('express');
const app = express();
const port = process.env.APP_PORT || 5000; // Use port from environment variables

// Middleware for parsing JSON data
app.use(express.json());

// Routes setup using middleware
app.use('/api/students', require("./routes/studentRoutes")); // Adjusted for student routes
app.use("/api/users", require("./routes/userRoutes")); // User routes remain the same

// Error handler middleware
const errorHandler = require('./middleware/errorHandler');
app.use(errorHandler);

console.log("Database Port:", process.env.DB_PORT); 
// Start the server
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
