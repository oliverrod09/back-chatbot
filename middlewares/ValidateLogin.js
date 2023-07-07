
const Validate = (req, res, next) =>{
    const {user, password} = req.body;
    if (user.length==0) {
        return res.status(400).json({status:"el contenido del user esta vacio"});
    }else if(password.length==0){
        return res.status(400).json({status:"el contenido del password esta vacio"});
    }
    next();
}

module.exports = Validate;