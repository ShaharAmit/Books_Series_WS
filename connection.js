const mongoose = require('mongoose'),
    consts = require('./consts'),
    options = {
        reconnectTries: 10, // 10 times trying to reconnect
        reconnectInterval: 1000, // Reconnect every 1000ms
    };

mongoose.connect(consts.MLAB_KEY,options);

//dev connection logs
mongoose.connection.on('error', (err) => console.log(`Connection error: ${err}`));
mongoose.connection.on('connected', () => console.log('Connected to Database '));
mongoose.connection.on('disconnected', () => console.log('Disconnected from Database'))