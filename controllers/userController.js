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
        
    },

    update: async function (req, res){

        const user = await USER.findOne({email: req.body.email})

        const biblioteca = user.music

        const newMusic = req.body.music
        const filter = {email:req.body.email}
        const update = {music: [...biblioteca, newMusic]}

        function noAdd(music){
            return music == newMusic
        }

        if(biblioteca.find(noAdd) == newMusic){
            return res.status(400).send("this music already add")
        }

        const selectedUser = await USER.findOneAndUpdate(filter, update, {new: true})

        return res.send(selectedUser)
    },

    delete: async function(req, res){

        const filter = {email: req.body.email}
        const musicToDelete = req.body.music

        const deletedMusic = await USER.findOneAndUpdate(filter, {$pull: {music: musicToDelete}})

        return res.send(deletedMusic)
    },

    userMusic: async function(req, res){

        let filter = {email: req.body.email}
    
        const userMusics = await USER.findOne(filter)

        try {
            res.send(userMusics.music)
        } catch (error) {
            res.send(error)
        }
    }
}


module.exports = userController