const fs = require('fs')
const path = require('path');
// const Config = require('../config')

const hisMake = (d) => {
    switch(d.action) {
        case 'l':
            return `User ${d.user}(ID: ${d.userId}) Logged in at ${new Date()}`;
        case 's':
            return `User ${d.user}(ID: ${d.userId}) Signed up at ${new Date()}`;
        case 'o':
            return `User ${d.user}(ID: ${d.userId}) Signed out at ${new Date()}`;
        case 'c':
            return `User ${d.user}(ID: ${d.userId}) was Created at ${new Date()}`;
        case 'rs':
            return `User ${d.user}(ID: ${d.userId}) reserved book ${d.book}(ID: ${d.bookId}) at ${new Date()}`;
        case 'rl':
            return `User ${d.user}(ID: ${d.userId}) released book ${d.book}(ID: ${d.bookId}) at ${new Date()}`;
        case 'ig':
            return d.body;
        case 'e':
            return `Error happend while user ${d.user}(ID: ${d.userId}) try to ${d.userAction} ${d.error}`;
        default:
            return '';
    }
}

const logger = (rawData) => {
    const data = hisMake(rawData)
    // Config.MODE !== "production" && console.log(data)
    fs.writeFile(path.join(__dirname, 'history.log'), '\n'+data, {flag: 'a+'}, (err) => null)
}

module.exports = logger