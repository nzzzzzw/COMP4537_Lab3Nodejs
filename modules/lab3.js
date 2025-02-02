const url = require('url');
const messages = require('../lang/en/en.js');
const { DateUtils, FileUtils } = require('./utils.js');

class Lab3Controller {
    constructor() {
        this.fileUtils = new FileUtils();
        this.filename = 'file.txt';
    }

    async handleRequest(req, res) {
        const parsedUrl = url.parse(req.url, true);
        const pathname = parsedUrl.pathname;
        const query = parsedUrl.query;

        try {
            if (pathname.includes('/comp4537/labs/3/getDate')) {
                await this.handleGetDate(query, res);
            } else if (pathname.includes('/comp4537/labs/3/writeFile')) {
                await this.handleWriteFile(query, res);
            } else if (pathname.includes('/comp4537/labs/3/readFile')) {
                await this.handleReadFile(res);
            } else {
                this.sendError(res, messages.errorMessage);
            }
        } catch (error) {
            this.sendError(res, messages.errorMessage);
            this.sendError(res, messages.errorMessage, 500);
        }
    }

    async handleGetDate(query, res) {
        if (query.name) {
            const currentTime = DateUtils.getDate();
            const message = messages.greeting.replace('%s', query.name) + currentTime;
            this.sendResponse(res, message, true);
        } else {
            this.sendError(res, messages.errorMessage);
        }
    }

    async handleWriteFile(query, res) {
        if (query.text) {
            try {
                await this.fileUtils.appendToFile(this.filename, query.text);
                this.sendResponse(res, messages.writeSuccess);
            } catch (error) {
                this.sendError(res, messages.fileError);
            }
        } else {
            this.sendError(res, messages.errorMessage);
        }
    }

    async handleReadFile(res) {
        try {
            const data = await this.fileUtils.readFile(this.filename);
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end(data);
        } catch (error) {
            this.sendError(res, messages.fileNotFound);
        }
    }

    sendResponse(res, message, isBlue = false) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        const html = isBlue ? `<p style="color: blue">${message}</p>` : `<p><b>${message}</b></p>`;
        res.end(html);
    }

    sendError(res, message, statusCode = 404) {
        res.writeHead(statusCode, {'Content-Type': 'text/html'});
        res.end(`<p><b>${message}</b></p>`);
    }
}

module.exports = Lab3Controller;