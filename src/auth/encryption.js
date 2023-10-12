const bcrypt = require('bcrypt');
const { loadKeyOrCreate } = require('./index.js');

const bcryptSaltRounds = 10;

/**
 * @type {string|undefined}
 **/
let pepper;

function getPepper() {
    if (!!pepper) {
        return pepper;
    }
    pepper = loadKeyOrCreate(pepper, 'pepper.key', 'Pepper');
    return pepper;
}

/**
 * @param {string} password
 * @return {Promise<string>}
 */
async function hashPassword(password) {
    return bcrypt.hash(password + getPepper(), bcryptSaltRounds);
}

/**
 * @param {string} plainPass
 * @param {string} hashedPass
 * @return {Promise<boolean>}
 */
async function validatePassword(plainPass, hashedPass) {
    return await bcrypt.compare(plainPass + getPepper(), hashedPass);
}

module.exports = {
    hashPassword,
    validatePassword,
};