const jwt = require("jsonwebtoken")

function auth(req, res, next){
    
    const token = req.body.token
    if(!token) return res.status(401).send("acesso negado")

    try {
        const userVerified = jwt.verify(token, process.env.TOKEN_SECRET)
        req.user = userVerified;
        
        next()
        
    } catch (error) {
        res.status(401).send("acesso negado")
    }

}

module.exports = auth

