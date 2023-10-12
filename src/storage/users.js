const { getConnection } = require('./index');

/**
 * @param {string} username
 * @return {Promise<User|undefined>}
 **/
async function getUserByUsername(username) {
    const conn = await getConnection();
    return await conn.get('SELECT * FROM users WHERE username = ?', [username]);
}

/**
 * @param {string} email
 * @return {Promise<User|undefined>}
 **/
async function getUserByEmail(email) {
    const conn = await getConnection();
    return await conn.get('SELECT * FROM users WHERE email = ?', [email]);
}

/**
 * @param {number} id
 * @return {Promise<User|undefined>}
 **/
async function getUserById(id) {
    const conn = await getConnection();
    return await conn.get('SELECT * FROM users WHERE id = ?', [id]);
}

/**
 * @param {User} user
 * @return {Promise<User>}
 **/
async function insertUser(user) {
    const { username, password, email } = user;

    const conn = await getConnection();
    const result = await conn.run(
        'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
        [username, email, password]
    );

    const lastInsertId = result.lastID;
    if (!lastInsertId) {
        // SHOULD NEVER GET HERE
        throw new Error('NO_LAST_INSERT_ID');
    }

    user.id = lastInsertId;
    return user;
}

module.exports = {
    insertUser,
    getUserById,
    getUserByUsername,
    getUserByEmail,
};