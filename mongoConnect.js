const mongoose = require("mongoose")
require("dotenv").config();


const MongoConnect = () =>{
    mongoose.connect(process.env.urlMongo)
        .then(()=>{
            console.log("conexion a la base de datos exitosa")
        })
        .catch((error)=>{
            console.log(error)
        })
}

module.exports = MongoConnect;