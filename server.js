'use strict';

const http = require('http');
const Lab3Controller = require('./modules/lab3.js');

class Server {
    constructor(port) {
        this.port = port;
        this.lab3Controller = new Lab3Controller();
    }

    start() {
        http.createServer((req, res) => {
            this.lab3Controller.handleRequest(req, res);
        }).listen(this.port);

        console.log(`Server is running on port ${this.port}`);
    }
}

const server = new Server(8080);
server.start();