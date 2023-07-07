const mongoose = require("mongoose")

const chatgptSchema = new mongoose.Schema({
    prompt: String,
    response: String,
    id_chat: mongoose.Schema.Types.ObjectId,
    id_user: mongoose.Schema.Types.ObjectId,
    date_create: Date
});

const chatgptModel = mongoose.model("chatgpt", chatgptSchema);

module.exports = chatgptModel;