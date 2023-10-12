const path = require('path');

const sqlite = require('sqlite');
const sqlite3 = require('sqlite3');

async function getConnection() {
    return await sqlite.open({
        filename: path.join(__dirname, 'storage.db'),
        driver: sqlite3.Database,
    });
}

module.exports = {
    getConnection,
};