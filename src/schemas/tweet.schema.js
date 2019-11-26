const mongoose  = require('mongoose');
// const { User }  = require('../models');
const { User } = require('../models');

module.exports  =   new mongoose.Schema(
    {
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        content: {
            type: mongoose.Schema.Types.String,
            required: true
        }
    },
    {
        timestamps: true
    }
);