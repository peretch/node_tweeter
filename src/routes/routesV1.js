const express = require('express');

// Function to parse bodyt
const { json } = require('body-parser');

// Functions to sign and decode tokens
const { sign, decode }  = require('jsonwebtoken');

// Function to hash and comare hashes
const { compare, hash } = require('bcrypt');

const checkJwt = require('express-jwt');

const { User, Tweet }  = require('../models');

const JWT_SECRET = 'exampleEncriptationCode';

module.exports = (app) => {
    'use strict';
    const router = express.Router();
    

    router.get('/', (req, res) => {
        res.json({
            hola:   'mundo'
        });
    });

    router.post('/users', json(), (req, res) => {
        const userPayload = req.body;

        hash(userPayload.password, 10)
            .then((hash) => {
                return User.create({
                    name:       userPayload.name,
                    email:      userPayload.email,
                    password:   hash,
                });
            })
            .then((doc) => {
                res.json(doc);
                const token = sign({}, JWT_SECRET);

                res
                .status(201)
                .json({
                    user: doc,
                    token
                })
            })
            .catch((err) => {
                if(err.code === 11000){
                    res
                    .status(401)
                    .json({
                        message: `El usuario con el email ${err.keyValue.email} ya existe en el sistema.`
                    })
                }else{
                    res
                    .status(400)
                    .json({
                        error: err.message
                    });
                }
            })
    });

    app.use('/v1', router);
}