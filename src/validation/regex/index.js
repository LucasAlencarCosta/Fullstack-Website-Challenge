
/**
 * 
 * @param {string} email 
 * @return { boolean } isEmail
 */
function emailValidation(email) {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/u;
    const isEmail = regex.test(email);

    return isEmail;
}

module.exports = { emailValidation };
