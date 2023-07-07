const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
require("dotenv").config()
const jwt = require("jsonwebtoken");
const bcrypts = require("bcryptjs");
const userModel = require("../models/user");
const ValidateToken = require("../middlewares/ValidateToken");
const ValidateUser = require("../middlewares/ValidateUser");
const ValidateLogin = require("../middlewares/ValidateLogin");
const regAcces = require("../middlewares/RegAcces");

router.get("/:id", ValidateToken, async(req, res)=>{
    try {
        const id = req.params.id;
        const user = await userModel.findById(id);
        if (!user) {
            return res.status(404).json({status: "no encontrado"});
        }
        return res.status(200).json(user);
        
    } catch (error) {
        console.log(error);
        res.status(400).json({status:"error"});
    }
});

router.post("/login", ValidateLogin, async(req, res)=>{
    try {
        const {user, password} = req.body;
        const userFind = await userModel.findOne({ user: user });
        if (!userFind) {
            return res.status(200).json({status: "no encontrado"});
        }
        const hash = bcrypts.hashSync(password, userFind.salt);
        if (hash===userFind.password) {
            jwt.sign({userFind}, process.env.LOCALKEY, (error, token)=>{
                if (error) {
                    console.log(error)
                    return res.status(400).json({status: "token no generado"})
                }
                return res.status(200).json({token: token})

            })
            // res.status(200).json({token: "aceptado"});
        }else{
            res.status(400).json({status:"contraseña erronea"});
        }
        // const saltS = bcrypts.genSaltSync(10)
        
    } catch (error) {
        res.status(400).json({status:"error"});
    }
});

router.post("/", ValidateUser, regAcces, async(req, res)=>{
    try {
        const {user, password, name} = req.body;
        const salt = bcrypts.genSaltSync(10);
        const hash = bcrypts.hashSync(password, salt);
        const date = new Date();
        const newUser = new userModel({user: user, password: hash, name: name, salt: salt, date_create: date});
        await newUser.save();
        res.status(200).json(newUser);
    } catch (error) {
        res.status(400).json({status:"error"});
    }
});

router.put("/:id", ValidateToken, regAcces, async(req, res)=>{
    try {
        const id = req.params.id;
        const {user, password, name} = req.body;
        const salt = bcrypts.genSaltSync(10);
        const hash = bcrypts.hashSync(password, salt);
        const update = await userModel.findByIdAndUpdate(id, {user: user, password: hash, salt: salt, name: name}, {new: true});
        if (!update) {
            return res.status(400).json({status: "no encontrado"});
        }
        res.status(201).json(update);
    } catch (error) {
        console.log(error);
        res.status(400).json({status:"error"});
    }
});

router.delete("/:id", ValidateToken, regAcces, async (req, res)=>{
    try {
        const id = req.params.id;
        const userDelete = await userModel.findByIdAndDelete(id);
        if (!userDelete) {
            return res.status(400).json({status: "no encontrado"});
        }
        res.status(201).json({status: "eliminado"});
    } catch (error) {
        console.log(error);
        res.status(400).json({status:"error"});
    }
});


module.exports = router;