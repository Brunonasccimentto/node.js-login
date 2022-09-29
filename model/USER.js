const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({     
    name: {type: String, required: true, minlength: 5, maxlength: 20},  
    email: {type: String, required: true}, 
    password: {type: String, required: true, minlength: 6, maxlength: 100},
    createdAt: {type: Date, default: Date.now},
    visits: {type: Number, default: 0}        
})

const USER = mongoose.model("User", userSchema) 


module.exports = USER