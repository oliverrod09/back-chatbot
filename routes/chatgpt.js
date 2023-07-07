const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const axios = require("axios");
const chatgptModel = require("../models/chatgpt");
const chatsModel = require("../models/chats");
const userModel = require("../models/user");
const ValidateToken = require("../middlewares/ValidateToken");
const ValidatePrompt = require("../middlewares/ValidatePrompt");
const ValidateDatosChatgpt = require("../middlewares/ValidateDatosChatgpt");
const regAcces = require("../middlewares/RegAcces");


//enviar pregunta a chatgpt
router.post("/", ValidateToken, ValidatePrompt, regAcces, async (req, res) => {
    try {
      const {prompt, id_chat} = req.body;
  
      const token = req.headers["authorization"].split(" ")[1];
      jwt.verify(token, process.env.LOCALKEY, async (error, data) => {
        if (error) {
          return res.status(404).json({ status: "no estás loggeado" });
        }
        const user_id = data.userFind._id;
  
        try {
          const responses = await axios.post(
            process.env.urlApi,
            {
              model: "gpt-3.5-turbo",
              messages: [
                { role: "system", content: "Devuelve un json con una lista de posibles isos para este tipo de empresa" },
                { role: "user", content: `${prompt}`  }
            ],
              temperature: 0.7,
              max_tokens: 800,
              top_p: 1,
              frequency_penalty: 0,
              presence_penalty: 0,
            },
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.apiKey}`,
              },
            }
          );
  
          const response = responses.data.choices[0].message.content;
          const date = new Date();
          const chatgpt = new chatgptModel({
            prompt: prompt,
            response: response,
            id_chat: id_chat,
            id_user: user_id,
            date_create: date,
          });
          await chatgpt.save();
          res.send(response);
        }catch (error) {
          console.log(error);
          res.status(500).send("Error con la API de OpenAI");
        }
      });
    } catch (error) {
      console.log(error);
      res.status(400).json({ status: "error en el servidor" });
    }
  });



  // traer todos los prompts de un chat
  router.get("/chat/:id", ValidateToken, regAcces, async (req, res) => {
    try {
      const id_chat = req.params.id
      const messages = await chatgptModel.find({id_chat})
      return res.status(200).json(messages)
    } catch (error) {
      console.log(error);
      res.status(400).json({ status: "error en el servidor" });
    }
  });


//crear chat 
router.post("/crear_chat", ValidateToken, ValidateDatosChatgpt, regAcces, async (req, res) => {
  try {
    const {empresa, cantidad_clientes, ubicacion } = req.body;
    const prompt = JSON.stringify(req.body);


    const token = req.headers["authorization"].split(" ")[1];
    jwt.verify(token, process.env.LOCALKEY, async (error, data) => {
      if (error) {
        return res.status(404).json({ status: "no estás loggeado" });
      }
      const user_id = data.userFind._id;

      try {
        const responses = await axios.post(
          process.env.urlApi,
          {
            model: "gpt-3.5-turbo",
            messages: [
              { role: "system", content: "Devuelve un json con una lista de posibles normas ISO para este tipo de empresa, la estructua debe ser un array de objetos y cada uno tendra campos iso, description" },
              { role: "user", content: `empresa: ${empresa} cantidad de clientes: ${cantidad_clientes} ubicación: ${ubicacion}`  }
          ],
            temperature: 0.2,
            max_tokens: 800,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${process.env.apiKey}`,
            },
          }
        );

        const response = responses.data.choices[0].message.content;
        const date = new Date();
        const chats = new chatsModel({
          empresa: empresa,
          cantidad_clientes: cantidad_clientes,
          ubicacion: ubicacion,
          response: response,
          id_user: user_id,
          date_create: date,
        });
        await chats.save();
        res.send(response);
      }catch (error) {
        console.log(error);
        res.status(500).send("Error con la API de OpenAI");
      }
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: "error en el servidor" });
  }
});

//consultar una pregunta hecha
router.get("/:id", ValidateToken, regAcces, async (req, res)=>{
    try {
        const id = req.params.id;
        const messageFind = await chatgptModel.findById(id);
        if (!messageFind) {
            return res.status(400).json({status: "no encontrado"});
        }
        res.status(200).json(messageFind);
    } catch (error) {
        console.log(error);
        res.status(400).json({ status: "error en el servidor" });
    }
});

//ver que consultas hizo un usuario
router.get("/user/:id_user",ValidateToken , regAcces, async (req, res)=>{
    try {
        const id_user = req.params.id_user;
        const exist = await userModel.findOne({_id: id_user})
        if (!exist) {
            return res.status(400).json({status: "este usuario no existe"})
        }
        const prompts = await chatgptModel.find({id_user});
        if (prompts.length==0) {
            return res.status(400).json({status: "este usuario no ha realizado consultas"});
        }
        res.status(200).json(prompts);
    } catch (error) {
        console.log(error);
        res.status(400).json({ status: "error en el servidor" });
    }
});

  module.exports = router;
  