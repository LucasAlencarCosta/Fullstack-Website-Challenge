const jwt = require("jsonwebtoken");
const { loadKeyOrCreate } = require("./index.js");

/**
 * @type {Buffer|undefined}
 **/
let jwtKey;

/**
 * @description Get the key used by jwt.
 * @description If key doesn't exist this function will generate a new one.
 * @returns {string} key
 */
function getJwtKey() {
  if (!!jwtKey) {
    return jwtKey;
  }

  jwtKey = loadKeyOrCreate(jwtKey, "jwt.key", "Jwt");
  return jwtKey;
}

/**
 * @param {User} user
 * @return {string} token
 */
function encodeUserToken(user) {
  if (user.password) {
    delete user.password;
  }
  const json = JSON.stringify(user);
  const token = jwt.sign({json: json }, getJwtKey(), {
    expiresIn: 3600,
  });
  return token;
}

/**
 * @param {string} token
 * @return {User | undefined} user
 */
function decodeUserToken(token) {
  if (!token) {
    return;
  }
  try {
    const jsonDecoded = jwt.verify(token, getJwtKey());
    return JSON.parse(jsonDecoded);
  } catch (err) {
    return undefined;
  }
}

module.exports = {
  encodeUserToken,
  decodeUserToken,
};
