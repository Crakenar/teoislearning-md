
import express from "express";
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import cors from "cors"

import authenticationEndpointHandler from "./authentification/index.js";
import adaptRequest from "./helpers/adapt-request.js";
// const express = require('express');
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcryptjs');
// const  cors = require("cors");
// const adaptRequest = require("./helpers/adapt-request");



const app = express();
app.use(cors());
app.use(express.json());




app.all('/api/authentication', authenticationController);

function authenticationController(req, res) {
    const httpRequest = adaptRequest(req);
    authenticationEndpointHandler(httpRequest)
        .then(({headers, statusCode, data}) => {
            console.log(data)
            res
                .set(headers)
                .status(statusCode)
                .send(data)
        }).catch((e) => {
            console.log(e.message)
            res.status(500).end()
    })
}

app.get('/api', (req,res) => {
    res.json({
        message: "Hello authentication"
    })
});

app.post('/api/login',  (req, res) => {
    db.query(`select * from user where name = ?`,[req.body.username], async (err, result) => {
        if (err) return res.sendStatus(404)

        if (result != null){
            if(!result[0]) return res.sendStatus(404)
            if (await bcrypt.compare(req.body.password, result[0].password)){
                return res.sendStatus(200)
            }else {
                return res.sendStatus(404)
            }
        }
    })
})

app.get('/api/logout', (req, res) => {
    console.log('logout api');
    res.json({
        message: 'logout api'
    })
})

app.listen(5001, () => {
    console.log('listening on 5001')
})