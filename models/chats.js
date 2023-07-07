const mongoose = require("mongoose")

const chatsSchema = new mongoose.Schema({
    empresa: String,
    cantidad_clientes: String,
    ubicacion: String,
    response: String,
    id_user: mongoose.Schema.Types.ObjectId,
    date_create: Date
});

const chatsModel = mongoose.model("chat", chatsSchema);

module.exports = chatsModel;