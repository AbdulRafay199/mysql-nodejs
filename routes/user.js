const express = require("express");
const router = express.Router();
const { body, validationResult} = require('express-validator');
const {updateuser, dltuser, login, signup, fetchoneuser, fetchalluser } = require("../controllers/Usercontroller");
const fetchuser = require("../middleware/fetchuser")


//All routes for user
router.post('/signup',[
    body('email',"please Enter valid email").isEmail(),
    body("username","Name should be minimum 3 characters long").isLength({min:3}),
    body("password","password should be minimum 8 characters long").isLength({min:8}),
], signup)
router.post('/login',[
    body('email',"please Enter valid email").isEmail(),
], login)
// router.patch('/updateuser/:id',fetchuser, updateuser)
router.delete('/deleteuser',fetchuser, dltuser)
router.get('/fetchalluser', fetchalluser)
router.get('/fetchoneuser',fetchuser, fetchoneuser)

module.exports = router;