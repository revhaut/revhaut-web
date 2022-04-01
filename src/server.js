const application = require('../src/app');
const debug = require('debug')('revhaut-app:server');
const http = require('http');
// dotenv = require('dotenv').config();
const express = require('express');
require('dotenv').config();

const app = express();
application(app);
var server = http.createServer(app);
const port = normalizePort(process.env.PORT || '3000');
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
    console.log(`Server started http://localhost:${addr.port} on env ${process.env.NODE_ENV || 'dev'}`);
    debug('Listening on ' + bind);
}