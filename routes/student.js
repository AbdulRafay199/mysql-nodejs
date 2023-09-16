const express = require("express");
const router = express.Router();
const { body, validationResult} = require('express-validator');
const { addstudent, dltstudent, fetchallstudent, updatestudent } = require("../controllers/Studentcontroller");


//All routes for user
router.post('/addstudent',[
    body('email',"please Enter valid email").isEmail(),
], addstudent)
router.patch('/updatestudent/:id', updatestudent)
router.delete('/deletestudent/:id', dltstudent)
router.get('/fetchallstudent', fetchallstudent)
// router.get('/fetchoneuser',fetchoneuser)

module.exports = router;