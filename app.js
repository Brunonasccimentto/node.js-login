require("dotenv").config()
const express = require("express")
const app = express()
const userRouter = require("./routes/users")
const mongoose = require("mongoose")
const auth = require("./controllers/authController")
const path = require("path")
const cors = require("cors")

mongoose.connect(process.env.MONGO_URL, (err)=>{
    if(err){
        console.log(err)
    } else {
        console.log("banco conectado")
    }
    
})

app.use(cors({
    origin: true
  }))
app.use(express.json())

app.use("/user", userRouter)

app.get("/", auth , (req, res)=>{
    
    res.sendFile(path.join(__dirname, "musicApp/music/build/index.html", function (err){
        if(err){
            res.status(500).redirect("user/login")
        }
    }))
    
})

app.listen(process.env.PORT, () =>{ console.log("server running")})

