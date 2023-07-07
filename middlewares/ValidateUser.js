
const Validate = (req, res, next) =>{
    const {user, password, name} = req.body;

    if (user.length==0) {
        return res.status(400).json({status:"el contenido del user esta vacio"});
    }else if(password.length==0){
        return res.status(400).json({status:"el contenido del password esta vacio"});
    }else if(name.length==0){
        return res.status(400).json({status:"el contenido del name esta vacio"});
    }
    
    next();
}

module.exports = Validate;