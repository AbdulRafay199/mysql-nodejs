const { validationResult } = require("express-validator");
const connectdb = require("../dbconnection")

const db = connectdb();

const addstudent = async (req, res)=>{
    var success = false
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        else{
            //creates new data in the database
            const q ="INSERT INTO students (firstname,lastname,age,projects,rating,image,type,skillTitle,skill,qualification,gender,email,overview) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)"
            const tagq = "INSERT INTO student_tags (student_id, tag) VALUES (?, ?)"
            db.query(q,[req.body.firstname,req.body.lastname,req.body.age,req.body.projects,req.body.rating,req.body.image,req.body.type,req.body.skillTitle,req.body.skill,req.body.qualification,req.body.gender,req.body.email,req.body.overview],(err,result)=>{
                if(err) return res.json(err)
    
                console.log(result)
                req.body.tags.map((each)=>{
                    return db.query(tagq,[result.insertId,each])
                })
    
                res.json("student inserted")
            })
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).json({success:success,msg:"Internal error occurred"})
    }
};

//controller for fetching all student
const fetchallstudent = async (req, res)=>{
    try {
        //student.find finds all the data student db and store it to studentdata variable as array
        const q = `SELECT s.idstudents AS id, s.firstname, s.lastname, s.age, s.projects, s.rating, s.image, s.type, s.skillTitle, s.skill, s.qualification, s.gender, s.email, s.overview, JSON_ARRAYAGG(t.tag) AS tags FROM students s LEFT JOIN student_tags t ON s.idstudents = t.student_id GROUP BY s.idstudents, s.firstname, s.lastname, s.age, s.projects, s.rating, s.image, s.type, s.skillTitle, s.skill, s.qualification, s.gender, s.email, s.overview`

        db.query(q,(err,result)=>{
            if(err) return res.json(err)

            return res.json(result)
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json("Internal error occurred")
    }
};

//controller for updating specific student
const updatestudent = async (req, res)=>{
    var success = false
    try {
        // student.findByIdAndUpdate updates the student data by taking student id in first param and new data in 2nd param
        
    } catch (error) {
        console.log(error);
        res.status(500).json({success:success,msg:"Internal error occurred"})
    }
};

//controller for deleting specific student
const dltstudent = async (req, res)=>{
    var success = false
    try {
        // student.findByIdAndDelete deletes that student whose id is given in the argument of func.
        
    } catch (error) {
        console.log(error);
        res.status(500).json({success:success,msg:"Internal error occurred"})
    }
};

module.exports = {
    addstudent,fetchallstudent,updatestudent,dltstudent
}