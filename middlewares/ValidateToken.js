const jwt = require("jsonwebtoken")


const Validate = (req, res, next)=>{
    const token = req.headers["authorization"].split(" ")[1]
    jwt.verify(token, process.env.LOCALKEY,{expiresIn:"12h"}, (error, data)=>{
        if (error) {
            return res.status(404).json({status:"token no valido"})
        }
        console.log(data)
        next()
    })
}

module.exports = Validate