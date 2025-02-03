class Messages {
    constructor() {
        this.greeting = 'Hello %s, What a beautiful day. Server current date and time is ';
        this.errorMessage = '404, there was an error processing your request';
        this.fileError = '500, there was a problem accessing the file!';
        this.writeSuccess = 'Text was successfully written to the file.';
        this.fileNotFound = '404: %s not found';
    }
}
module.exports = new Messages();
