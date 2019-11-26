const express = require('express');

// Function to parse bodyt
const { json } = require('body-parser');

// Functions to sign and decode tokens
const { sign, decode }  = require('jsonwebtoken');

// Function to hash and comare hashes
const { compare, hash } = require('bcrypt');

module.exports = (app) => {
    'use strict';
    
    var router = express.Router();

    router.get('/', (req, res) => {
        res.json({
            hola:   'mundo'
        });
    });

    app.use('/v1', router)
}