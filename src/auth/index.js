const fs = require('fs');
const crypto = require('crypto');
const path = require('path');
const { keysPath } = require('../path');

/**
 * @param {string} key
 * @param {string} keyFileName
 * @param {string} keyName - Used only on logs
 * @return {string}
 */
function loadKeyOrCreate(key, keyFileName, keyName) {
    const keyPath = path.join(keysPath, keyFileName);
    try {
        return fs.readFileSync(keyPath);
    } catch (err) {
        console.log(`[WARNING] ${keyName} key not found! Generating...`);
    }

    const newKey = crypto.randomBytes(32);
    fs.writeFileSync(keyPath, newKey);
    return newKey;
}

module.exports = {
    loadKeyOrCreate,
};