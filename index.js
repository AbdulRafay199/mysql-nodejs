const express = require("express")

const app = express();
app.use(express.json());
app.use("/user", require("./routes/user.js"))

app.listen(8000, ()=>{
    console.log("ciportal backend running successfully!")
})
