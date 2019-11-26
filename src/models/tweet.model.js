const mongoose      = require('mongoose');
const TweetSchema    = require('../schemas/tweet.schema');

module.exports  =   mongoose.model('Tweet', TweetSchema);