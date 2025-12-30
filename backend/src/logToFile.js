const fs = require('fs');
const path = require('path');

const logFilePath = path.join(__dirname, '../../backend.log');

function logToFile(message) {
    const timestamp = new Date().toISOString();
    fs.appendFileSync(logFilePath, `[${timestamp}] ${message}\n`);
}

module.exports = logToFile;
