const express = require("express");
const app = express();
const cors = require('cors')
const routerUser = require("./routes/user")
const routerChatgpt = require("./routes/chatgpt")
const MongoConnect = require("./mongoConnect")
app.use(express.json())
require("dotenv").config();

MongoConnect();

app.use(cors())

app.use("/user", routerUser);

app.use("/chatgpt", routerChatgpt);

app.listen(process.env.PORT, ()=>{
    console.log("Servidor iniciado");
})
