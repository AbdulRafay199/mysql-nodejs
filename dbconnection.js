const mysql = require("mysql2")

const connectdb = ()=>{
    const db = mysql.createConnection({
        host:"localhost",
        user:"root",
        password:"rafayabdul#Mysqlroot2002123",
        database:"ciportal"
    })

    return db;
}

module.exports = connectdb;