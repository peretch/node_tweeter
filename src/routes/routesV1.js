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
    
    /**
     * This function returns general API's information
     */
    router.get('/', (req, res) => {
        res.json({
            apiInformation: {
                version:   '1.0',
                releaseDate: new Date('2019-11-28').toString()
            }
        });
    });

    /**
     * Creates a new user and gives one token to interact with all the APIs.
     * @param {String} email    - Unique user's email
     * @param {String} password - Pasword for the user
     * @param {String} name     - User's name
     * @returns {User} Created user
     */
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
                        message: `The given email '${err.keyValue.email}' is alredy in use.`
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

    /**
     * Given an email and his password, returns a token to interact with all the APIs.
     * @param {String} email    - Unique user's email
     * @param {String} password - Pasword for the user
     * @returns {String} Bearer token
     */
    router.post('/sessions', json(), (req, res) => {
        const userPayload = req.body;

        User.findOne({ email: userPayload.email })
            .then((userDoc) => {
                return Promise.all([
                    userDoc,
                    compare(
                        userPayload.password, 
                        userDoc.password
                    )
                ]);
            })
            .then(([{email}]) =>  {
                const token = sign({ email }, JWT_SECRET);

                res.json({
                    user: email,
                    token
                })
            })
            .catch((error) => {
                res
                    .status(400)
                    .json({
                        error: error.message
                    });
            })
    })

    router.put('/users', json(), checkJwt({ secret: JWT_SECRET }), (req, res) =>{
        const userPayload = req.body;
        res.json(userPayload);
    });

    app.use('/v1', router);
}