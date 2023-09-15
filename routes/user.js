const express = require("express");
const router = express.Router();
const { body, validationResult} = require('express-validator');
const {updateuser, dltuser, login, signup } = require("../controllers/Usercontroller");

//All routes for user
router.post('/signup', signup)
router.post('/login', login)
router.patch('/updateuser/:id', updateuser)
router.delete('/deleteuser/:id', dltuser)

module.exports = router;