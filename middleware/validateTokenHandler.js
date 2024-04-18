// require('dotenv').config();
// const jwt = require('jsonwebtoken');
// const db = require('../config/dbConnection'); // Ensure dbConnection is properly imported

// const validateTokenHandler = async (req, res, next) => {
//     try {
//         const authHeader = req.headers.authorization;
//         if (!authHeader || !authHeader.startsWith('Bearer ')) {
//             return res.status(401).json({ message: 'Authorization token is missing or not in proper format.' });
//         }
//         const token = authHeader.split(' ')[1];

//         jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
//             if (err) {
//                 console.error("JWT Verification Error:", err);
//                 return res.status(401).json({ message: 'Failed to authenticate token.', error: err.message });
//             }

//             if (!decoded || !decoded.id) {
//                 return res.status(401).json({ message: 'Invalid token data. Required user details are not present in the token.' });
//             }

//             db.query('SELECT * FROM users WHERE id = ?', [decoded.id], (dbError, results, fields) => {
//                 if (dbError) {
//                     console.error("Database access error:", dbError);
//                     return res.status(500).json({ message: 'Error accessing the database.', error: dbError.message });
//                 }

//                 if (!results || results.length === 0) {
//                     return res.status(404).json({ message: 'User not found.' });
//                 }
                
//                 const user = results[0];
//                 req.user = user;
//                 next();
//             });
//         });
//     } catch (error) {
//         console.error("Error in token validation:", error);
//         res.status(500).json({ message: 'Server error while validating token.', error: error.message });
//     }
// };

// module.exports = validateTokenHandler;




require('dotenv').config();
const jwt = require('jsonwebtoken');

const validateTokenHandler = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'No token provided or token format is incorrect.' });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'No token provided.' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            console.error("JWT Verification Error:", err);
            return res.status(401).json({ message: 'Failed to authenticate token.', error: err.message });
        }


        if (!decoded ) {
            return res.status(401).json({ message: 'Invalid not decoded.' });
        }
        if (!decoded.username ) {
            return res.status(401).json({ message: 'Invalid username ' });
        }
        // if (!decoded.id) {
        //     return res.status(401).json({ message: 'Invalid user id ' });
        // }

        // if (!decoded || !decoded.user )|| !decoded.user.id) {
        //     return res.status(401).json({ message: 'Invalid token data.' });
        // }

        // Assuming the user info from the decoded token is enough to set the req.user,
        // otherwise, you might need to fetch additional user details from the database.
        req.user = { username: decoded.username }; // Simplified user object
        next();
    });
};

module.exports = validateTokenHandler;
