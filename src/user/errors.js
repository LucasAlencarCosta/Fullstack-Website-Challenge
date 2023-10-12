class PasswordsDontMatchErrors extends Error {
    constructor(error) {
        super(error);

        this.name = 'PasswordsDontMatch';
        this.message = "Passwords don't match!";
        this.httpStatusCode = 400;
    }
}

class UserAlreadyExistsErrors extends Error {
    constructor(error) {
        super(error);

        this.name = 'UserAlreadyExists';
        this.message = 'User already registered!';
        this.httpStatusCode = 400;
    }
}

class InvalidCredentialsErrors extends Error {
    constructor(error) {
        super(error);

        this.name = 'InvalidCredentials';
        this.message = 'Invalid Credentials!';
        this.httpStatusCode = 403;
    }
}

module.exports = {
    PasswordsDontMatchErrors,
    UserAlreadyExistsErrors,
    InvalidCredentialsErrors,
};