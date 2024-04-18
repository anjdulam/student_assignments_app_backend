const express = require('express');
const router = express.Router();
const {
    getStudents,    // Renamed from getContacts
    getStudent,     // Renamed from getContact
    createStudent,  // Renamed from createContact
    updateStudent,  // Renamed from updateContact
    deleteStudent   // Renamed from deleteContact
} = require("../controllers/studentController"); // Changed to studentController
const validateToken = require('../middleware/validateTokenHandler');

// Use the validateToken middleware for all student routes
router.use(validateToken);

// Setup routes for students
// router.route("/")
//     .get(getStudents)    
//     .post(getStudents); 

router.get("/check",getStudents);
router.get("/check",getStudent);
router.post("/check",createStudent);
router.put("/check",updateStudent);
// router.get("/check",deleteStudent);



// router.route("/:id")
//     .get(getStudent)    
//     .put(updateStudent) 
//     .delete(deleteStudent); 

module.exports = router;
