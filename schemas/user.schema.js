const mongoose  = require('mongoose');
const { Tweet } = require('../models');

module.exports  =   new mongoose.Schema(
    {
        name: {
            type: mongoose.Schema.Types.String,
            required: true
        },
        email: {
            type: mongoose.Schema.Types.String,
            required: true
        },
        password: {
            type: mongoose.Schema.Types.String,
            required: true
        }
    },
    {
        timestamps: true
    }
);