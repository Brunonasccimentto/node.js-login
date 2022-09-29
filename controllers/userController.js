const USER = require("../model/USER")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const userController = {

    register: async function (req, res){

        const selectedUser = await USER.findOne({email: req.body.email})
        if (selectedUser) return res.status(400).send("email already exist")

        let user = new USER({
            name: req.body.name,  
            email: req.body.email, 
            password: bcrypt.hashSync(req.body.password),
        })

        try{
            const saveUser = await user.save()
            return res.send(saveUser)
        } catch (err) {
            res.status(400).send(err)
        }
        
    },
    login: async function (req, res){
       
        const selectedUser = await USER.findOne({email: req.body.email})
        const passwordMatch = bcrypt.compareSync(req.body.password, selectedUser.password)

        if(!selectedUser || !passwordMatch){
            return res.status(400).send("email or password invalid")
        }

        const token = jwt.sign({_id: selectedUser._id}, process.env.TOKEN_SECRET)

        return res.send(token)
        
    }
}


module.exports = userController