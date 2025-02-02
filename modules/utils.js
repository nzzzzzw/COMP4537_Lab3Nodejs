class DateUtils {
    static getDate() {
        return new Date().toString();
    }
}

class FileUtils {
    constructor() {
        this.fs = require('fs');
    }

    appendToFile(filename, text) {
        return new Promise((resolve, reject) => {
            this.fs.appendFile(filename, text + '\n', (err) => {
                if (err) reject(err);
                else resolve();
            });
        });
    }

    readFile(filename) {
        return new Promise((resolve, reject) => {
            this.fs.readFile(filename, 'utf8', (err, data) => {
                if (err) reject(err);
                else resolve(data);
            });
        });
    }
}

module.exports = {
    DateUtils,
    FileUtils
};