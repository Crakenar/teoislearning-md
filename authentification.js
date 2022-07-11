require('dotenv').config()

const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const mysql = require('mysql');
const  cors = require("cors");


const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DB
});

db.connect((err) => {
    if (err){
        console.log(err)
    }else {
        console.log('connected to mysql')
    }
});

app.get('/api', (req,res) => {
    res.json({
        message: "Hello authentification"
    })
});

app.post('/api/login',  (req, res) => {
    console.log('login api ');
    db.query(`select * from user where name = ?`,[req.body.username], (err, result) => {
        if (err) return res.sendStatus(404)
        if (result){
            console.log(result)
            if (req.body.password === result.password){
                res.sendStatus(200)
            }else {
                console.log('here')
                res.sendStatus(404)
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