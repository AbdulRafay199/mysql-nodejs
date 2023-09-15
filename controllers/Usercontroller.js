const bcrypt = require("bcryptjs");
const {validationResult } = require('express-validator');
const jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser")

const jwtseckey = "createimpact22portal"
const connectdb = require("../dbconnection")

const db = connectdb();


//controller for adding new user
const signup = async (req, res)=>{
    let success = false;
    try{
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        } else {
            const pwsalt = await bcrypt.genSalt(10);
            const secpass = await bcrypt.hash(req.body.password, pwsalt);

            // Insert the new user into the database
            db.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [
            req.body.username,
            req.body.email,
            secpass,
            ],(err,result)=>{
                if(err) return res.json(err)

                // Create JWT token
                const data = {
                    user: {
                        id: result.idusers,
                    },
                };
                success = true;
                const authtoken = jwt.sign(data, jwtseckey);

                res.json({ success, authtoken });
            });
        }
    }catch (err) {
      console.error(err);
      res.status(500).json({ success, error: 'Internal error occurred' });
    }
  };

//controller for fetching all user
const login = async (req, res)=>{
    let success = false;
    const error = validationResult(req);

    if(!error.isEmpty()){
        return res.status(400).json({errors: error.array()});
    }
    else{
        try {
            //user.find finds all the data user db and store it to userdata variable as array
            db.query('SELECT * FROM users WHERE email=?',[req.body.email], async (err,result)=>{
                if(err) return res.json(err)

                if(result.length===0){
                    console.log("Please Login with correct email and password")
                    res.status(400).json({success, error:"Please Login with correct email and password"});
                }
                else{
                    const pwauth = await bcrypt.compare(req.body.password,result[0].password);
                    if(!pwauth){
                        console.log("Please Login with correct email and password")
                        res.status(400).json({success, error:"Please Login with correct email and password"});
                    }
                    else{
                        const data = {
                            user : {
                                id: result[0].idusers
                            }
                        }
                        success = true
                        const authtoken = jwt.sign(data,jwtseckey);
                        res.json({success,authtoken})
                    }
                }  
            })
        } catch (error) {
            console.log(error);
            res.status(500).json("Internal error occurred")
        }
    }
};

//controller for updating specific user
const updateuser = async (req, res)=>{
    var success = false
    try {
        // user.findByIdAndUpdate updates the user data by taking user id in first param and new data in 2nd param
        
    } catch (error) {
        console.log(error);
        res.status(500).json({success:success,msg:"Internal error occurred"})
    }
};

//controller for deleting specific user
const dltuser = async (req, res)=>{
    var success = false
    try {
        // user.findByIdAndDelete deletes that user whose id is given in the argument of func.
    
    } catch (error) {
        console.log(error);
        res.status(500).json({success:success,msg:"Internal error occurred"})
    }
};

module.exports = {
    signup,login,updateuser,dltuser
}