const express   = require('express');
const mongoose  = require('mongoose');

const app = express();
const setRoutesV1 = require('./src/routes/routesV1.js');

mongoose.connect('mongodb://localhost/tweeter', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})
.then(() => {
    console.log('Connected to mongoDB');

    setRoutesV1(app);

    app.listen(3000, () => {
        console.log('Server initialized');
    });
})
.catch((err) => {
    console.error(err);
    mongoose.connection.close();
})