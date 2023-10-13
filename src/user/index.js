const { hashPassword } = require("../auth/encryption");
const { insertUser } = require("../storage/users");
const { emailValidation } = require("../validation/regex");
const {
  PasswordsDontMatchErrors,
  UserAlreadyExistsErrors,
  InvalidCredentialsErrors,
} = require("./errors");
const { GeneralError } = require("../http/errors");
const { validatePassword } = require("../auth/encryption");
const { encodeUserToken } = require("../auth/token")
const { getUserByUsername, getUserByEmail } = require("../storage/users");
/**
 * @param {RegisterUserPayload} payload
 * @return {Promise<User>}
 */

async function registerUser({ username, email, password, confirmPassword }) {
  if (!username || !email || !password || !confirmPassword) {
    throw new InvalidCredentialsErrors();
  }

  if (password !== confirmPassword) {
    throw new PasswordsDontMatchErrors();
  }

  try {
    const hashed = await hashPassword(password);
    return await insertUser({ username, password: hashed, email });
  } catch (err) {
    if (err?.message?.startsWith("SQLITE_CONSTRAINT: UNIQUE")) {
      throw new UserAlreadyExistsErrors();
    }
    throw err;
  }
}

async function loginUser( username, password ) {
  if (!username || !password) {
    throw new InvalidCredentialsErrors();
  }
  const isEmail = emailValidation(username);
  try {
    const user = isEmail
      ? await getUserByEmail(username)
      : await getUserByUsername(username);
    if (!user || !(await validatePassword(password, user.password))) {
      throw new InvalidCredentialsErrors();
    }
    return encodeUserToken(user);
  } catch (err) {
    if (!!err.name) {
      throw err;
    }

    console.log(err.stack);
    throw new GeneralError();
  }
}
module.exports = {
  registerUser,
  loginUser,
};
